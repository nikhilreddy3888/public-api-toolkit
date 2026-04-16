import {
  createToolGroup,
  missingKeyMessage,
  omitKeys,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, numberProp, objectSchema, stringProp } from "../lib/schema.js";

export const weatherEnvironmentGroups = [
  createToolGroup({
    key: "weather",
    description: "Forecasts, alerts, and sun times.",
    inputSchema: objectSchema(
      ["forecast", "current", "hourly", "historical", "alerts", "sun_times"],
      {
        lat: numberProp("Latitude."),
        lon: numberProp("Longitude."),
        timezone: stringProp("Timezone name or auto.", { default: "auto" }),
        days: integerProp("Number of forecast days.", { default: 7 }),
        start_date: stringProp("Historical start date."),
        end_date: stringProp("Historical end date."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("weather", input, ctx, {
        forecast: async () =>
          ctx.fetchJson(
            withQuery("https://api.open-meteo.com/v1/forecast", {
              latitude: readNumber(input, "lat"),
              longitude: readNumber(input, "lon"),
              daily:
                "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code",
              timezone: readString(input, "timezone", "auto"),
              forecast_days: readNumber(input, "days", 7),
            }),
          ),
        current: async () =>
          ctx.fetchJson(
            withQuery("https://api.open-meteo.com/v1/forecast", {
              latitude: readNumber(input, "lat"),
              longitude: readNumber(input, "lon"),
              current_weather: true,
              timezone: readString(input, "timezone", "auto"),
            }),
          ),
        hourly: async () =>
          ctx.fetchJson(
            withQuery("https://api.open-meteo.com/v1/forecast", {
              latitude: readNumber(input, "lat"),
              longitude: readNumber(input, "lon"),
              hourly: "temperature_2m,precipitation,weather_code,windspeed_10m",
              timezone: readString(input, "timezone", "auto"),
              forecast_days: readNumber(input, "days", 3),
            }),
          ),
        historical: async () =>
          ctx.fetchJson(
            withQuery("https://archive-api.open-meteo.com/v1/archive", {
              latitude: readNumber(input, "lat"),
              longitude: readNumber(input, "lon"),
              start_date: readString(input, "start_date"),
              end_date: readString(input, "end_date"),
              daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
              timezone: readString(input, "timezone", "auto"),
            }),
          ),
        alerts: async () =>
          ctx.fetchJson(
            withQuery("https://api.weather.gov/alerts/active", {
              point: `${readNumber(input, "lat")},${readNumber(input, "lon")}`,
            }),
          ),
        sun_times: async () =>
          ctx.fetchJson(
            withQuery("https://api.sunrise-sunset.org/json", {
              lat: readNumber(input, "lat"),
              lng: readNumber(input, "lon"),
              formatted: 0,
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "air_quality",
    description: "Air quality and carbon intensity.",
    inputSchema: objectSchema(
      ["current", "hourly", "uk_carbon_intensity", "website_carbon"],
      {
        lat: numberProp("Latitude."),
        lon: numberProp("Longitude."),
        url: stringProp("Website URL."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("air_quality", input, ctx, {
        current: async () =>
          ctx.fetchJson(
            withQuery("https://air-quality-api.open-meteo.com/v1/air-quality", {
              latitude: readNumber(input, "lat"),
              longitude: readNumber(input, "lon"),
              current: "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone",
            }),
          ),
        hourly: async () =>
          ctx.fetchJson(
            withQuery("https://air-quality-api.open-meteo.com/v1/air-quality", {
              latitude: readNumber(input, "lat"),
              longitude: readNumber(input, "lon"),
              hourly: "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone",
            }),
          ),
        uk_carbon_intensity: async () =>
          ctx.fetchJson("https://api.carbonintensity.org.uk/intensity"),
        website_carbon: async () =>
          ctx.fetchJson(
            withQuery("https://api.websitecarbon.com/site", {
              url: readString(input, "url"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "carbon_footprint",
    description: "Carbon Interface activity estimates.",
    inputSchema: objectSchema(
      ["estimate"],
      {
        type: stringProp("Carbon Interface estimate type, such as electricity or flight."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("carbon_footprint", input, ctx, {
        estimate: async () => {
          const key =
            ctx.getEnv("CARBON_INTERFACE") ?? ctx.getEnv("CARBONINTERFACE");
          if (!key) {
            return missingKeyMessage(
              ["CARBON_INTERFACE", "CARBONINTERFACE"],
              "Carbon Interface requests require an API key.",
            );
          }

          return ctx.fetchJson("https://www.carboninterface.com/api/v1/estimates", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(omitKeys(input, ["action"])),
          });
        },
      }),
  }),
] as const;

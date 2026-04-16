import {
  createToolGroup,
  readNumber,
  readString,
  requireFields,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { numberProp, objectSchema, stringProp } from "../lib/schema.js";

export const geoLocationGroups = [
  createToolGroup({
    key: "geocoding",
    description: "Location, postcode, and elevation lookups.",
    inputSchema: objectSchema(
      ["forward", "reverse", "postal_code", "uk_postcode", "elevation"],
      {
        query: stringProp("Address or free-text location query."),
        lat: numberProp("Latitude."),
        lon: numberProp("Longitude."),
        postal_code: stringProp("Postal or ZIP code."),
        country_code: stringProp("Country code for postal lookup.", {
          default: "us",
        }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("geocoding", input, ctx, {
        forward: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            withQuery("https://nominatim.openstreetmap.org/search", {
              q: query,
              format: "jsonv2",
              limit: 5,
            }),
          );
        },
        reverse: async () =>
          ctx.fetchJson(
            withQuery("https://nominatim.openstreetmap.org/reverse", {
              lat: readNumber(input, "lat"),
              lon: readNumber(input, "lon"),
              format: "jsonv2",
            }),
          ),
        postal_code: async () => {
          const postalCode = readString(input, "postal_code");
          const countryCode = readString(input, "country_code", "us");
          requireFields({ postalCode }, ["postalCode"], "Missing postal_code.");
          return ctx.fetchJson(
            `https://api.zippopotam.us/${encodeURIComponent(countryCode)}/${encodeURIComponent(postalCode)}`,
          );
        },
        uk_postcode: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            `https://api.postcodes.io/postcodes/${encodeURIComponent(query)}`,
          );
        },
        elevation: async () =>
          ctx.fetchJson(
            withQuery("https://api.opentopodata.org/v1/srtm90m", {
              locations: `${readNumber(input, "lat")},${readNumber(input, "lon")}`,
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "ip_geolocation",
    description: "IP geolocation from ipapi.co.",
    inputSchema: objectSchema(
      ["lookup", "self"],
      {
        ip: stringProp("IPv4 or IPv6 address."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("ip_geolocation", input, ctx, {
        lookup: async () => {
          const ip = readString(input, "ip");
          requireFields({ ip }, ["ip"]);
          return ctx.fetchJson(`https://ipapi.co/${encodeURIComponent(ip)}/json/`);
        },
        self: async () => ctx.fetchJson("https://ipapi.co/json/"),
      }),
  }),
] as const;

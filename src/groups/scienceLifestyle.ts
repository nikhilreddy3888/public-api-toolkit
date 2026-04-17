import {
  createToolGroup,
  missingKeyMessage,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, numberProp, objectSchema, stringProp } from "../lib/schema.js";

export const scienceLifestyleGroups = [
  createToolGroup({
    key: "math",
    description: "Newton symbolic math and Numbers API facts.",
    inputSchema: objectSchema(
      [
        "simplify",
        "factor",
        "derive",
        "integrate",
        "zeroes",
        "sin",
        "cos",
        "tan",
        "log",
        "number_fact",
      ],
      {
        expression: stringProp("Math expression."),
        number: stringProp("Number for Numbers API."),
        fact_type: stringProp("Numbers API type.", { default: "trivia" }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("math", input, ctx, {
        simplify: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/simplify/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        factor: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/factor/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        derive: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/derive/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        integrate: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/integrate/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        zeroes: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/zeroes/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        sin: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/sin/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        cos: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/cos/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        tan: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/tan/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        log: async () =>
          ctx.fetchJson(
            `https://newton.vercel.app/api/v2/log/${encodeURIComponent(
              readString(input, "expression"),
            )}`,
          ),
        number_fact: async () => {
          const number = readString(input, "number", "42");
          const factType = readString(input, "fact_type", "trivia");

          try {
            return await ctx.fetchText(
              `http://numbersapi.com/${encodeURIComponent(number)}/${encodeURIComponent(
                factType,
              )}`,
            );
          } catch {
            const fallbackTitles =
              factType === "year"
                ? [number, `${number}_(number)`]
                : [`${number}_(number)`, number];

            for (const title of fallbackTitles) {
              try {
                const summary = await ctx.fetchJson(
                  `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                    title,
                  )}`,
                );

                if (
                  summary &&
                  typeof summary === "object" &&
                  "extract" in summary &&
                  typeof summary["extract"] === "string"
                ) {
                  return summary["extract"];
                }
              } catch {
                // Try the next fallback title.
              }
            }

            throw new Error("Number fact providers are currently unavailable.");
          }
        },
      }),
  }),
  createToolGroup({
    key: "space",
    description: "NASA, ISS tracking, launches, and earthquake data.",
    inputSchema: objectSchema(
      ["apod", "iss_position", "mars_photos", "launches", "spacex", "earthquakes"],
      {
        limit: integerProp("Maximum number of results.", { default: 5 }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("space", input, ctx, {
        apod: async () => {
          const key = ctx.getEnv("NASA") ?? "DEMO_KEY";
          return ctx.fetchJson(
            withQuery("https://api.nasa.gov/planetary/apod", {
              api_key: key,
            }),
          );
        },
        iss_position: async () =>
          ctx.fetchJson("https://api.wheretheiss.at/v1/satellites/25544"),
        mars_photos: async () => {
          const key = ctx.getEnv("NASA") ?? "DEMO_KEY";
          return ctx.fetchJson(
            withQuery("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos", {
              earth_date: new Date().toISOString().split("T")[0],
              api_key: key,
            }),
          );
        },
        launches: async () =>
          ctx.fetchJson(
            withQuery("https://ll.thespacedevs.com/2.2.0/launch/upcoming/", {
              limit: readNumber(input, "limit", 5),
            }),
          ),
        spacex: async () => ctx.fetchJson("https://api.spacexdata.com/v5/launches/latest"),
        earthquakes: async () =>
          ctx.fetchJson(
            "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
          ),
      }),
  }),
  createToolGroup({
    key: "food_recipes",
    description: "Meals, cocktails, breweries, products, and fruit data.",
    inputSchema: objectSchema(
      ["meal", "cocktail", "breweries", "food_product", "fruit"],
      {
        query: stringProp("Search term."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("food_recipes", input, ctx, {
        meal: async () =>
          ctx.fetchJson(
            withQuery("https://www.themealdb.com/api/json/v1/1/search.php", {
              s: readString(input, "query"),
            }),
          ),
        cocktail: async () =>
          ctx.fetchJson(
            withQuery("https://www.thecocktaildb.com/api/json/v1/1/search.php", {
              s: readString(input, "query"),
            }),
          ),
        breweries: async () =>
          ctx.fetchJson(
            withQuery("https://api.openbrewerydb.org/v1/breweries", {
              by_name: readString(input, "query"),
            }),
          ),
        food_product: async () =>
          ctx.fetchJson(
            withQuery("https://world.openfoodfacts.org/cgi/search.pl", {
              search_terms: readString(input, "query"),
              search_simple: 1,
              json: 1,
            }),
          ),
        fruit: async () =>
          ctx.fetchJson(
            `https://www.fruityvice.com/api/fruit/${encodeURIComponent(
              readString(input, "query", "apple"),
            )}`,
          ),
      }),
  }),
  createToolGroup({
    key: "blockchain",
    description: "Bitcoin, mempool, and Solana endpoints.",
    inputSchema: objectSchema(
      ["bitcoin_fees", "bitcoin_price", "mempool_stats", "solana_rpc"],
      {
        method: stringProp("Solana JSON-RPC method.", { default: "getHealth" }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("blockchain", input, ctx, {
        bitcoin_fees: async () =>
          ctx.fetchJson("https://mempool.space/api/v1/fees/recommended"),
        bitcoin_price: async () =>
          ctx.fetchJson("https://mempool.space/api/v1/prices"),
        mempool_stats: async () =>
          ctx.fetchJson("https://mempool.space/api/mempool"),
        solana_rpc: async () =>
          ctx.fetchJson("https://api.mainnet-beta.solana.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: readString(input, "method", "getHealth"),
              params: [],
            }),
          }),
      }),
  }),
  createToolGroup({
    key: "holidays",
    description: "Public holidays and UK bank holidays.",
    inputSchema: objectSchema(
      ["public_holidays", "uk_bank_holidays"],
      {
        year: integerProp("Calendar year.", { default: 2026 }),
        country_code: stringProp("Country code.", { default: "US" }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("holidays", input, ctx, {
        public_holidays: async () =>
          ctx.fetchJson(
            `https://date.nager.at/api/v3/PublicHolidays/${readNumber(
              input,
              "year",
              2026,
            )}/${encodeURIComponent(readString(input, "country_code", "US"))}`,
          ),
        uk_bank_holidays: async () =>
          ctx.fetchJson("https://www.gov.uk/bank-holidays.json"),
      }),
  }),
  createToolGroup({
    key: "transport",
    description: "Flight, bike share, EV charging, and transit data.",
    inputSchema: objectSchema(
      ["opensky", "city_bikes", "open_charge_map", "transit"],
      {
        lat: numberProp("Latitude."),
        lon: numberProp("Longitude."),
        query: stringProp("Location search query."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("transport", input, ctx, {
        opensky: async () =>
          ctx.fetchJson("https://opensky-network.org/api/states/all"),
        city_bikes: async () => ctx.fetchJson("https://api.citybik.es/v2/networks"),
        open_charge_map: async () => {
          const key = ctx.getEnv("OPEN_CHARGE_MAP");
          if (!key) {
            return missingKeyMessage(
              ["OPEN_CHARGE_MAP"],
              "Open Charge Map requests require an API key.",
            );
          }
          return ctx.fetchJson(
            withQuery("https://api.openchargemap.io/v3/poi/", {
              output: "json",
              key,
              latitude: readNumber(input, "lat"),
              longitude: readNumber(input, "lon"),
            }),
          );
        },
        transit: async () =>
          ctx.fetchJson(
            withQuery("https://api.citybik.es/v2/networks", {
              fields: "id,name,location",
            }),
          ),
      }),
  }),
] as const;

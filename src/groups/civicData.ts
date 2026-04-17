import {
  createToolGroup,
  missingKeyMessage,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, objectSchema, stringProp } from "../lib/schema.js";

export const civicDataGroups = [
  createToolGroup({
    key: "government_data",
    description: "Government, law, and public safety data feeds.",
    inputSchema: objectSchema(
      ["fbi_wanted", "interpol_red_notices", "federal_register", "us_census"],
      {
        query: stringProp("Search term."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("government_data", input, ctx, {
        fbi_wanted: async () =>
          ctx.fetchJson(
            withQuery("https://api.fbi.gov/wanted/v1/list", {
              title: readString(input, "query"),
            }),
            { headers: { "User-Agent": "public-api-toolkit/1.0" } },
          ),
        interpol_red_notices: async () =>
          ctx.fetchJson(
            withQuery("https://ws-public.interpol.int/notices/v1/red", {
              name: readString(input, "query"),
            }),
          ),
        federal_register: async () =>
          ctx.fetchJson(
            withQuery("https://www.federalregister.gov/api/v1/documents.json", {
              "conditions[term]": readString(input, "query"),
            }),
          ),
        us_census: async () =>
          ctx.fetchJson(
            withQuery("https://api.census.gov/data/2019/pep/charage", {
              get: "NAME,POP",
              for: "state:*",
            }),
            { headers: { "User-Agent": "public-api-toolkit/1.0" } },
          ),
      }),
  }),
  createToolGroup({
    key: "health_data",
    description: "FDA, USDA FoodData Central, and NPI registry lookups.",
    inputSchema: objectSchema(
      ["openfda_drug", "openfda_recall", "fooddata_search", "nppes"],
      {
        query: stringProp("Search term."),
        number: stringProp("NPI number."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("health_data", input, ctx, {
        openfda_drug: async () =>
          ctx.fetchJson(
            withQuery("https://api.fda.gov/drug/label.json", {
              search: `openfda.brand_name:${readString(input, "query")}`,
              limit: 5,
            }),
          ),
        openfda_recall: async () =>
          ctx.fetchJson(
            withQuery("https://api.fda.gov/food/enforcement.json", {
              search: `product_description:${readString(input, "query")}`,
              limit: 5,
            }),
          ),
        fooddata_search: async () => {
          const key = ctx.getEnv("FOODDATA_CENTRAL");
          if (!key) {
            return missingKeyMessage(
              ["FOODDATA_CENTRAL"],
              "FoodData Central requests require an API key.",
            );
          }
          return ctx.fetchJson("https://api.nal.usda.gov/fdc/v1/foods/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: key,
              query: readString(input, "query"),
            }),
          });
        },
        nppes: async () =>
          ctx.fetchJson(
            withQuery("https://npiregistry.cms.hhs.gov/api/", {
              version: "2.1",
              number: readString(input, "number"),
              first_name: readString(input, "query"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "open_data",
    description: "Open datasets for culture, cities, sports, sanctions, and more.",
    inputSchema: objectSchema(
      [
        "nobel_prizes",
        "sanctions",
        "city_search",
        "artic_artworks",
        "met_search",
        "archive_search",
        "f1_sessions",
        "nba_scores",
        "epl_standings",
        "nhl_standings",
      ],
      {
        query: stringProp("Search term."),
        year: integerProp("Season or calendar year.", { default: 2026 }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("open_data", input, ctx, {
        nobel_prizes: async () =>
          ctx.fetchJson(
            withQuery("https://api.nobelprize.org/2.1/nobelPrizes", {
              limit: 10,
            }),
          ),
        sanctions: async () =>
          ctx.fetchJson(
            withQuery("https://api.opensanctions.org/search/default", {
              q: readString(input, "query"),
            }),
          ),
        city_search: async () => {
          const query = readString(input, "query");

          try {
            return await ctx.fetchJson(
              withQuery("https://api.teleport.org/api/cities/", {
                search: query,
              }),
            );
          } catch {
            return ctx.fetchJson(
              withQuery("https://geocoding-api.open-meteo.com/v1/search", {
                name: query,
                count: 10,
                language: "en",
                format: "json",
              }),
            );
          }
        },
        artic_artworks: async () =>
          ctx.fetchJson(
            withQuery("https://api.artic.edu/api/v1/artworks/search", {
              q: readString(input, "query"),
            }),
          ),
        met_search: async () =>
          ctx.fetchJson(
            withQuery(
              "https://collectionapi.metmuseum.org/public/collection/v1/search",
              {
                q: readString(input, "query"),
              },
            ),
          ),
        archive_search: async () =>
          ctx.fetchJson(
            withQuery("https://archive.org/advancedsearch.php", {
              q: readString(input, "query"),
              output: "json",
              rows: "10",
            }),
          ),
        f1_sessions: async () =>
          ctx.fetchJson(
            withQuery("https://api.openf1.org/v1/sessions", {
              year: readNumber(input, "year", 2025),
            }),
          ),
        nba_scores: async () =>
          ctx.fetchJson(
            "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
          ),
        epl_standings: async () =>
          ctx.fetchJson(
            "https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2024-2025",
          ),
        nhl_standings: async () =>
          ctx.fetchJson("https://api-web.nhle.com/v1/standings/now"),
      }),
  }),
] as const;

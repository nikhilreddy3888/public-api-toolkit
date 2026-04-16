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
      ["fbi_wanted", "interpol_red_notices", "federal_register", "data_usa"],
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
        data_usa: async () =>
          ctx.fetchJson(
            withQuery("https://datausa.io/api/searchLegacy/", {
              limit: 10,
              qs: readString(input, "query"),
            }),
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
        "emoji_random",
        "f1_current",
        "nba_games",
        "football_standings",
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
        city_search: async () =>
          ctx.fetchJson(
            withQuery("https://api.teleport.org/api/cities/", {
              search: readString(input, "query"),
            }),
          ),
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
        emoji_random: async () =>
          ctx.fetchJson("https://emojihub.yurace.pro/api/random"),
        f1_current: async () => ctx.fetchJson("https://ergast.com/api/f1/current.json"),
        nba_games: async () =>
          ctx.fetchJson(
            withQuery("https://www.balldontlie.io/api/v1/games", {
              "seasons[]": readNumber(input, "year", 2026),
            }),
          ),
        football_standings: async () =>
          ctx.fetchJson(
            "https://api-football-standings.azharimm.dev/leagues/eng.1/standings",
          ),
        nhl_standings: async () =>
          ctx.fetchJson("https://api-web.nhle.com/v1/standings/now"),
      }),
  }),
] as const;

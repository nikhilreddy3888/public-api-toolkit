import {
  createToolGroup,
  readNumber,
  readString,
  requireFields,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, objectSchema, stringProp } from "../lib/schema.js";

export const textKnowledgeGroups = [
  createToolGroup({
    key: "translation",
    description: "LibreTranslate and FunTranslations endpoints.",
    inputSchema: objectSchema(
      ["translate", "detect", "languages", "fun"],
      {
        text: stringProp("Text to analyze or translate."),
        source: stringProp("Source language code.", { default: "auto" }),
        target: stringProp("Target language code.", { default: "en" }),
        style: stringProp("FunTranslations style, such as yoda or pirate."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("translation", input, ctx, {
        translate: async () =>
          ctx.fetchJson("https://libretranslate.com/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              q: readString(input, "text"),
              source: readString(input, "source", "auto"),
              target: readString(input, "target", "en"),
              format: "text",
            }),
          }),
        detect: async () =>
          ctx.fetchJson("https://libretranslate.com/detect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              q: readString(input, "text"),
            }),
          }),
        languages: async () => ctx.fetchJson("https://libretranslate.com/languages"),
        fun: async () => {
          const style = readString(input, "style", "yoda");
          return ctx.fetchJson(
            withQuery(`https://api.funtranslations.com/translate/${style}.json`, {
              text: readString(input, "text"),
            }),
          );
        },
      }),
  }),
  createToolGroup({
    key: "text_analysis",
    description: "Profanity checking and censorship via PurgoMalum.",
    inputSchema: objectSchema(
      ["contains_profanity", "censor"],
      {
        text: stringProp("Text to validate."),
      },
      ["text"],
    ),
    execute: (input, ctx) =>
      runActionMap("text_analysis", input, ctx, {
        contains_profanity: async () =>
          ctx.fetchJson(
            withQuery("https://www.purgomalum.com/service/containsprofanity", {
              text: readString(input, "text"),
            }),
          ),
        censor: async () =>
          ctx.fetchJson(
            withQuery("https://www.purgomalum.com/service/json", {
              text: readString(input, "text"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "wikipedia",
    description: "Wikipedia and Wikidata search helpers.",
    inputSchema: objectSchema(
      ["search", "summary", "content", "random", "wikidata_search"],
      {
        query: stringProp("Wikipedia title or search query."),
        limit: integerProp("Maximum number of results.", { default: 5 }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("wikipedia", input, ctx, {
        search: async () =>
          ctx.fetchJson(
            withQuery("https://en.wikipedia.org/w/rest.php/v1/search/title", {
              q: readString(input, "query"),
              limit: readNumber(input, "limit", 5),
            }),
          ),
        summary: async () =>
          ctx.fetchJson(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
              readString(input, "query"),
            )}`,
          ),
        content: async () =>
          ctx.fetchJson(
            withQuery("https://en.wikipedia.org/w/api.php", {
              action: "query",
              format: "json",
              prop: "extracts",
              explaintext: 1,
              titles: readString(input, "query"),
            }),
          ),
        random: async () =>
          ctx.fetchJson("https://en.wikipedia.org/api/rest_v1/page/random/summary"),
        wikidata_search: async () =>
          ctx.fetchJson(
            withQuery("https://www.wikidata.org/w/api.php", {
              action: "wbsearchentities",
              format: "json",
              language: "en",
              search: readString(input, "query"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "news",
    description: "Spaceflight News and Chronicling America.",
    inputSchema: objectSchema(
      ["spaceflight", "chronicling"],
      {
        query: stringProp("Search term."),
        limit: integerProp("Maximum number of results.", { default: 5 }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("news", input, ctx, {
        spaceflight: async () =>
          ctx.fetchJson(
            withQuery("https://api.spaceflightnewsapi.net/v4/articles/", {
              search: readString(input, "query"),
              limit: readNumber(input, "limit", 5),
            }),
          ),
        chronicling: async () =>
          ctx.fetchJson(
            withQuery("https://chroniclingamerica.loc.gov/search/titles/results/", {
              terms: readString(input, "query"),
              format: "json",
            }),
          ),
      }),
  }),
] as const;

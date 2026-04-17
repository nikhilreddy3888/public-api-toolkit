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
    description: "LibreTranslate translation and language detection.",
    inputSchema: objectSchema(
      ["translate", "detect", "languages"],
      {
        text: stringProp("Text to analyze or translate."),
        source: stringProp("Source language code.", { default: "auto" }),
        target: stringProp("Target language code.", { default: "en" }),
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
    description: "Spaceflight News API.",
    inputSchema: objectSchema(
      ["spaceflight"],
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
      }),
  }),
] as const;

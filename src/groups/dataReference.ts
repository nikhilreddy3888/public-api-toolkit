import {
  createToolGroup,
  readNumber,
  readString,
  requireFields,
  requireOneOf,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, objectSchema, stringProp } from "../lib/schema.js";

const queryProp = stringProp("General search query or term.");
const limitProp = integerProp("Maximum number of results to return.", {
  default: 10,
});

export const dataReferenceGroups = [
  createToolGroup({
    key: "country_data",
    description: "Country data from REST Countries.",
    inputSchema: objectSchema(
      ["by_name", "by_code", "by_currency", "by_language", "by_region", "all"],
      {
        query: queryProp,
      },
    ),
    execute: (input, ctx) =>
      runActionMap("country_data", input, ctx, {
        by_name: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`,
          );
        },
        by_code: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            `https://restcountries.com/v3.1/alpha/${encodeURIComponent(query)}`,
          );
        },
        by_currency: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            `https://restcountries.com/v3.1/currency/${encodeURIComponent(query)}`,
          );
        },
        by_language: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            `https://restcountries.com/v3.1/lang/${encodeURIComponent(query)}`,
          );
        },
        by_region: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            `https://restcountries.com/v3.1/region/${encodeURIComponent(query)}`,
          );
        },
        all: async () =>
          ctx.fetchJson(
            "https://restcountries.com/v3.1/all?fields=name,capital,population,region,subregion,currencies,languages,timezones,flags",
          ),
      }),
  }),
  createToolGroup({
    key: "dictionary",
    description: "Definitions and word-relation tools.",
    inputSchema: objectSchema(
      ["define", "synonyms", "antonyms", "rhymes", "related", "autocomplete"],
      {
        word: stringProp("Word to look up."),
        language: stringProp("Dictionary language code.", { default: "en" }),
      },
      ["word"],
    ),
    execute: (input, ctx) =>
      runActionMap("dictionary", input, ctx, {
        define: async () => {
          const word = readString(input, "word");
          const language = readString(input, "language", "en");
          requireFields({ word }, ["word"]);
          return ctx.fetchJson(
            `https://api.dictionaryapi.dev/api/v2/entries/${language}/${encodeURIComponent(word)}`,
          );
        },
        synonyms: async () =>
          ctx.fetchJson(
            withQuery("https://api.datamuse.com/words", {
              rel_syn: readString(input, "word"),
              max: 20,
            }),
          ),
        antonyms: async () =>
          ctx.fetchJson(
            withQuery("https://api.datamuse.com/words", {
              rel_ant: readString(input, "word"),
              max: 20,
            }),
          ),
        rhymes: async () =>
          ctx.fetchJson(
            withQuery("https://api.datamuse.com/words", {
              rel_rhy: readString(input, "word"),
              max: 20,
            }),
          ),
        related: async () =>
          ctx.fetchJson(
            withQuery("https://api.datamuse.com/words", {
              ml: readString(input, "word"),
              max: 20,
            }),
          ),
        autocomplete: async () =>
          ctx.fetchJson(
            withQuery("https://api.datamuse.com/sug", {
              s: readString(input, "word"),
              max: 20,
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "books",
    description: "Open Library and Gutendex book lookups.",
    inputSchema: objectSchema(
      ["search", "by_isbn", "by_author", "gutenberg"],
      {
        query: queryProp,
        limit: limitProp,
      },
    ),
    execute: (input, ctx) =>
      runActionMap("books", input, ctx, {
        search: async () =>
          ctx.fetchJson(
            withQuery("https://openlibrary.org/search.json", {
              q: readString(input, "query"),
              limit: readNumber(input, "limit", 10),
            }),
          ),
        by_isbn: async () => {
          const query = readString(input, "query");
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            `https://openlibrary.org/isbn/${encodeURIComponent(query)}.json`,
          );
        },
        by_author: async () =>
          ctx.fetchJson(
            withQuery("https://openlibrary.org/search.json", {
              author: readString(input, "query"),
              limit: readNumber(input, "limit", 10),
            }),
          ),
        gutenberg: async () =>
          ctx.fetchJson(
            withQuery("https://gutendex.com/books", {
              search: readString(input, "query"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "university_data",
    description: "Worldwide university search.",
    inputSchema: objectSchema(
      ["search"],
      {
        name: stringProp("University name filter."),
        country: stringProp("Country filter."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("university_data", input, ctx, {
        search: async () => {
          requireOneOf(input, ["name", "country"]);
          return ctx.fetchJson(
            withQuery("http://universities.hipolabs.com/search", {
              name: readString(input, "name"),
              country: readString(input, "country"),
            }),
          );
        },
      }),
  }),
] as const;

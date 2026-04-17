import {
  createToolGroup,
  missingKeyMessage,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, objectSchema, stringProp } from "../lib/schema.js";

export const funValidationSecurityGroups = [
  createToolGroup({
    key: "random_facts",
    description: "Jokes, quotes, trivia, xkcd, and novelty endpoints.",
    inputSchema: objectSchema(
      [
        "joke",
        "dad_joke",
        "chuck_norris",
        "quote",
        "advice",
        "useless_fact",
        "trivia",
        "xkcd",
        "kanye",
        "affirmation",
        "today_in_history",
      ],
      {
        number: stringProp("Optional xkcd comic number."),
        month: integerProp("Month number for today-in-history.", { default: 1 }),
        day: integerProp("Day number for today-in-history.", { default: 1 }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("random_facts", input, ctx, {
        joke: async () => ctx.fetchJson("https://v2.jokeapi.dev/joke/Any"),
        dad_joke: async () =>
          ctx.fetchJson("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
          }),
        chuck_norris: async () =>
          ctx.fetchJson("https://api.chucknorris.io/jokes/random"),
        quote: async () => {
          try {
            return await ctx.fetchJson("https://api.quotable.io/random");
          } catch {
            return ctx.fetchJson("https://zenquotes.io/api/random");
          }
        },
        advice: async () => ctx.fetchJson("https://api.adviceslip.com/advice"),
        useless_fact: async () =>
          ctx.fetchJson("https://uselessfacts.jsph.pl/api/v2/facts/random"),
        trivia: async () => ctx.fetchJson("https://opentdb.com/api.php?amount=1"),
        xkcd: async () =>
          ctx.fetchJson(
            readString(input, "number")
              ? `https://xkcd.com/${encodeURIComponent(readString(input, "number"))}/info.0.json`
              : "https://xkcd.com/info.0.json",
          ),
        kanye: async () => ctx.fetchJson("https://api.kanye.rest/"),
        affirmation: async () => ctx.fetchJson("https://www.affirmations.dev/"),
        today_in_history: async () =>
          ctx.fetchJson(
            `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${readNumber(input, "month", new Date().getMonth() + 1)}/${readNumber(input, "day", new Date().getDate())}`,
          ),
      }),
  }),
  createToolGroup({
    key: "animals",
    description: "Animal facts, breeds, media, and wildlife lookups.",
    inputSchema: objectSchema(
      [
        "cat_fact",
        "dog_image",
        "fox_image",
        "duck_image",
        "http_cat",
        "http_dog",
        "cat_image",
        "dog_breed",
        "cat_breed",
        "fish_watch",
      ],
      {
        code: stringProp("HTTP status code for HTTP Cat/Dog."),
        query: stringProp("Animal breed search term."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("animals", input, ctx, {
        cat_fact: async () => ctx.fetchJson("https://catfact.ninja/fact"),
        dog_image: async () =>
          ctx.fetchJson("https://dog.ceo/api/breeds/image/random"),
        fox_image: async () => ctx.fetchJson("https://randomfox.ca/floof/"),
        duck_image: async () => ctx.fetchJson("https://random-d.uk/api/random"),
        http_cat: async () => ({
          url: `https://http.cat/${encodeURIComponent(readString(input, "code", "200"))}`,
        }),
        http_dog: async () => ({
          url: `https://http.dog/${encodeURIComponent(readString(input, "code", "200"))}.jpg`,
        }),
        cat_image: async () => ctx.fetchJson("https://cataas.com/cat?json=true"),
        dog_breed: async () =>
          ctx.fetchJson("https://dog.ceo/api/breeds/list/all"),
        cat_breed: async () =>
          ctx.fetchJson("https://catfact.ninja/breeds"),
        fish_watch: async () =>
          ctx.fetchJson(
            withQuery("https://www.fishwatch.gov/api/species", {
              search: readString(input, "query"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "email_validation",
    description: "Email reputation and deliverability helpers.",
    inputSchema: objectSchema(
      ["disify", "mailcheck", "kickbox"],
      {
        email: stringProp("Email address to validate."),
      },
      ["email"],
    ),
    execute: (input, ctx) =>
      runActionMap("email_validation", input, ctx, {
        disify: async () =>
          ctx.fetchJson(
            `https://www.disify.com/api/email/${encodeURIComponent(
              readString(input, "email"),
            )}`,
          ),
        mailcheck: async () => {
          const key = ctx.getEnv("MAILCHECK");
          if (!key) {
            return missingKeyMessage(
              ["MAILCHECK"],
              "Mailcheck.ai requests require an API key.",
            );
          }
          return ctx.fetchJson(
            withQuery("https://api.mailcheck.ai/email", {
              email: readString(input, "email"),
              key,
            }),
          );
        },
        kickbox: async () => {
          const key = ctx.getEnv("KICKBOX");
          if (!key) {
            return missingKeyMessage(
              ["KICKBOX"],
              "Kickbox requests require an API key.",
            );
          }
          return ctx.fetchJson(
            withQuery("https://api.kickbox.com/v2/verify", {
              email: readString(input, "email"),
              apikey: key,
            }),
          );
        },
      }),
  }),
  createToolGroup({
    key: "name_insights",
    description: "Gender, age, and nationality predictions from names.",
    inputSchema: objectSchema(
      ["genderize", "agify", "nationalize"],
      {
        name: stringProp("Name to analyze."),
      },
      ["name"],
    ),
    execute: (input, ctx) =>
      runActionMap("name_insights", input, ctx, {
        genderize: async () =>
          ctx.fetchJson(
            withQuery("https://api.genderize.io", {
              name: readString(input, "name"),
            }),
          ),
        agify: async () =>
          ctx.fetchJson(
            withQuery("https://api.agify.io", {
              name: readString(input, "name"),
            }),
          ),
        nationalize: async () =>
          ctx.fetchJson(
            withQuery("https://api.nationalize.io", {
              name: readString(input, "name"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "data_validation",
    description: "General content validation and profanity filtering.",
    inputSchema: objectSchema(
      ["contains_profanity", "censor"],
      {
        text: stringProp("Text to validate."),
      },
      ["text"],
    ),
    execute: (input, ctx) =>
      runActionMap("data_validation", input, ctx, {
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
    key: "security_intel",
    description: "Threat feeds, vulnerability search, and public safety data.",
    inputSchema: objectSchema(
      ["nvd", "shodan_internetdb", "emailrep", "uk_police"],
      {
        query: stringProp("Search query, CVE id, or URL."),
        email: stringProp("Email address."),
        ip: stringProp("IP address for Shodan InternetDB lookup."),
        lat: stringProp("Latitude."),
        lon: stringProp("Longitude."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("security_intel", input, ctx, {
        nvd: async () =>
          ctx.fetchJson(
            withQuery("https://services.nvd.nist.gov/rest/json/cves/2.0", {
              keywordSearch: readString(input, "query"),
            }),
          ),
        shodan_internetdb: async () =>
          ctx.fetchJson(
            `https://internetdb.shodan.io/${encodeURIComponent(
              readString(input, "ip"),
            )}`,
          ),
        emailrep: async () =>
          ctx.fetchJson(
            `https://emailrep.io/${encodeURIComponent(readString(input, "email"))}`,
          ),
        uk_police: async () =>
          ctx.fetchJson(
            withQuery("https://data.police.uk/api/crimes-street/all-crime", {
              lat: readString(input, "lat"),
              lng: readString(input, "lon"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "job_search",
    description: "Arbeitnow job board search.",
    inputSchema: objectSchema(
      ["search"],
      {
        query: stringProp("Search term."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("job_search", input, ctx, {
        search: async () =>
          ctx.fetchJson(
            withQuery("https://www.arbeitnow.com/api/job-board-api", {
              search: readString(input, "query"),
            }),
          ),
      }),
  }),
] as const;

import {
  createToolGroup,
  missingKeyMessage,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { objectSchema, stringProp } from "../lib/schema.js";

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
        "stoic",
        "corporate_bs",
        "geek_joke",
      ],
      {
        number: stringProp("Optional xkcd comic number."),
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
        stoic: async () => ctx.fetchJson("https://stoic.tekloon.net/stoic-quote"),
        corporate_bs: async () =>
          ctx.fetchText("https://corporatebs-generator.sameerkumar.website"),
        geek_joke: async () =>
          ctx.fetchJson("https://geek-jokes.sameerkumar.website/api?format=json"),
      }),
  }),
  createToolGroup({
    key: "animals",
    description: "Animal facts, media, and wildlife lookups.",
    inputSchema: objectSchema(
      [
        "cat_fact",
        "dog_image",
        "fox_image",
        "duck_image",
        "http_cat",
        "http_dog",
        "cat_image",
        "meow_fact",
        "zoo_animals",
        "fish_watch",
      ],
      {
        code: stringProp("HTTP status code for HTTP Cat/Dog."),
        query: stringProp("Zoo animal search term."),
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
        meow_fact: async () => ctx.fetchJson("https://meowfacts.herokuapp.com/"),
        zoo_animals: async () =>
          ctx.fetchJson(
            withQuery("https://zoo-animal-api.herokuapp.com/animals/rand/10", {
              q: readString(input, "query"),
            }),
          ),
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
      ["disify", "eva", "mailcheck", "kickbox"],
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
        eva: async () =>
          ctx.fetchJson(
            withQuery("https://api.eva.pingutil.com/email", {
              email: readString(input, "email"),
            }),
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
    key: "phone_validation",
    description: "Device brand and model lookups via Mobile Specs.",
    inputSchema: objectSchema(
      ["brands", "brand_devices", "device_search"],
      {
        brand: stringProp("Brand slug."),
        query: stringProp("Device search query."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("phone_validation", input, ctx, {
        brands: async () =>
          ctx.fetchJson("https://api-mobilespecs.azharimm.dev/v2/brands"),
        brand_devices: async () =>
          ctx.fetchJson(
            `https://api-mobilespecs.azharimm.dev/v2/brands/${encodeURIComponent(
              readString(input, "brand"),
            )}`,
          ),
        device_search: async () =>
          ctx.fetchJson(
            withQuery("https://api-mobilespecs.azharimm.dev/v2/search", {
              query: readString(input, "query"),
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
      ["nvd", "urlhaus", "emailrep", "phishstats", "uk_police"],
      {
        query: stringProp("Search query, CVE id, or URL."),
        email: stringProp("Email address."),
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
        urlhaus: async () =>
          ctx.fetchJson("https://urlhaus-api.abuse.ch/v1/url/", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              url: readString(input, "query"),
            }).toString(),
          }),
        emailrep: async () =>
          ctx.fetchJson(
            `https://emailrep.io/${encodeURIComponent(readString(input, "email"))}`,
          ),
        phishstats: async () =>
          ctx.fetchJson("https://phishstats.info:2096/api/phishing?_sort=-date"),
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

import {
  createToolGroup,
  missingKeyMessage,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, objectSchema, stringProp } from "../lib/schema.js";

export const mediaEntertainmentGroups = [
  createToolGroup({
    key: "images",
    description: "Lorem Picsum image placeholders.",
    inputSchema: objectSchema(
      ["random", "seeded", "info"],
      {
        width: integerProp("Image width.", { default: 800 }),
        height: integerProp("Image height.", { default: 600 }),
        seed: stringProp("Deterministic image seed."),
        id: stringProp("Specific Picsum image id."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("images", input, ctx, {
        random: async () => ({
          url: `https://picsum.photos/${readNumber(input, "width", 800)}/${readNumber(
            input,
            "height",
            600,
          )}`,
        }),
        seeded: async () => ({
          url: `https://picsum.photos/seed/${encodeURIComponent(
            readString(input, "seed", "public-api-toolkit"),
          )}/${readNumber(input, "width", 800)}/${readNumber(input, "height", 600)}`,
        }),
        info: async () =>
          ctx.fetchJson(
            `https://picsum.photos/id/${encodeURIComponent(readString(input, "id", "0"))}/info`,
          ),
      }),
  }),
  createToolGroup({
    key: "music_data",
    description: "MusicBrainz, iTunes, Lyrics.ovh, Radio Browser, and genre helpers.",
    inputSchema: objectSchema(
      ["search", "artist", "release", "lyrics", "radio", "genre"],
      {
        query: stringProp("Artist, title, album, station, or genre query."),
        artist: stringProp("Artist name."),
        title: stringProp("Song title."),
        limit: integerProp("Maximum number of results.", { default: 10 }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("music_data", input, ctx, {
        search: async () =>
          ctx.fetchJson(
            withQuery("https://itunes.apple.com/search", {
              term: readString(input, "query"),
              limit: readNumber(input, "limit", 10),
            }),
          ),
        artist: async () =>
          ctx.fetchJson(
            withQuery("https://musicbrainz.org/ws/2/artist/", {
              query: readString(input, "query"),
              fmt: "json",
              limit: readNumber(input, "limit", 10),
            }),
          ),
        release: async () =>
          ctx.fetchJson(
            withQuery("https://musicbrainz.org/ws/2/release-group/", {
              query: readString(input, "query"),
              fmt: "json",
              limit: readNumber(input, "limit", 10),
            }),
          ),
        lyrics: async () =>
          ctx.fetchJson(
            `https://api.lyrics.ovh/v1/${encodeURIComponent(
              readString(input, "artist"),
            )}/${encodeURIComponent(readString(input, "title"))}`,
          ),
        radio: async () =>
          ctx.fetchJson(
            withQuery("https://de1.api.radio-browser.info/json/stations/search", {
              name: readString(input, "query"),
              limit: readNumber(input, "limit", 10),
            }),
          ),
        genre: async () =>
          ctx.fetchJson("https://binaryjazz.us/wp-json/genrenator/v1/genre/"),
      }),
  }),
  createToolGroup({
    key: "movie_tv_data",
    description: "TV, movie, anime, and fandom APIs.",
    inputSchema: objectSchema(
      ["tvmaze", "omdb", "tmdb", "swapi", "stapi", "rick_and_morty", "anime", "ghibli"],
      {
        query: stringProp("Search query or title."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("movie_tv_data", input, ctx, {
        tvmaze: async () =>
          ctx.fetchJson(
            withQuery("https://api.tvmaze.com/search/shows", {
              q: readString(input, "query"),
            }),
          ),
        omdb: async () => {
          const key = ctx.getEnv("OMDB");
          if (!key) {
            return missingKeyMessage(["OMDB"], "OMDb requires an API key.");
          }
          return ctx.fetchJson(
            withQuery("https://www.omdbapi.com/", {
              apikey: key,
              t: readString(input, "query"),
            }),
          );
        },
        tmdb: async () => {
          const key = ctx.getEnv("TMDB");
          if (!key) {
            return missingKeyMessage(["TMDB"], "TMDb requires an API key.");
          }
          return ctx.fetchJson(
            withQuery("https://api.themoviedb.org/3/search/movie", {
              api_key: key,
              query: readString(input, "query"),
            }),
          );
        },
        swapi: async () =>
          ctx.fetchJson(
            withQuery("https://swapi.py4e.com/api/people/", {
              search: readString(input, "query"),
            }),
          ),
        stapi: async () =>
          ctx.fetchJson("https://stapi.co/api/v1/rest/series/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: readString(input, "query"),
              pageNumber: 0,
              pageSize: 10,
            }),
          }),
        rick_and_morty: async () =>
          ctx.fetchJson(
            withQuery("https://rickandmortyapi.com/api/character/", {
              name: readString(input, "query"),
            }),
          ),
        anime: async () =>
          ctx.fetchJson(
            withQuery("https://api.jikan.moe/v4/anime", {
              q: readString(input, "query"),
            }),
          ),
        ghibli: async () =>
          ctx.fetchJson("https://ghibliapi.vercel.app/films"),
      }),
  }),
  createToolGroup({
    key: "game_data",
    description: "Game, cards, RPG, and trivia data APIs.",
    inputSchema: objectSchema(
      [
        "pokemon",
        "deals",
        "free_to_game",
        "dnd",
        "mtg",
        "yugioh",
        "chess",
        "hyrule",
        "genshin",
        "ffxiv",
        "gamerpower",
        "amiibo",
        "jservice",
      ],
      {
        query: stringProp("Search term or slug."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("game_data", input, ctx, {
        pokemon: async () =>
          ctx.fetchJson(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(
              readString(input, "query", "pikachu"),
            )}`,
          ),
        deals: async () =>
          ctx.fetchJson(
            withQuery("https://www.cheapshark.com/api/1.0/deals", {
              title: readString(input, "query"),
            }),
          ),
        free_to_game: async () =>
          ctx.fetchJson("https://www.freetogame.com/api/games"),
        dnd: async () =>
          ctx.fetchJson(
            `https://www.dnd5eapi.co/api/${encodeURIComponent(
              readString(input, "query", "spells"),
            )}`,
          ),
        mtg: async () =>
          ctx.fetchJson(
            withQuery("https://api.scryfall.com/cards/search", {
              q: readString(input, "query", "black lotus"),
            }),
          ),
        yugioh: async () =>
          ctx.fetchJson(
            withQuery("https://db.ygoprodeck.com/api/v7/cardinfo.php", {
              fname: readString(input, "query"),
            }),
          ),
        chess: async () =>
          ctx.fetchJson(
            `https://api.chess.com/pub/player/${encodeURIComponent(
              readString(input, "query", "hikaru"),
            )}`,
          ),
        hyrule: async () =>
          ctx.fetchJson(
            withQuery("https://botw-compendium.herokuapp.com/api/v3/compendium/entry", {
              name: readString(input, "query", "master sword"),
            }),
          ),
        genshin: async () =>
          ctx.fetchJson(
            `https://genshin.jmp.blue/characters/${encodeURIComponent(
              readString(input, "query", "amber"),
            )}`,
          ),
        ffxiv: async () =>
          ctx.fetchJson(
            withQuery("https://xivapi.com/search", {
              string: readString(input, "query"),
            }),
          ),
        gamerpower: async () =>
          ctx.fetchJson("https://www.gamerpower.com/api/giveaways"),
        amiibo: async () =>
          ctx.fetchJson(
            withQuery("https://www.amiiboapi.com/api/amiibo/", {
              name: readString(input, "query"),
            }),
          ),
        jservice: async () =>
          ctx.fetchJson("https://jservice.io/api/random"),
      }),
  }),
] as const;

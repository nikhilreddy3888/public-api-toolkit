import {
  createToolGroup,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, objectSchema, stringProp } from "../lib/schema.js";

export const techNewsGroups = [
  createToolGroup({
    key: "tech_news",
    description: "HackerNews, Dev.to, and tech headlines.",
    inputSchema: objectSchema(
      ["hackernews_top", "hackernews_story", "devto_articles"],
      {
        story_id: integerProp("HackerNews story ID."),
        query: stringProp("Search term for Dev.to articles."),
        limit: integerProp("Result count.", { default: 10 }),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("tech_news", input, ctx, {
        hackernews_top: async () => {
          const ids = await ctx.fetchJson(
            "https://hacker-news.firebaseio.com/v0/topstories.json",
          );
          const topIds = Array.isArray(ids) ? ids.slice(0, readNumber(input, "limit", 10)) : [];
          const stories = await Promise.all(
            topIds.map((id: number) =>
              ctx.fetchJson(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
              ),
            ),
          );
          return stories;
        },
        hackernews_story: async () => {
          const id = readNumber(input, "story_id", 0);
          if (!id) {
            return { error: "Provide story_id to fetch a specific story." };
          }
          return ctx.fetchJson(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          );
        },
        devto_articles: async () =>
          ctx.fetchJson(
            withQuery("https://dev.to/api/articles", {
              per_page: readNumber(input, "limit", 10),
              tag: readString(input, "query"),
            }),
          ),
      }),
  }),
] as const;
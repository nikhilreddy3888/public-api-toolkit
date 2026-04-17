import {
  createToolGroup,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { objectSchema, stringProp } from "../lib/schema.js";

export const devToolsGroups = [
  createToolGroup({
    key: "dev_tools",
    description: "npm registry, GitHub, and CDNJS developer lookups.",
    inputSchema: objectSchema(
      ["npm_info", "github_search", "github_user", "cdnjs_libraries"],
      {
        query: stringProp("Search term, package name, or GitHub username."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("dev_tools", input, ctx, {
        npm_info: async () =>
          ctx.fetchJson(
            `https://registry.npmjs.org/${encodeURIComponent(
              readString(input, "query"),
            )}`,
          ),
        github_search: async () =>
          ctx.fetchJson(
            withQuery("https://api.github.com/search/repositories", {
              q: readString(input, "query"),
              per_page: "10",
            }),
          ),
        github_user: async () =>
          ctx.fetchJson(
            `https://api.github.com/users/${encodeURIComponent(
              readString(input, "query"),
            )}`,
          ),
        cdnjs_libraries: async () =>
          ctx.fetchJson(
            withQuery("https://api.cdnjs.com/libraries", {
              search: readString(input, "query"),
              limit: "10",
            }),
          ),
      }),
  }),
] as const;
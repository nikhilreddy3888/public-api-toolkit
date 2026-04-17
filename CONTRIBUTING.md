# Contributing to Public API Toolkit

Public API Toolkit is a TypeScript MCP server that turns public APIs into grouped, agent-ready tools. The best contributions improve tool coverage, repair upstream drift, or tighten reliability and documentation.

## Development Setup

```bash
git clone https://github.com/nikhilreddy3888/public-api-toolkit.git
cd public-api-toolkit
npm ci
npm run build
npm test
```

## Repository Map

```text
src/
  catalog/   tool names and descriptions
  groups/    tool group implementations
  lib/       shared fetch, schema, env, and response helpers
  server/    MCP server wiring
tests/       unit and smoke coverage
docs/        install, config, and publishing guides
examples/    client configuration examples
plugins/     local plugin metadata
skills/      routing guidance for compatible clients
```

## Add Or Update A Tool

1. Pick the right file in `src/groups/`.
2. Add or update the tool with the existing `createToolGroup(...)` and `runActionMap(...)` pattern.
3. Update the description in `src/catalog/groups.ts`.
4. Add or update tests in `tests/`.
5. Update `README.md` or the affected docs if user-facing behavior changed.
6. Run `npm test` and `npm run build`.

Example pattern:

```ts
createToolGroup({
  key: "new_tool",
  description: "What this tool does.",
  inputSchema: objectSchema(["lookup"], {
    query: stringProp("Search query."),
  }),
  execute: (input, ctx) =>
    runActionMap("new_tool", input, ctx, {
      lookup: async () =>
        ctx.fetchJson(
          withQuery("https://api.example.com/search", {
            query: readString(input, "query"),
          }),
        ),
    }),
});
```

## Fix A Broken Provider

Public APIs drift. Keep the repair as small and durable as possible.

1. Reproduce the failure with a direct request.
2. Prefer fixing the endpoint before adding a fallback.
3. If the provider now requires auth, return `missingKeyMessage(...)` instead of throwing.
4. Update the docs when setup requirements or output expectations change.

Good fixes:

- use the shared fetch helpers
- keep outputs structured and compact
- add fallbacks only when the primary provider is fragile
- cover the failure mode in tests

Avoid:

- large client-side filtering when a query endpoint exists
- silent contract changes without tests
- checked-in secrets or hardcoded tokens

## Pull Request Checklist

- [ ] Added or updated tests first
- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] Updated docs if behavior changed
- [ ] Kept the change focused

The pull request template in [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) matches this workflow.

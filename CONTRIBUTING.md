# Contributing to Public API Toolkit

Thanks for helping improve Public API Toolkit.

This project is a TypeScript MCP server that turns public APIs into 41 grouped, agent-ready tools. Good contributions usually fall into one of three buckets:

- add or improve tool coverage
- fix broken or degraded upstream providers
- improve reliability, packaging, or documentation

## Quick Links

- [README.md](./README.md)
- [STATUS.md](./STATUS.md)
- [docs/getting-started.md](./docs/getting-started.md)
- [docs/configuration/tool-groups.md](./docs/configuration/tool-groups.md)
- [Issues](https://github.com/nikhilreddy3888/public-api-toolkit/issues)

## Development Setup

```bash
git clone https://github.com/nikhilreddy3888/public-api-toolkit.git
cd public-api-toolkit
npm install
npm test
npm run build
```

## Project Structure

```text
src/
  catalog/
  groups/
  lib/
  server/
tests/
docs/
examples/
plugins/
skills/
```

The tool groups live in:

- `src/groups/civicData.ts`
- `src/groups/dataReference.ts`
- `src/groups/development.ts`
- `src/groups/finance.ts`
- `src/groups/funValidationSecurity.ts`
- `src/groups/geoLocation.ts`
- `src/groups/mediaEntertainment.ts`
- `src/groups/scienceLifestyle.ts`
- `src/groups/textKnowledge.ts`
- `src/groups/weatherEnvironment.ts`

## How To Add Or Update A Tool

### 1. Pick the right group

Keep related tools together. If a tool does not fit any existing group well, open an issue before creating a new group.

### 2. Add the tool definition

Follow the existing `createToolGroup(...)` pattern:

```ts
createToolGroup({
  key: "new_tool",
  description: "What this tool does.",
  inputSchema: objectSchema(["action1", "action2"], {
    param1: stringProp("Description."),
    limit: integerProp("Maximum results.", { default: 10 }),
  }),
  execute: (input, ctx) =>
    runActionMap("new_tool", input, ctx, {
      action1: async () => ctx.fetchJson("https://api.example.com/data"),
      action2: async () => {
        const key = ctx.getEnv("EXAMPLE_API");
        if (!key) {
          return missingKeyMessage(
            ["EXAMPLE_API"],
            "Example API requests require an API key.",
          );
        }

        return ctx.fetchJson(
          withQuery("https://api.example.com/search", {
            api_key: key,
            query: readString(input, "param1"),
          }),
        );
      },
    }),
});
```

### 3. Update the catalog description

Add or update the entry in `src/catalog/groups.ts` so the tool is described correctly in the registry and docs.

### 4. Add tests first

Before changing implementation, add a failing test in:

- `tests/groups.test.ts` for tool behavior
- `tests/shared.test.ts` for shared runtime behavior
- `tests/smoke.test.ts` for packaging or doc-surface guarantees

### 5. Verify the full repo

```bash
npm test
npm run build
```

## Broken API Fix Guide

Public APIs drift. When an upstream breaks, try to fix it in the smallest durable way.

### 1. Reproduce directly

```bash
curl "https://problematic-api.example/endpoint"
```

Common failure patterns:

- `404`: endpoint moved or API shape changed
- `401` or `403`: auth requirement changed
- `429`: rate limiting
- `503` or `5xx`: transient outage
- `ENOTFOUND`: domain or DNS failure
- TLS or SSL error: certificate or host issue

### 2. Decide the right repair

Preferred order:

1. Fix the endpoint if the provider still exists
2. Add a fallback if the primary provider is flaky
3. Mark the provider as key-required if that is the real constraint
4. Remove or de-emphasize the tool only when the upstream is truly gone

### 3. Document the change

If a provider swap materially changes behavior, update:

- `STATUS.md`
- `README.md` if user-facing expectations changed
- relevant config docs if auth requirements changed

## Reliability Guidelines

### Do

- prefer focused, single-call APIs
- add fallbacks for obviously dead providers
- use the shared fetch layer for timeout and retry behavior
- return helpful key-missing guidance through `missingKeyMessage(...)`
- keep outputs structured and concise for agent use

### Don't

- fetch huge datasets and filter client-side when a query endpoint exists
- add multiple sequential upstream calls unless the value is clear
- hardcode secrets or suggest checked-in API keys
- silently change the MCP contract without tests and docs

## Token Efficiency Guidelines

Public API Toolkit is most valuable when it replaces expensive web-search style flows with compact structured data.

Good additions:

- weather, finance, geolocation, dictionaries, public records, reference data
- endpoints that return clean JSON with stable query parameters

Lower-value additions:

- providers that mostly return noisy HTML or unstable payloads
- tools that require heavy client-side stitching across many requests

## Pull Request Checklist

Before opening a PR:

- [ ] Added or updated tests first
- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] Updated docs if behavior changed
- [ ] Updated `STATUS.md` if provider health changed meaningfully
- [ ] Kept the change focused

## Pull Request Template

```md
## Summary
- short description of what changed

## Verification
- [ ] npm test
- [ ] npm run build
- [ ] manual API check if relevant

## Notes
- provider changes, fallbacks, or API-key implications
```

## Questions

- Open an [issue](https://github.com/nikhilreddy3888/public-api-toolkit/issues)
- Or start from an existing provider-health or roadmap issue if one already exists

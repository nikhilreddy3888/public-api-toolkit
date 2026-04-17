# AGENTS.md

## Commands

```bash
npm test          # run all tests (tsx --test tests/*.test.ts)
npm run build     # compile TypeScript (tsc -p tsconfig.json)
npm run dev       # run from source (tsx src/index.ts)
```

CI runs: `npm ci && npm run build && npm test` (build must precede test because the Gemini packaging test requires `dist/index.js`).

## Test runner

- Node built-in test runner (`node:test`), not Jest or Vitest.
- Assertions use `node:assert/strict`.
- All test files live in `tests/` and match `tests/*.test.ts`.
- Tests import directly from `../src/` (no path aliases).
- No test framework config file. No `--watch` flag in the test script.

## Architecture

TypeScript MCP server exposing 41 tools as `public_api_<group>` over stdio.

```
src/index.ts              entrypoint (shebang, starts stdio transport)
src/server/createServer.ts  MCP request handler, wires tool calls
src/server/toolRegistry.ts  lists tools from group definitions
src/catalog/groups.ts      tool group key→description map (source of truth for group names)
src/catalog/toolGroups.ts  imports all groups, builds lookup map
src/groups/*.ts             tool group implementations (12 files, one per category)
src/lib/tool.ts             createToolGroup, runActionMap, readString/readNumber/withQuery/missingKeyMessage
src/lib/schema.ts           objectSchema, stringProp, integerProp, etc.
src/lib/apiFetch.ts         shared fetch with 15s timeout, 3 retries on 429/5xx
src/lib/errors.ts           ToolError / InputError / ConfigError / UpstreamError
src/lib/env.ts              PUBLIC_APIS_* env var resolution
src/lib/response.ts         30K char response truncation
```

Every tool follows the same pattern: `createToolGroup({ key, description, inputSchema, execute })` where `execute` delegates to `runActionMap` with an action→handler map. Adding a tool means adding a handler in the right `src/groups/*.ts` file and optionally a new key in `src/catalog/groups.ts`.

## Key conventions

- **Action-based dispatch**: every tool takes `{ action: string, ... }` and routes via `runActionMap`. Actions are enums in the JSON Schema (`enumProp` inside `objectSchema`).
- **Environment variables**: API keys use `PUBLIC_APIS_<NAME>` prefix. The `getEnv` callback resolves them via `getPublicApiEnv` (`src/lib/env.ts`). When a key is missing, return `missingKeyMessage(...)` — never throw for missing optional keys.
- **Fallbacks**: some tools try a primary provider then fall back on failure. Fallback chains are explicit per-action (no global retry routing).
- **No runtime deps beyond `@modelcontextprotocol/sdk`**: do not add npm dependencies.
- **No path aliases**: imports use relative `../` paths, not `@/` or similar.
- **Strict TypeScript**: `tsconfig.json` enables `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
- **Responses cap at 30K chars**: `serializeToolResult` in `src/lib/response.ts` truncates with a `[TRUNCATED]` marker.
- **User-Agent header**: `public-api-toolkit/1.0` set in `apiFetch`.

## Adding or modifying a tool

1. Edit the group file in `src/groups/` (or create a new group file and import it in `src/catalog/toolGroups.ts`).
2. Add/update the description in `src/catalog/groups.ts`.
3. Add tests in `tests/` that inject fake `fetchJson`/`fetchText`/`getEnv` via the `ToolExecutionContext` — no live HTTP in tests.
4. Run `npm test && npm run build`.
5. Update `README.md` and any affected install or configuration docs if behavior changed.

## Smoke tests reference

`tests/smoke.test.ts` validates packaging identity, install docs existence, and `npm pack` contents. It reads many files at once, so a failure there usually means a packaging or docs descriptor is stale — not a runtime bug.

## Gemini extension packaging

- `npm run package:gemini` builds `release/public-api-toolkit-gemini-extension.tar.gz` via `scripts/package-gemini-extension.mjs`.
- `npm run verify:gemini-release` validates the archive via `scripts/verify-gemini-release.mjs`.
- Version in `gemini-extension.json` must match `package.json` version. The smoke test checks this.

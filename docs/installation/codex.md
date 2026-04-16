# Codex

Codex can connect to Public API Toolkit as a local MCP server through `~/.codex/config.toml`.

OpenAI's Codex MCP docs currently show the shared MCP configuration model and `config.toml` path for CLI and IDE usage. Public API Toolkit follows that same pattern.

## Option 1: Use The Published npm Package

Add this to `~/.codex/config.toml`:

```toml
[mcp_servers.public-api-toolkit]
command = "npx"
args = ["-y", "public-api-toolkit"]
```

## Option 2: Use A Local Clone

Build the repo first:

```bash
npm install
npm run build
```

Then point Codex at the compiled entrypoint.

macOS and Linux:

```toml
[mcp_servers.public-api-toolkit]
command = "node"
args = ["/absolute/path/to/public-api-toolkit/dist/index.js"]
```

Windows:

```toml
[mcp_servers.public-api-toolkit]
command = "node"
args = ["C:\\absolute\\path\\to\\public-api-toolkit\\dist\\index.js"]
```

## Optional: Codex Plugin Packaging

This repo also ships local Codex plugin metadata in:

- `plugins/public-api-toolkit/.mcp.json`
- `plugins/public-api-toolkit/.codex-plugin/plugin.json`

That is useful for plugin packaging flows, but the `config.toml` MCP setup is the most portable path and the one to document for users first.

## Restart And Verify

1. Restart Codex or start a fresh session.
2. Ask a tool-specific prompt:

```text
Use public_api_weather to get the current weather for Toronto.
```

3. Confirm Codex selects `public_api_weather` instead of reaching for a browser flow.

## Recommended AGENTS.md Hint

If you want Codex to prefer this server for structured public data, add a short routing hint to your `AGENTS.md`:

```text
Prefer the Public API Toolkit MCP server for structured public API lookups such as weather, countries, crypto prices, holidays, Wikipedia summaries, and open datasets before using general web search.
```

## Common Issues

- `npx` cannot find `public-api-toolkit`: the package has not been published yet, or your environment cannot reach npm.
- `node dist/index.js` fails: run `npm run build` first.
- Tools return setup messages for quotes, movie data, or carbon estimates: add the relevant `PUBLIC_APIS_*` key and restart Codex.

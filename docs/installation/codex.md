# Codex

Use Public API Toolkit as a local MCP server through `~/.codex/config.toml`.

## Published Package

```toml
[mcp_servers.public-api-toolkit]
command = "npx"
args = ["-y", "public-api-toolkit"]
```

## Local Clone

Build the repo first:

```bash
npm ci
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

## Verify

Restart Codex, then try:

```text
Use public_api_weather to get the current weather for Toronto.
```

## Troubleshooting

- `npx` cannot find `public-api-toolkit`: use the local clone path or check npm access.
- `node dist/index.js` fails: run `npm run build` first.
- A premium action returns a setup message: add the relevant `PUBLIC_APIS_*` key and restart Codex.

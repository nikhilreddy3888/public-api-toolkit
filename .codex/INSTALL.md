# Public API Toolkit For Codex

Add Public API Toolkit as an MCP server in `~/.codex/config.toml`.

```toml
[mcp_servers.public-api-toolkit]
command = "npx"
args = ["-y", "public-api-toolkit"]
```

If you are testing from a local clone instead of npm:

```toml
[mcp_servers.public-api-toolkit]
command = "node"
args = ["/absolute/path/to/public-api-toolkit/dist/index.js"]
```

Then restart Codex and try:

```text
Use public_api_weather to get the current weather for Toronto.
```

Full guide: `docs/installation/codex.md`

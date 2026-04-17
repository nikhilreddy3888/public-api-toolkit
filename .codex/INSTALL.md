# Public API Toolkit For Codex

Add Public API Toolkit to `~/.codex/config.toml`:

```toml
[mcp_servers.public-api-toolkit]
command = "npx"
args = ["-y", "public-api-toolkit"]
```

For a local clone, point Codex at `dist/index.js` instead:

```toml
[mcp_servers.public-api-toolkit]
command = "node"
args = ["/absolute/path/to/public-api-toolkit/dist/index.js"]
```

Restart Codex, then try:

```text
Use public_api_weather to get the current weather for Toronto.
```

Full guide: `docs/installation/codex.md`

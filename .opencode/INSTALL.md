# Public API Toolkit For OpenCode

Add Public API Toolkit as a local MCP server in your `opencode.jsonc` config.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "public-api-toolkit": {
      "type": "local",
      "command": ["npx", "-y", "public-api-toolkit"],
      "enabled": true
    }
  }
}
```

If you are testing from a local clone instead of npm:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "public-api-toolkit": {
      "type": "local",
      "command": ["node", "/absolute/path/to/public-api-toolkit/dist/index.js"],
      "enabled": true
    }
  }
}
```

Then restart OpenCode and try:

```text
Use public-api-toolkit to get the current weather for Toronto.
```

Full guide: `docs/installation/opencode.md`

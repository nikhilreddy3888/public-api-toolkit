# Public API Toolkit For OpenCode

Add Public API Toolkit to `opencode.jsonc`:

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

For a local clone:

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

Restart OpenCode, then try:

```text
Use public-api-toolkit to get the current weather for Toronto.
```

Full guide: `docs/installation/opencode.md`

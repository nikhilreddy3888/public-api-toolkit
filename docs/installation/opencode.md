# OpenCode

OpenCode supports Public API Toolkit through the `mcp` block in `opencode.jsonc`.

## Published Package

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

## Local Clone

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

Reference example: [../../examples/opencode/opencode.jsonc](../../examples/opencode/opencode.jsonc)

## Verify

```text
Use the public-api-toolkit tool for a Wikipedia summary of Toronto.
```

## Notes

- OpenCode exposes MCP tools under the server name you choose.
- Public API Toolkit often replaces several narrow public-data servers.

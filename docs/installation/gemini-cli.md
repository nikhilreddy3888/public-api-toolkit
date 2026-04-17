# Gemini CLI

Gemini CLI supports Public API Toolkit as either an extension or a direct MCP entry.

## Extension Install

```bash
gemini extensions install https://github.com/nikhilreddy3888/public-api-toolkit
```

Verify with:

```text
/extensions list
/mcp list
```

## Direct `settings.json`

Example:

```json
{
  "mcpServers": {
    "public-api-toolkit": {
      "command": "npx",
      "args": ["-y", "public-api-toolkit"]
    }
  }
}
```

For a local clone:

```json
{
  "mcpServers": {
    "public-api-toolkit": {
      "command": "node",
      "args": ["/absolute/path/to/public-api-toolkit/dist/index.js"]
    }
  }
}
```

Reference example: [../../examples/gemini/settings.json](../../examples/gemini/settings.json)

## Verify

```text
/mcp list
Use the Public API Toolkit MCP server to get the current weather for Toronto.
```

## Notes

- Keep the server alias hyphenated: `public-api-toolkit`.
- Gemini namespaces tools under the server alias rather than exposing bare `public_api_*` names.

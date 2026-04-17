# Cursor

Cursor supports Public API Toolkit through `mcp.json`.

## Published Package

Add this to your Cursor MCP config:

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

## Local Clone

Build the repo first:

```bash
npm ci
npm run build
```

Then point Cursor at the compiled entrypoint:

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

Reference example: [../../examples/cursor/mcp.json](../../examples/cursor/mcp.json)

## Verify

```text
Use public_api_country_data to summarize Japan.
```

## Troubleshooting

- Restart Cursor after editing `mcp.json`.
- If `npx` cannot launch the package, use the local clone setup.
- If keys are missing, start Cursor from an environment that already has the needed `PUBLIC_APIS_*` variables.

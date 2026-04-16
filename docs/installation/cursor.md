# Cursor

Cursor supports MCP natively through `mcp.json`. Public API Toolkit fits the local stdio flow directly.

OpenAI's Docs MCP guide currently documents Cursor using the same `mcpServers` structure shown here, and Cursor's own docs describe the `mcp.json` transport format.

## Option 1: Use The Published npm Package

Add this to `~/.cursor/mcp.json` on macOS or Linux, or the equivalent Cursor MCP config on your platform:

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

## Option 2: Use A Local Clone

Build the repo first:

```bash
npm install
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

The packaged example lives at [../../examples/cursor/mcp.json](../../examples/cursor/mcp.json).

## Restart And Verify

1. Restart Cursor.
2. Open the MCP tools picker if needed and confirm `public-api-toolkit` is enabled.
3. Try a direct prompt:

```text
Use public_api_country_data to summarize Japan.
```

## Good First Prompts

- `Use public_api_weather to get the current weather for Toronto.`
- `Use public_api_wikipedia to summarize Model Context Protocol.`
- `Use public_api_transport to find transit stations for Berlin.`

## Common Issues

- Cursor shows the server but tools do not appear: restart the app after editing `mcp.json`.
- `npx` cannot launch the package: use the local clone configuration until the npm package is published.
- Your provider keys are not visible inside Cursor: launch Cursor from a shell that already has the `PUBLIC_APIS_*` variables exported, or configure environment injection through your platform workflow.

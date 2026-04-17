# Claude Code

Public API Toolkit runs as a local stdio MCP server in Claude Code.

## Project `.mcp.json`

Create or update `.mcp.json` in your project root:

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

Reference example: [../../examples/claude-code/mcp.json](../../examples/claude-code/mcp.json)

## Claude CLI

Published package:

```bash
claude mcp add-json public-api-toolkit '{"type":"stdio","command":"npx","args":["-y","public-api-toolkit"]}'
```

Local clone:

```bash
claude mcp add-json public-api-toolkit '{"type":"stdio","command":"node","args":["/absolute/path/to/public-api-toolkit/dist/index.js"]}'
```

Verify with:

```bash
claude mcp get public-api-toolkit
```

## Verify

```text
Use public_api_crypto_data to get the current bitcoin price in USD.
```

## Troubleshooting

- Claude Code may ask for approval when a project server is defined in `.mcp.json`.
- If `claude mcp add-json` fails, recheck shell quoting.
- If a premium action returns a setup message, export the required `PUBLIC_APIS_*` key before launching Claude Code.

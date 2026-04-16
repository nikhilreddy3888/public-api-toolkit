# Claude Code

Claude Code supports local MCP servers directly. Public API Toolkit works as a stdio server, which maps cleanly onto Claude Code's `mcpServers` configuration.

Anthropic's MCP docs describe two good setup paths:

- a shared `.mcp.json` file for project-scoped servers
- `claude mcp add-json` for adding a server from JSON

## Option 1: Project-Scoped `.mcp.json`

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

If you are using a local clone instead of a published npm package:

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

The repo includes the same JSON shape at [../../examples/claude-code/mcp.json](../../examples/claude-code/mcp.json).

## Option 2: Add It Through The Claude CLI

Published npm package:

```bash
claude mcp add-json public-api-toolkit '{"type":"stdio","command":"npx","args":["-y","public-api-toolkit"]}'
```

Local clone:

```bash
claude mcp add-json public-api-toolkit '{"type":"stdio","command":"node","args":["/absolute/path/to/public-api-toolkit/dist/index.js"]}'
```

Then verify:

```bash
claude mcp get public-api-toolkit
```

## Restart And Verify

Ask Claude Code something concrete:

```text
Use public_api_crypto_data to get the current bitcoin price in USD.
```

Other good smoke prompts:

- `Use public_api_wikipedia to summarize Toronto.`
- `Use public_api_holidays to list the next public holidays in Canada.`
- `Use public_api_open_data to find a public dataset about urban quality of life.`

## Environment Variables

Anthropic's MCP docs note that `.mcp.json` supports environment-variable expansion. That makes it a good place to share portable paths or inject client-side secrets when your team already has them in the shell environment.

Public API Toolkit itself reads provider keys from `PUBLIC_APIS_*` variables at runtime.

## Common Issues

- Claude Code asks for approval on a project server: that is expected for project-scoped `.mcp.json` entries.
- JSON pasted into `claude mcp add-json` fails to parse: quote and escape the JSON carefully for your shell.
- A premium action returns a setup message: export the needed `PUBLIC_APIS_*` key before launching Claude Code.

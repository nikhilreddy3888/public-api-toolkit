# Gemini CLI

Gemini CLI supports both direct MCP configuration and installable extensions. Public API Toolkit now supports both routes.

Gemini CLI's current docs describe:

- top-level `mcpServers` entries in `settings.json` for local MCP servers
- extension installs from a GitHub repository or local folder using `gemini extensions install`

## Option 1: Install As A Gemini Extension

This repo now includes `gemini-extension.json` and `GEMINI.md`, so once the GitHub repo is public you can install it directly:

```bash
gemini extensions install https://github.com/<owner>/public-api-toolkit
```

Then verify:

```text
/extensions list
/mcp list
```

This path is best once the npm package is published, because the extension launches:

```bash
npx -y public-api-toolkit
```

## Option 2: Add It Directly In Gemini Settings

Gemini CLI also supports MCP servers through `settings.json`.

macOS:

```text
~/Library/Application Support/GeminiCli/settings.json
```

Linux:

```text
~/.gemini/settings.json
```

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

If you are testing from a local clone:

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

The repo includes a ready-to-copy example at [../../examples/gemini/settings.json](../../examples/gemini/settings.json).

## Restart And Verify

Restart Gemini CLI, then use:

```text
/mcp list
```

You should see `public-api-toolkit` connected.

Then try:

```text
Use the Public API Toolkit MCP server to get the current weather for Toronto.
```

## Notes

- Use a server alias with hyphens, not underscores. `public-api-toolkit` is already safe for Gemini's MCP naming rules.
- Gemini CLI namespaces discovered MCP tools under the server alias, so the fully qualified tool names will be prefixed with the MCP server name instead of appearing as bare `public_api_*` tools.
- The extension route is repo-friendly. The `settings.json` route is best for local development before npm publish.

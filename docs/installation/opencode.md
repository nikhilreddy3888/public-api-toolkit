# OpenCode

OpenCode supports local MCP servers directly through the `mcp` block in `opencode.jsonc`. Public API Toolkit fits that local MCP flow cleanly.

OpenCode's MCP docs currently show local servers configured with:

- `type: "local"`
- a `command` array
- optional `environment`
- optional `enabled`

## Configure OpenCode

Add this to your `opencode.jsonc`:

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

If you are testing from a local clone:

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

The repo includes a ready-to-copy example at [../../examples/opencode/opencode.jsonc](../../examples/opencode/opencode.jsonc).

## Restart And Verify

Restart OpenCode, then ask:

```text
Use public-api-toolkit to get the current weather for Toronto.
```

Or a more MCP-specific request:

```text
Use the public-api-toolkit tool for a Wikipedia summary of Toronto.
```

## Notes

- OpenCode exposes MCP tools under the server name you choose in `mcp`, so keep the name short and readable.
- If you have many MCP servers enabled, OpenCode's docs warn that tool context can add up quickly. Public API Toolkit is broad enough that it is often worth enabling on its own instead of alongside many overlapping public-data servers.

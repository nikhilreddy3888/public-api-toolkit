# Generic MCP Clients

If your MCP client can launch a local stdio process, use this shape:

```json
{
  "command": "npx",
  "args": ["-y", "public-api-toolkit"]
}
```

For a local clone:

```json
{
  "command": "node",
  "args": ["/absolute/path/to/public-api-toolkit/dist/index.js"]
}
```

Reference example: [../../examples/generic/stdio.json](../../examples/generic/stdio.json)

## Verify

```text
Use public_api_wikipedia to summarize Toronto.
Use public_api_weather to get the current weather for Toronto.
```

## Notes

- Tools are exposed as `public_api_<group>`.
- Missing premium keys return a readable setup message.
- Remote-only MCP clients still need a bridge or a future HTTP transport.

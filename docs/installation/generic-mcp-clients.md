# Generic MCP Clients

If your MCP client can launch a local stdio process, Public API Toolkit should fit the standard command-plus-args shape.

The portable form is:

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

The repo includes this shape at [../../examples/generic/stdio.json](../../examples/generic/stdio.json).

## When To Use Each Form

- Use `npx -y public-api-toolkit` after the package is published to npm.
- Use `node /absolute/path/to/dist/index.js` when testing from a clone or pinning to a local checkout.

## Verification Prompt

Use a prompt that clearly maps to one tool:

```text
Use public_api_wikipedia to summarize Toronto.
```

Then try a second request with a different tool family:

```text
Use public_api_weather to get the current weather for Toronto.
```

## For Remote-Only Clients

Some MCP clients accept only remote HTTP or SSE servers. Public API Toolkit does not ship a remote transport in this release, so those clients need a bridge or a future HTTP-enabled version of this repo.

## Operational Notes

- Tools are exposed as `public_api_<group>`.
- Missing premium keys produce a readable configuration message instead of a crash.
- Large outputs are truncated to protect the conversation context window.

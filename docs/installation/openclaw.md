# OpenClaw

OpenClaw can install Public API Toolkit as a bundle from npm, then map the packaged MCP config and skill content into the next session.

The easiest user flow is:

```bash
openclaw plugins install public-api-toolkit
```

## Verify Detection

After install, confirm OpenClaw detected the package as a bundle:

```bash
openclaw plugins list
openclaw plugins inspect public-api-toolkit
```

You should see the package listed as a bundle-backed plugin with its bundled MCP and skill content available for mapping.

## Restart The Gateway

Apply the mapped capabilities in a fresh session:

```bash
openclaw gateway restart
```

## What Gets Mapped

Public API Toolkit ships:

- root `.claude-plugin/plugin.json` for bundle detection
- root `.mcp.json` for MCP server configuration
- `skills/public-api-toolkit/SKILL.md` for routing guidance

That lets OpenClaw treat the package as an external bundle instead of requiring a separate native plugin.

## Local Directory Install

If you are testing a local checkout before publishing, OpenClaw can also install the repository directly:

```bash
openclaw plugins install /absolute/path/to/public-api-toolkit
```

Then run the same verification and restart commands.

## Example Prompt

Once the gateway restarts, try a structured lookup:

```text
Use public_api_wikipedia to summarize Toronto.
```

Then try a second tool family:

```text
Use public_api_weather to get the current weather for Toronto.
```

## Notes

- Public API Toolkit currently ships a local stdio MCP server, not a hosted HTTP/SSE transport.
- Premium-compatible providers still depend on the same `PUBLIC_APIS_*` environment variables documented elsewhere in this repo.
- If OpenClaw does not show the expected mapped content, run `openclaw plugins inspect public-api-toolkit` and verify the installed bundle includes `.claude-plugin/plugin.json`, `.mcp.json`, and `skills/public-api-toolkit/SKILL.md`.

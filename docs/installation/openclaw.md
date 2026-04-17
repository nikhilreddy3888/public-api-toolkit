# OpenClaw

Install Public API Toolkit as a bundle:

```bash
openclaw plugins install public-api-toolkit
```

## Verify

```bash
openclaw plugins list
openclaw plugins inspect public-api-toolkit
openclaw gateway restart
```

After the gateway restarts, try:

```text
Use public_api_wikipedia to summarize Toronto.
```

## Local Checkout

You can also install a local repository checkout:

```bash
openclaw plugins install /absolute/path/to/public-api-toolkit
```

## Notes

- The bundle includes `.claude-plugin/plugin.json`, `.mcp.json`, and `skills/public-api-toolkit/SKILL.md`.
- Premium-compatible providers still use the same `PUBLIC_APIS_*` variables documented elsewhere in the repo.

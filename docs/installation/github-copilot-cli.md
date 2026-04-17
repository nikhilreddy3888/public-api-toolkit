# GitHub Copilot CLI

GitHub Copilot CLI can install Public API Toolkit directly from the repository because the repo includes top-level plugin metadata.

## Install

```bash
copilot plugin install nikhilreddy3888/public-api-toolkit
```

Or use the full Git URL:

```bash
copilot plugin install https://github.com/nikhilreddy3888/public-api-toolkit.git
```

Verify with:

```bash
copilot plugin list
```

## Verify

```text
Use public_api_wikipedia to summarize Model Context Protocol.
```

## Notes

- The plugin launches `npx -y public-api-toolkit`.
- If you are testing before npm publication, use a direct local MCP client instead.

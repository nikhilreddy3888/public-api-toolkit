# GitHub Copilot CLI

GitHub Copilot CLI can install plugins directly from a Git repository when that repository contains a plugin manifest in `.claude-plugin`, `.github/plugin`, `.plugin`, or the repo root.

Public API Toolkit now includes a root `.claude-plugin/plugin.json` plus `.mcp.json`, so the repo can be installed directly as a Copilot CLI plugin.

## Install From GitHub

Once this repository is public:

```bash
copilot plugin install <owner>/public-api-toolkit
```

Or with a full Git URL:

```bash
copilot plugin install https://github.com/<owner>/public-api-toolkit.git
```

Then verify:

```bash
copilot plugin list
```

## How It Works

The installed plugin points Copilot CLI at:

```bash
npx -y public-api-toolkit
```

That means the GitHub install path is intended for the published repo plus published npm package.

## Pre-Publish Testing

Before the npm package exists, use one of the direct local MCP clients first, such as Codex, Claude Code, Cursor, OpenCode, or Gemini CLI settings-based MCP setup.

## Example Prompt

```text
Use public_api_wikipedia to summarize Model Context Protocol.
```

## Notes

- GitHub's docs also allow `copilot plugin install OWNER/REPO:PATH/TO/PLUGIN` for nested plugin directories, but this repo supports a simpler top-level install path now.
- If you later create a dedicated plugin marketplace, you can add that separately. It is not required for direct repository install.

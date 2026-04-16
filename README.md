# Public API Toolkit

Public API Toolkit is a cross-platform MCP server that turns public APIs into clean, agent-ready tools.

It packages 41 grouped `public_api_<group>` tools behind one local MCP server, so agents can ask for weather, countries, crypto prices, holidays, Wikipedia summaries, open data, transport lookups, and dozens of other structured API results without scraping web pages first.

## At A Glance

| Area | Status |
| --- | --- |
| Package | `public-api-toolkit@1.0.1` |
| Tool groups | `10` |
| Tools | `41` |
| npm | [public-api-toolkit](https://www.npmjs.com/package/public-api-toolkit) |
| GitHub | [nikhilreddy3888/public-api-toolkit](https://github.com/nikhilreddy3888/public-api-toolkit) |

Repository health references:

- [STATUS.md](STATUS.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

## Why It Exists

- Structured JSON beats brittle scraping for repeatable agent workflows.
- One MCP server is easier to install than wiring dozens of single-purpose connectors.
- Premium providers are optional, so the server stays useful even without API keys.
- The same tool surface can be reused across Codex, Claude Code, Cursor, and other MCP clients.

## When It Helps Most

Public API Toolkit is strongest on structured lookup tasks, where web search tends to waste tokens and return noisy HTML:

- weather and air quality
- currency and crypto prices
- country and university data
- dictionaries and Wikipedia summaries
- public holidays, geocoding, and open-data lookups

It is less differentiated for open-ended research, editorial comparisons, or tasks where the model still needs to browse multiple human-written sources.

For a current snapshot of known-good areas versus fragile providers, see [STATUS.md](STATUS.md).

## Client Support

| Client | Status | Notes |
| --- | --- | --- |
| Codex | Direct | Local stdio MCP server via `~/.codex/config.toml` |
| Claude Code | Direct | Local stdio MCP server via `.mcp.json` or `claude mcp add-json` |
| Cursor | Direct | Local stdio MCP server via `mcp.json` |
| OpenCode | Direct | Local MCP server via `opencode.jsonc` |
| Gemini CLI | Direct | Local `settings.json` MCP or extension install from this repo |
| GitHub Copilot CLI | Direct after publish | Direct repo plugin install via `.claude-plugin` and `.mcp.json` |
| Generic MCP clients | Direct | Use the same stdio command shape if the client supports local MCP processes |
| ChatGPT Apps / remote MCP | Partial | Requires a remote MCP transport; this repo currently ships stdio only |

## Quick Start

### Run From Source

```bash
npm install
npm test
npm run build
node dist/index.js
```

### Run After npm Publish

```bash
npx -y public-api-toolkit
```

### Add It To A Client

- Codex: [docs/installation/codex.md](docs/installation/codex.md)
- Claude Code: [docs/installation/claude-code.md](docs/installation/claude-code.md)
- Cursor: [docs/installation/cursor.md](docs/installation/cursor.md)
- OpenCode: [docs/installation/opencode.md](docs/installation/opencode.md)
- Gemini CLI: [docs/installation/gemini-cli.md](docs/installation/gemini-cli.md)
- GitHub Copilot CLI: [docs/installation/github-copilot-cli.md](docs/installation/github-copilot-cli.md)
- ChatGPT / remote MCP: [docs/installation/chatgpt-mcp.md](docs/installation/chatgpt-mcp.md)
- Generic MCP clients: [docs/installation/generic-mcp-clients.md](docs/installation/generic-mcp-clients.md)

## Tool Coverage

Public API Toolkit exposes 41 tools across these categories:

- Data reference: countries, dictionaries, books, universities
- Geolocation: geocoding and IP lookup
- Finance: FX, crypto, stocks
- Weather and environment: forecasts, air quality, carbon
- Development: HTTP utilities, DNS, code execution, screenshots, placeholder data
- Text and knowledge: translation, text analysis, Wikipedia, news
- Media and entertainment: images, music, movies, games
- Science and lifestyle: math, space, food, blockchain, holidays, transport
- Validation and security: email, phone, content validation, security feeds, jobs
- Civic data: government, health, and open data sets

The full catalog lives in [docs/configuration/tool-groups.md](docs/configuration/tool-groups.md).

## API Keys

Most tools work without authentication. Optional premium-compatible providers are activated through `PUBLIC_APIS_<NAME>` environment variables such as:

- `PUBLIC_APIS_FINNHUB`
- `PUBLIC_APIS_ALPHAVANTAGE`
- `PUBLIC_APIS_FRED`
- `PUBLIC_APIS_OMDB`
- `PUBLIC_APIS_TMDB`
- `PUBLIC_APIS_CARBON_INTERFACE`
- `PUBLIC_APIS_MAILCHECK`
- `PUBLIC_APIS_KICKBOX`
- `PUBLIC_APIS_OPEN_CHARGE_MAP`
- `PUBLIC_APIS_FOODDATA_CENTRAL`

Details:

- [docs/configuration/environment-variables.md](docs/configuration/environment-variables.md)
- [docs/configuration/api-keys.md](docs/configuration/api-keys.md)

## Repository Guide

- Start here: [docs/getting-started.md](docs/getting-started.md)
- Install per client: [docs/installation](docs/installation)
- Configure keys and tool groups: [docs/configuration](docs/configuration)
- Publish to npm and GitHub: [docs/publishing](docs/publishing)
- Contribute or fix providers: [CONTRIBUTING.md](CONTRIBUTING.md)

## Packaging

This repo includes:

- `plugins/public-api-toolkit/.mcp.json` for Codex-compatible MCP packaging
- `plugins/public-api-toolkit/.codex-plugin/plugin.json` for Codex plugin metadata
- `.claude-plugin/plugin.json` and root `.mcp.json` for direct GitHub Copilot CLI plugin install
- `gemini-extension.json` and `GEMINI.md` for Gemini CLI extension install
- `.codex/INSTALL.md` and `.opencode/INSTALL.md` for fetch-and-follow setup flows
- `skills/public-api-toolkit/SKILL.md` for agent routing guidance
- `examples/` with ready-to-copy config snippets

## Runtime Notes

- Transport: stdio MCP server
- Upstream timeout: 15 seconds
- Response cap: 30,000 characters with a truncation marker
- User agent: `public-api-toolkit/1.0`

## Roadmap Themes

The highest-value next steps are:

- Add more useful public APIs
- replace or remove clearly dead upstreams
- add a first-party provider audit script
- continue improving fallback behavior for degraded providers
- improve product positioning around bundled convenience versus token footprint

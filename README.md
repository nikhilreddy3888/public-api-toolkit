# Public API Toolkit

41 tools. One command.

Structured public data for AI agents through one cross-platform MCP server.

Public API Toolkit is a local stdio MCP server that exposes 41 `public_api_*` tools for weather, markets, reference data, Wikipedia, transport, developer lookups, and open datasets. It is designed for factual requests that are better served by stable APIs than by broad web search.

## Quick Start

```bash
npx -y public-api-toolkit
```

Most tools work without API keys. Premium-compatible providers use `PUBLIC_APIS_*` environment variables.

## Install

| Client | Setup |
| --- | --- |
| Claude Code | [docs/installation/claude-code.md](docs/installation/claude-code.md) |
| Codex | [docs/installation/codex.md](docs/installation/codex.md) |
| Cursor | [docs/installation/cursor.md](docs/installation/cursor.md) |
| Gemini CLI | [docs/installation/gemini-cli.md](docs/installation/gemini-cli.md) |
| OpenCode | [docs/installation/opencode.md](docs/installation/opencode.md) |
| GitHub Copilot CLI | [docs/installation/github-copilot-cli.md](docs/installation/github-copilot-cli.md) |
| OpenClaw | [docs/installation/openclaw.md](docs/installation/openclaw.md) |
| Generic MCP clients | [docs/installation/generic-mcp-clients.md](docs/installation/generic-mcp-clients.md) |
| ChatGPT and remote MCP | [docs/installation/chatgpt-mcp.md](docs/installation/chatgpt-mcp.md) |

## What You Get

- 41 tools across 12 grouped tool families
- one local MCP server with a consistent action-based shape
- shared timeout and retry behavior for upstream calls
- readable setup messages when optional keys are missing
- response truncation to protect client context windows

## Tool Families

| Family | Example tools |
| --- | --- |
| Data reference | `public_api_country_data`, `public_api_dictionary`, `public_api_books`, `public_api_university_data` |
| Geo location | `public_api_geocoding`, `public_api_ip_geolocation` |
| Finance | `public_api_currency_exchange`, `public_api_crypto_data`, `public_api_stock_market` |
| Weather and environment | `public_api_weather`, `public_api_air_quality`, `public_api_carbon_footprint` |
| Development | `public_api_http_utils`, `public_api_dns_network`, `public_api_code_execution`, `public_api_placeholder_data` |
| Dev tools | `public_api_dev_tools` |
| Tech news | `public_api_tech_news` |
| Text and knowledge | `public_api_translation`, `public_api_wikipedia`, `public_api_news` |
| Media and entertainment | `public_api_images`, `public_api_music_data`, `public_api_movie_tv_data`, `public_api_game_data` |
| Science and lifestyle | `public_api_math`, `public_api_space`, `public_api_food_recipes`, `public_api_blockchain`, `public_api_holidays`, `public_api_transport` |
| Validation and security | `public_api_random_facts`, `public_api_animals`, `public_api_email_validation`, `public_api_name_insights`, `public_api_data_validation`, `public_api_security_intel`, `public_api_job_search` |
| Civic data | `public_api_government_data`, `public_api_health_data`, `public_api_open_data` |

Full tool catalog: [docs/configuration/tool-groups.md](docs/configuration/tool-groups.md)

## Optional API Keys

These keys unlock providers that need registration or higher quotas:

| Variable | Use |
| --- | --- |
| `PUBLIC_APIS_FINNHUB` / `PUBLIC_APIS_ALPHAVANTAGE` | Stock quotes and symbol search |
| `PUBLIC_APIS_FRED` | Federal Reserve data |
| `PUBLIC_APIS_OMDB` / `PUBLIC_APIS_TMDB` | Movie and TV lookups |
| `PUBLIC_APIS_CARBON_INTERFACE` | Carbon estimates |
| `PUBLIC_APIS_MAILCHECK` / `PUBLIC_APIS_KICKBOX` | Email validation |
| `PUBLIC_APIS_OPEN_CHARGE_MAP` | EV charging data |
| `PUBLIC_APIS_FOODDATA_CENTRAL` | USDA nutrition data |

Configuration guide: [docs/configuration/environment-variables.md](docs/configuration/environment-variables.md)

## Development

```bash
npm ci
npm run build
npm test
```

The server is implemented in TypeScript, uses the Node test runner, and exposes tools over stdio MCP. Contribution guidance lives in [CONTRIBUTING.md](CONTRIBUTING.md).

## Runtime Notes

- Response cap: 30,000 characters
- User-Agent: `public-api-toolkit/1.0`

## Repository Guide

- Install docs: [docs/installation](docs/installation)
- Configuration docs: [docs/configuration](docs/configuration)
- Publishing docs: [docs/publishing](docs/publishing)
- Contributor guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Privacy policy: [PRIVACY.md](PRIVACY.md)
- Landing page: [GitHub Pages](https://nikhilreddy3888.github.io/public-api-toolkit/) in [`site/`](site/)

## FAQ

### Do I need API keys?

No. Most tools use public endpoints without authentication. Optional keys unlock premium or quota-limited providers.

### When should I use this instead of web search?

Use it when the request is naturally structured: weather, exchange rates, Wikipedia summaries, geocoding, holidays, public records, transport, or similar factual lookups.

### Does it work in ChatGPT directly?

Not in the current release. The project ships a local stdio server, so ChatGPT support requires a remote MCP transport in front of it. See [docs/installation/chatgpt-mcp.md](docs/installation/chatgpt-mcp.md).

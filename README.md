<p align="center">
  <img src="site/assets/logo.png" width="120" />
</p>

<h1 align="center">Public API Toolkit</h1>

<p align="center">
  <strong>41 APIs. One command. Zero waste.</strong>
</p>

<p align="center">
  Your AI agent shouldn't scrape Wikipedia to tell you the weather.<br>
  One MCP server gives it structured access to 41 public-data tools — instantly.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/public-api-toolkit"><img src="https://img.shields.io/npm/v/public-api-toolkit?style=flat&color=00e676" alt="npm"></a>
  <a href="https://github.com/nikhilreddy3888/public-api-toolkit/stargazers"><img src="https://img.shields.io/github/stars/nikhilreddy3888/public-api-toolkit?style=flat&color=yellow" alt="Stars"></a>
  <a href="https://github.com/nikhilreddy3888/public-api-toolkit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/nikhilreddy3888/public-api-toolkit?style=flat" alt="License"></a>
  <img src="https://img.shields.io/badge/tools-41-00e676?style=flat" alt="41 tools">
  <img src="https://img.shields.io/badge/zero_config-required-ffab00?style=flat" alt="Zero config">
</p>

<p align="center">
  <a href="#before--after">Before / After</a> &bull;
  <a href="#install">Install</a> &bull;
  <a href="#tool-coverage">41 Tools</a> &bull;
  <a href="#client-support">Clients</a> &bull;
  <a href="#why-it-matters">Why It Matters</a> &bull;
  <a href="#faq">FAQ</a>
</p>

---

## Before / After

<table>
<tr>
<td width="50%">

### What agents do today (expensive)

- Search the web for BTC price &rarr; burns 800+ tokens parsing finance pages
- Reason about FX rates from stale training data &rarr; answer might be months old
- Scrape weather.com HTML for tomorrow's forecast &rarr; brittle, slow, wasteful
- Fetch full Wikipedia pages to summarize one paragraph
- Install a different MCP server for every single capability

</td>
<td width="50%">

### What they should do (instant)

- Call `public_api_crypto_data` &rarr; structured JSON in &lt;300ms
- Call `public_api_currency_exchange` &rarr; live rates, zero hallucination
- Call `public_api_weather` &rarr; clean forecast, 0 HTML parsing
- Call `public_api_wikipedia` &rarr; structured summary, minimal tokens
- One `npx -y public-api-toolkit` covers all 41 tools

</td>
</tr>
</table>

**Same answers. 10&ndash;40x fewer tokens. Seconds instead of minutes.**

```
┌──────────────────────────────────────────┐
│  TOKENS SAVED          ██████████  10–40x │
│  RESPONSE TIME        ██████████  <300ms │
│  SETUP TIME           ██████████  <60s   │
│  MCP SERVERS NEEDED   ██████████  1      │
└──────────────────────────────────────────┘
```

## Install

One command. Every client.

```bash
npx -y public-api-toolkit
```

| Client | How |
|--------|-----|
| **Claude Code** | `claude mcp add-json public-api-toolkit '{"command":"npx","args":["-y","public-api-toolkit"]}'` |
| **Codex** | Add to `~/.codex/config.toml` — [docs/installation/codex.md](docs/installation/codex.md) |
| **Cursor** | Add to `.cursor/mcp.json` — [docs/installation/cursor.md](docs/installation/cursor.md) |
| **Gemini CLI** | `gemini extensions install https://github.com/nikhilreddy3888/public-api-toolkit` |
| **OpenCode** | Add to `opencode.jsonc` — [docs/installation/opencode.md](docs/installation/opencode.md) |
| **Copilot CLI** | Plugin install — [docs/installation/github-copilot-cli.md](docs/installation/github-copilot-cli.md) |
| **OpenClaw** | `openclaw plugins install public-api-toolkit` |
| **Any MCP client** | Use the same stdio command — [docs/installation/generic-mcp-clients.md](docs/installation/generic-mcp-clients.md) |

No API keys needed for most tools. Premium providers unlock with `PUBLIC_APIS_*` environment variables.

## Tool Coverage

41 tools across 10 categories. Related capabilities grouped so agents discover them naturally.

| Tool | Category | What it does |
|------|----------|-------------|
| `public_api_weather` | Weather &amp; Sky | Forecasts, current conditions, alerts, sun times |
| `public_api_air_quality` | Air &amp; Carbon | Air quality, UK carbon intensity, website carbon |
| `public_api_carbon_footprint` | Carbon | Carbon Interface activity estimates |
| `public_api_currency_exchange` | Finance | Live FX rates, 150+ currencies, historical series |
| `public_api_crypto_data` | Crypto | CoinGecko-powered market data |
| `public_api_stock_market` | Stocks | Quotes, symbol search, SEC filings, FRED data |
| `public_api_country_data` | Reference | Country profiles, flags, populations |
| `public_api_dictionary` | Words | Definitions, synonyms, rhymes, autocomplete |
| `public_api_books` | Books | Gutenberg titles, poetry lookups |
| `public_api_university_data` | Education | University search by name and country |
| `public_api_geocoding` | Geo | Forward geocoding, reverse geocoding, postal |
| `public_api_ip_geolocation` | IP | IP lookup for city, region, timezone, network |
| `public_api_wikipedia` | Knowledge | Structured summaries, search, Wikidata |
| `public_api_news` | News | Spaceflight and historic newspaper APIs |
| `public_api_translation` | Language | Translation, detection, novelty translators |
| `public_api_text_analysis` | Safety | Profanity filtering and text safety checks |
| `public_api_music_data` | Media | MusicBrainz, iTunes, lyrics, radio, genres |
| `public_api_movie_tv_data` | Media | Movies, TV, anime, sci-fi, franchise lookups |
| `public_api_images` | Images | Lorem Picsum image placeholders |
| `public_api_space` | Science | NASA, ISS, launches, SpaceX, earthquake data |
| `public_api_math` | Math | Symbolic math and number facts |
| `public_api_food_recipes` | Food | Recipes, nutrition, breweries, food data |
| `public_api_random_facts` | Fun | Jokes, quotes, trivia, xkcd, novelty feeds |
| `public_api_animals` | Fun | Animal images, facts, marine-life data |
| `public_api_game_data` | Fun | Games, cards, RPG, anime, trivia datasets |
| `public_api_http_utils` | Dev | HTTP introspection, QR codes, URL shortening |
| `public_api_dns_network` | Dev | DNS, subnet, and domain search |
| `public_api_code_execution` | Dev | Remote code execution via Wandbox |
| `public_api_placeholder_data` | Dev | Synthetic users, posts, lorem ipsum, UUIDs |
| `public_api_screenshot` | Dev | Website screenshot metadata via Microlink |
| `public_api_email_validation` | Validation | Email deliverability and reputation |
| `public_api_phone_validation` | Validation | Phone device catalog lookups |
| `public_api_data_validation` | Validation | Content validation helpers |
| `public_api_security_intel` | Security | Vulnerability, phishing, threat feeds |
| `public_api_blockchain` | Blockchain | Bitcoin, Helium, and Solana data |
| `public_api_holidays` | Civic | Public holidays, bank holidays, namedays |
| `public_api_transport` | Transit | Flight, bike share, EV charging, transit |
| `public_api_government_data` | Civic | Wanted lists, notices, registers, datasets |
| `public_api_health_data` | Health | FDA, USDA, and NPI registry lookups |
| `public_api_open_data` | Open Data | Civic, culture, sport, city quality datasets |

Full catalog: [docs/configuration/tool-groups.md](docs/configuration/tool-groups.md)

## Why It Matters

Every time an AI agent scrapes a web page for data that already has a clean API, it wastes:

- **Tokens** &mdash; 500&ndash;2000+ tokens parsing HTML vs 50&ndash;100 from a structured endpoint
- **Time** &mdash; 2&ndash;8 seconds browsing vs &lt;300ms calling an API
- **Compute** &mdash; GPU time generates noise instead of signal
- **Energy** &mdash; every avoidable request has a carbon cost

Public API Toolkit redirects that waste into a single structured path. Less scraping. Less hallucination. More signal.

**Safe by default:** every upstream is vetted. No scraping brittle websites, no user data in transit, no secrets in prompts. API keys are optional and isolated through environment variables.

**Built with contributors:** this project thrives because contributors keep adding safe, useful, free APIs. Every new tool means one fewer reason for an agent to scrape the web. [Add yours &rarr;](CONTRIBUTING.md)

## Client Support

| Client | Status | Install |
|--------|--------|---------|
| Claude Code | Direct | [docs/installation/claude-code.md](docs/installation/claude-code.md) |
| Codex | Direct | [docs/installation/codex.md](docs/installation/codex.md) |
| Cursor | Direct | [docs/installation/cursor.md](docs/installation/cursor.md) |
| Gemini CLI | Direct | [docs/installation/gemini-cli.md](docs/installation/gemini-cli.md) |
| OpenCode | Direct | [docs/installation/opencode.md](docs/installation/opencode.md) |
| Copilot CLI | Direct | [docs/installation/github-copilot-cli.md](docs/installation/github-copilot-cli.md) |
| OpenClaw | Direct | [docs/installation/openclaw.md](docs/installation/openclaw.md) |
| Any MCP client | Stdio | [docs/installation/generic-mcp-clients.md](docs/installation/generic-mcp-clients.md) |

## API Keys

Most tools work without authentication. Optional premium providers:

| Variable | Unlocks |
|----------|---------|
| `PUBLIC_APIS_FINNHUB` | Stock quotes and symbol search |
| `PUBLIC_APIS_ALPHAVANTAGE` | FX and stock data |
| `PUBLIC_APIS_FRED` | Federal Reserve economic data |
| `PUBLIC_APIS_OMDB` | Movie and TV lookups |
| `PUBLIC_APIS_TMDB` | The Movie Database |
| `PUBLIC_APIS_CARbon_INTERFACE` | Carbon footprint estimates |
| `PUBLIC_APIS_MAILCHECK` / `PUBLIC_APIS_KICKBOX` | Email validation |
| `PUBLIC_APIS_OPEN_CHARGE_MAP` | EV charging station data |
| `PUBLIC_APIS_FOODDATA_CENTRAL` | USDA nutrition data |

Details: [docs/configuration/environment-variables.md](docs/configuration/environment-variables.md) &bull; [docs/configuration/api-keys.md](docs/configuration/api-keys.md)

## FAQ

**Do I need API keys?**
No. Most tools use free-tier public APIs. Premium providers are optional.

**How is this different from web search?**
Web search returns noisy HTML costing 500&ndash;2000 tokens per lookup. Structured API calls return clean JSON in &lt;300ms using 50&ndash;100 tokens. For factual questions, it's faster, cheaper, and more accurate.

**How is this different from the public-apis list?**
public-apis is a curated reference document. This is a running MCP server that makes those APIs callable by agents with no scraping, no glue code, and no per-API setup. (See [Acknowledgments](#acknowledgments) below.)

**What if an upstream goes down?**
Built-in 15-second timeouts, 3 retries on 429/5xx, and fallback providers for fragile upstreams. [STATUS.md](STATUS.md) documents known-good vs. fragile areas.

**Can I contribute?**
Yes. [CONTRIBUTING.md](CONTRIBUTING.md) has everything. Adding a tool takes ~20&ndash;30 minutes following a consistent pattern.

## Repository Guide

- [Getting started](docs/getting-started.md)
- [Install per client](docs/installation)
- [Configure keys and tool groups](docs/configuration)
- [Publish to npm and GitHub](docs/publishing)
- [Contribute or fix providers](CONTRIBUTING.md)

## Runtime Notes

- Transport: stdio MCP server
- Upstream timeout: 15 seconds
- Response cap: 30,000 characters
- User-Agent: `public-api-toolkit/1.0`

## Acknowledgments

Public API Toolkit would not exist without **[public-apis/public-apis](https://github.com/public-apis/public-apis)** — the incredible community-curated list of free APIs that inspired and guided which upstreams to include. If this toolkit saves you tokens, go star that repository too.

Built by contributors who believe AI agents should **call APIs, not scrape web pages**. Every new tool means less compute wasted on noise, less energy burned on avoidable requests, and more signal for the things that matter.

Add your upstream: [CONTRIBUTING.md](CONTRIBUTING.md) &bull; Open an issue: [GitHub Issues](https://github.com/nikhilreddy3888/public-api-toolkit/issues)

## Landing Page

The repo includes a static GitHub Pages landing page in [`site/`](site/).

- Live site: [nikhilreddy3888.github.io/public-api-toolkit](https://nikhilreddy3888.github.io/public-api-toolkit/)
- Open [`site/index.html`](site/index.html) locally for a no-build preview

---

## Star This Repo

If this saved you tokens, compute, or time &mdash; leave a star. It helps others find it.

[![Star History Chart](https://api.star-history.com/svg?repos=nikhilreddy3888/public-api-toolkit&type=Date)](https://star-history.com/#nikhilreddy3888/public-api-toolkit&Date)

## License

MIT &mdash; free to use, modify, and distribute.
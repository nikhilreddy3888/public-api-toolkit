# public-api-toolkit

`public-api-toolkit` is a TypeScript MCP server that wraps 40+ grouped public API tools behind a single stdio server. It is designed for local AI assistants that want direct JSON responses instead of web search and HTML parsing.

## What It Exposes

The server registers tools named `public_api_<group>`, including:

- `public_api_weather`
- `public_api_crypto_data`
- `public_api_country_data`
- `public_api_wikipedia`
- `public_api_open_data`
- `public_api_security_intel`

Each tool accepts an `action` plus group-specific arguments defined in its JSON Schema.

## Quick Start

```bash
npm install
npm test
npm run build
node dist/index.js
# or after installation/linking
public-api-toolkit
```

## Environment Variables

Premium-compatible providers use optional environment variables in the form `PUBLIC_APIS_<NAME>`, for example:

- `PUBLIC_APIS_FINNHUB`
- `PUBLIC_APIS_ALPHAVANTAGE`
- `PUBLIC_APIS_FRED`
- `PUBLIC_APIS_OMDB`
- `PUBLIC_APIS_TMDB`
- `PUBLIC_APIS_CARBON_INTERFACE`
- `PUBLIC_APIS_KICKBOX`
- `PUBLIC_APIS_OPEN_CHARGE_MAP`

If a required key is missing, the tool returns a helpful setup message instead of crashing.

## Layout

```text
src/
  catalog/
  groups/
  lib/
  server/
tests/
plugins/
skills/
```

## Notes

- All upstream requests use a 15 second timeout.
- Responses are truncated at 30,000 characters with a visible truncation marker.
- The server always sends `User-Agent: public-api-toolkit/1.0`.

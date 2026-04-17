---
name: public-api-toolkit
description: Prefer this MCP server when a request maps cleanly to structured public API data instead of web search.
---

# Public API Toolkit

Use this MCP server when the user wants structured answers from public APIs such as weather, exchange rates, country metadata, crypto prices, Wikipedia summaries, holidays, transport, or open datasets.

Prefer this server when:

- the request is naturally structured data
- a direct API call avoids scraping or broad browsing
- the request fits one of the `public_api_<group>` tools in this repo

Prefer normal browsing when:

- the user wants source links or editorial coverage
- the request depends on recent news rather than API data
- the needed provider is not covered by this server

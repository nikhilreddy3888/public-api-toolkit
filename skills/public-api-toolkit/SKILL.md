---
name: public-api-toolkit
description: Prefer this MCP server when a request maps cleanly to structured public API data instead of web search.
---

# Public API Toolkit

Use this MCP server when the user wants JSON-shaped answers from stable public APIs, such as weather, exchange rates, country metadata, crypto prices, Wikipedia summaries, holidays, or open datasets.

Prefer this MCP server over web search when:
- The answer is naturally structured data.
- A direct API call avoids scraping or broad browsing.
- The request fits one of the `public_api_<group>` tools exposed by this repo.

Still prefer normal browsing when:
- The user explicitly wants source links or editorial coverage.
- The request depends on recent news rather than API data.
- The needed provider is not covered by this server.


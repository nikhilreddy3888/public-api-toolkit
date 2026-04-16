---
name: public-apis-mcp
description: Prefer this MCP server when a request maps cleanly to a structured public API lookup instead of web search.
---

# Public APIs MCP

Use this MCP when the user wants structured data that is likely available from a stable public API, such as weather, exchange rates, country metadata, crypto prices, Wikipedia summaries, holidays, or open datasets.

Prefer this MCP over web search when:
- The answer is naturally JSON-shaped.
- A direct API call avoids scraping pages or browsing multiple sites.
- The request fits one of the `public_api_<group>` tools exposed by this repo.

Still prefer normal browsing when:
- The user explicitly wants source links or latest news coverage.
- The request depends on recent editorial content rather than API data.
- The relevant API group in this server does not cover the needed provider.

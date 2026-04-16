# Public API Toolkit Status

**Last updated:** 2026-04-16  
**Package version:** 1.0.1  
**Total tool groups:** 10  
**Total tools:** 41

This file is a working status snapshot for the repository, not a full automated certification report.

It combines:

- current repository behavior
- targeted local smoke checks
- the April 16, 2026 external audit you shared
- the reliability fixes now implemented in this repo

## Summary

Public API Toolkit is broadly usable today, but not every upstream is equally reliable.

What is in good shape:

- core weather and reference-data tools
- finance tools that rely on stable public providers
- major Wikipedia, dictionary, and geolocation flows
- most development and utility tools
- bundled MCP packaging and installation surfaces

What still needs follow-up:

- a handful of unstable or deprecated upstreams in media, open data, and blockchain
- more systematic provider-health checking
- clearer long-term token-footprint optimization

## Recently Fixed

The following issues were addressed in the repository after the original audit:

- `public_api_random_facts` now falls back from Quotable to ZenQuotes for `quote`
- `public_api_open_data` now falls back from Teleport city search to Open-Meteo geocoding
- the shared fetch layer now retries transient upstream failures and timeouts

## Verified Working

The repo has direct local verification for:

- MCP tool registry exposure (`41` tools)
- weather tool execution
- Wikipedia summary execution
- quote fallback execution
- city-search fallback execution
- packaging and installation docs for supported clients

## Known Fragile Or Incomplete Areas

These are the best current candidates for the next reliability pass:

### Medium priority

- `music_data` search reliability around iTunes-style endpoints
- `food_recipes` product lookups when OpenFoodFacts is degraded
- `math` number-fact style endpoints that can time out
- `open_data.f1_current`
- `open_data.nba_games`

### Deprecated or likely removal candidates

- `blockchain.helium_stats`
- `game_data` endpoints backed by dead hobby deployments

### Key-dependent or partially gated tools

- stock quote/search providers
- OMDb and TMDb actions
- Carbon Interface actions
- Open Charge Map
- FoodData Central
- Mailcheck.ai and Kickbox

## Reliability Priorities

Recommended implementation order:

1. Continue replacing clearly dead upstreams
2. Add a first-party provider audit script
3. Tighten fallback behavior for degraded but useful tools
4. Improve docs around verified versus best-effort providers
5. Explore token-footprint optimization only after core reliability is stronger

## Notes On Token Efficiency

The repo is valuable when it replaces broad web-search flows with structured API calls.

That does not mean every bundled-tool configuration is automatically optimal. The real trade-off is:

- fewer MCP installs and simpler setup
- broader tool availability in one server
- but a larger always-available tool surface than a single-purpose MCP

This is a product positioning and packaging topic, not just an implementation detail. If we improve it, we should do it deliberately rather than with hand-wavy claims.

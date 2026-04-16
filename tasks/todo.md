# Task
- Title: Improve provider reliability for Public API Toolkit
- Status: in_progress
- Owner: Codex

## Spec
- Goal: Create `/Users/nikhilreddy/Downloads/public-apis-mcp` as a polished standalone public repo for the Public API Toolkit MCP server, with renamed package identity, flagship docs, examples, and cross-client setup guides.
- Constraints: Preserve the validated modular TypeScript MCP server and `public_api_<group>` tools, rename product-facing packaging to `public-api-toolkit`, keep docs accurate about client support, and make the repo ready for public GitHub/npm use.
- Verification: `npm test` passes, `npm run build` succeeds, stdio MCP smoke check lists 41 tools, and required docs/examples exist for Codex, Claude Code, Cursor, ChatGPT/generic MCP usage.

## Plan
- [x] Approve the Public API Toolkit brand and repo strategy
- [x] Write the design spec and implementation plan
- [x] Create the sibling repo and copy the validated baseline
- [x] Execute Task 1: repo/package identity and baseline cleanup
- [x] Review Task 1 for spec compliance and code quality
- [x] Execute Task 2: implementation migration polish and test alignment
- [x] Review Task 2 for spec compliance and code quality
- [x] Execute Task 3: plugin packaging, skills, and client examples
- [x] Review Task 3 for spec compliance and code quality
- [x] Execute Task 4: flagship README and installation/configuration docs
- [x] Review Task 4 for spec compliance and code quality
- [x] Execute Task 5: release metadata and full verification
- [x] Review Task 5, then run final repo-wide verification

## Notes
- Assumption: `/tmp/public-apis-mcp` is the current validated implementation source and can be used as migration input.
- Risk: Client setup docs can drift over time, so the docs should be explicit about what is verified versus illustrative.
- Decision: Use `Public API Toolkit` as the product brand while keeping MCP-specific precision in docs and install snippets.

## Review
- Result: Subagent-driven implementation started in `/Users/nikhilreddy/Downloads/public-apis-mcp`
- Verification: Repo initialized on branch `codex/public-api-toolkit`; Task 1 completed via commits `b1e23d0`, `11a4259`, and `59939ba`; Task 3 completed via commits `e4f6e44` and `8e98fa0`; Task 4 docs passed separate spec and accuracy review; `npm install`, `npm test`, `npm run build`, and a real MCP stdio smoke check against `dist/index.js` all succeeded, with the built server listing `41` tools
- Remaining risk: ChatGPT support is intentionally documented as remote-transport-only because this release still ships stdio MCP only

## Follow-up
- Additional distribution surfaces added after launch pass: root `.claude-plugin/plugin.json` and `.mcp.json` for GitHub Copilot CLI direct install, `gemini-extension.json` and `GEMINI.md` for Gemini CLI extension install, `.codex/INSTALL.md` and `.opencode/INSTALL.md` for fetch-and-follow setup, plus installation docs and examples for OpenCode and Gemini CLI
- Verification: `npm test` and `npm run build` passed again after the added integration assets

## Reliability Pass
- Goal: Improve real-world tool reliability with low-risk fixes that help many endpoints without changing the MCP contract.
- Priorities:
  - Add retry handling for transient upstream failures in the shared fetch layer
  - Replace or fallback from clearly dead upstreams where a public substitute exists
  - Keep behavior changes minimal and test-backed
- Plan:
  - [x] Add failing tests for transient fetch retry behavior
  - [x] Add failing tests for `random_facts.quote` fallback behavior
  - [x] Add failing tests for `open_data.city_search` fallback behavior
  - [x] Implement the minimal shared fetch retry logic
  - [x] Implement quote and city-search fallbacks
  - [x] Verify with targeted tests, full test suite, build, and a live MCP smoke check
- Result:
  - `apiFetch` now retries transient upstream failures and timeouts up to 3 attempts with short exponential backoff
  - `public_api_random_facts` falls back from Quotable to ZenQuotes for `quote`
  - `public_api_open_data` falls back from Teleport city search to Open-Meteo geocoding
- Verification:
  - `npm test`
  - `npm run build`
  - Live MCP smoke check confirmed working `quote` and `city_search` responses against `dist/index.js`

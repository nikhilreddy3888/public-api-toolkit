# Task
- Title: Launch Public API Toolkit standalone repository
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
- [ ] Execute Task 1: repo/package identity and baseline cleanup
- [ ] Review Task 1 for spec compliance and code quality
- [ ] Execute Task 2: implementation migration polish and test alignment
- [ ] Review Task 2 for spec compliance and code quality
- [ ] Execute Task 3: plugin packaging, skills, and client examples
- [ ] Review Task 3 for spec compliance and code quality
- [ ] Execute Task 4: flagship README and installation/configuration docs
- [ ] Review Task 4 for spec compliance and code quality
- [ ] Execute Task 5: release metadata and full verification
- [ ] Review Task 5, then run final repo-wide verification

## Notes
- Assumption: `/tmp/public-apis-mcp` is the current validated implementation source and can be used as migration input.
- Risk: Client setup docs can drift over time, so the docs should be explicit about what is verified versus illustrative.
- Decision: Use `Public API Toolkit` as the product brand while keeping MCP-specific precision in docs and install snippets.

## Review
- Result: Subagent-driven implementation started in `/Users/nikhilreddy/Downloads/public-apis-mcp`
- Verification: Repo initialized on branch `codex/public-api-toolkit`; validated baseline copied from `/tmp/public-apis-mcp`; approved plan copied into local docs
- Remaining risk: Pending implementation and review loops for packaging/docs polish

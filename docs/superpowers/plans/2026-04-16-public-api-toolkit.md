# Public API Toolkit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a standalone public repository at `/Users/nikhilreddy/Downloads/public-apis-mcp` that packages the validated MCP server as **Public API Toolkit**, with polished docs, examples, and client-specific setup guides for popular AI tooling.

**Architecture:** Start from the working implementation in `/tmp/public-apis-mcp`, migrate only the MCP-server assets into a fresh sibling repository, rename the package and plugin identities to `public-api-toolkit`, then layer product-grade docs and examples on top. Preserve the modular `src/` architecture and the `public_api_<group>` tool contract while replacing temporary/internal scaffolding with public-facing documentation and packaging.

**Tech Stack:** Node.js 18+, TypeScript, `@modelcontextprotocol/sdk`, native `fetch`, `tsx`, npm, Markdown docs

---

### Task 1: Create the standalone repository skeleton

**Files:**
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/.gitignore`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/README.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/package.json`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/tsconfig.json`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/LICENSE`

- [ ] **Step 1: Write the failing test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("public repo package identity is renamed to public-api-toolkit", async () => {
  const pkg = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  ) as { name: string; bin: Record<string, string> };

  assert.equal(pkg.name, "public-api-toolkit");
  assert.equal(pkg.bin["public-api-toolkit"], "dist/index.js");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/smoke.test.ts`
Expected: FAIL because the sibling repo does not exist yet and the package identity has not been created

- [ ] **Step 3: Create the repository skeleton**

```bash
mkdir -p /Users/nikhilreddy/Downloads/public-apis-mcp
cd /Users/nikhilreddy/Downloads/public-apis-mcp
git init
mkdir -p src tests docs examples plugins skills
```

Create `package.json` with the public package identity:

```json
{
  "name": "public-api-toolkit",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "public-api-toolkit": "dist/index.js"
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js",
    "test": "tsx --test tests/*.test.ts"
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/smoke.test.ts`
Expected: PASS for the renamed package identity test

- [ ] **Step 5: Commit**

```bash
cd /Users/nikhilreddy/Downloads/public-apis-mcp
git add .gitignore README.md package.json tsconfig.json LICENSE tests/smoke.test.ts
git commit -m "chore: initialize public api toolkit repository"
```

### Task 2: Migrate the validated MCP server implementation

**Files:**
- Copy/Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/src/**/*`
- Copy/Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/tests/groups.test.ts`
- Copy/Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/tests/server.test.ts`
- Copy/Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/tests/shared.test.ts`
- Modify: `/Users/nikhilreddy/Downloads/public-apis-mcp/src/index.ts`
- Modify: `/Users/nikhilreddy/Downloads/public-apis-mcp/src/server/createServer.ts`

- [ ] **Step 1: Write the failing test**

```ts
test("tool registry still exposes 41 public_api_<group> tools after migration", () => {
  const tools = listRegisteredTools();
  assert.equal(tools.length, 41);
  assert.ok(tools.some((tool) => tool.name === "public_api_weather"));
  assert.ok(tools.some((tool) => tool.name === "public_api_open_data"));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/server.test.ts`
Expected: FAIL because the migrated `src/` tree does not exist yet

- [ ] **Step 3: Copy the working server and rename product-facing identifiers**

```bash
cd /Users/nikhilreddy/Downloads/public-apis-mcp
cp -R /tmp/public-apis-mcp/src ./src
cp /tmp/public-apis-mcp/tests/groups.test.ts ./tests/groups.test.ts
cp /tmp/public-apis-mcp/tests/server.test.ts ./tests/server.test.ts
cp /tmp/public-apis-mcp/tests/shared.test.ts ./tests/shared.test.ts
cp /tmp/public-apis-mcp/tests/smoke.test.ts ./tests/smoke.test.ts
```

Adjust product-facing strings:

```ts
// src/index.ts
#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server/createServer.js";

const server = createServer();
await server.connect(new StdioServerTransport());
```

```ts
// src/server/createServer.ts
const server = new Server(
  { name: "public-api-toolkit", version: "1.0.0" },
  { capabilities: { tools: {} } },
);
```

- [ ] **Step 4: Run tests to verify the migrated implementation passes**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/groups.test.ts tests/server.test.ts tests/shared.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd /Users/nikhilreddy/Downloads/public-apis-mcp
git add src tests
git commit -m "feat: migrate public api toolkit server implementation"
```

### Task 3: Rename packaging, plugin, and examples for the public product

**Files:**
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/plugins/public-api-toolkit/.mcp.json`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/plugins/public-api-toolkit/.codex-plugin/plugin.json`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/skills/public-api-toolkit/SKILL.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/examples/codex/config.toml`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/examples/claude-code/mcp.json`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/examples/cursor/mcp.json`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/examples/generic/stdio.json`
- Modify: `/Users/nikhilreddy/Downloads/public-apis-mcp/tests/smoke.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
test("codex plugin config points to the renamed dist entrypoint", async () => {
  const raw = await readFile(
    new URL("../plugins/public-api-toolkit/.mcp.json", import.meta.url),
    "utf8",
  );
  const config = JSON.parse(raw) as { command: string; args: string[] };
  assert.equal(config.command, "node");
  assert.deepEqual(config.args, ["dist/index.js"]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/smoke.test.ts`
Expected: FAIL because the renamed plugin packaging does not exist yet

- [ ] **Step 3: Create public-facing packaging assets**

Plugin config:

```json
{
  "command": "node",
  "args": ["dist/index.js"]
}
```

Plugin manifest:

```json
{
  "name": "public-api-toolkit",
  "version": "1.0.0",
  "description": "Cross-platform MCP server for public APIs.",
  "mcp": { "config": ".mcp.json" }
}
```

Codex example:

```toml
[mcp_servers.public_api_toolkit]
command = "npx"
args = ["-y", "public-api-toolkit"]
```

Generic stdio example:

```json
{
  "command": "node",
  "args": ["dist/index.js"]
}
```

- [ ] **Step 4: Run smoke tests to verify packaging passes**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/smoke.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd /Users/nikhilreddy/Downloads/public-apis-mcp
git add plugins skills examples tests/smoke.test.ts
git commit -m "feat: add packaging and client examples"
```

### Task 4: Write flagship product documentation

**Files:**
- Modify: `/Users/nikhilreddy/Downloads/public-apis-mcp/README.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/getting-started.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/installation/codex.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/installation/claude-code.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/installation/cursor.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/installation/chatgpt-mcp.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/installation/generic-mcp-clients.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/configuration/environment-variables.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/configuration/tool-groups.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/configuration/api-keys.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/publishing/npm.md`
- Create: `/Users/nikhilreddy/Downloads/public-apis-mcp/docs/publishing/github-release.md`

- [ ] **Step 1: Write the failing test**

```ts
test("README presents Public API Toolkit as a flagship MCP product", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /Public API Toolkit/);
  assert.match(readme, /SDK\\. MCP\\. API\\. Your setup\\./);
  assert.match(readme, /Codex/);
  assert.match(readme, /Claude Code/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/smoke.test.ts`
Expected: FAIL because the README and docs do not yet match the public product brief

- [ ] **Step 3: Write the public-facing docs**

README opening structure:

```md
# Public API Toolkit

SDK. MCP. API. Your setup.

Public API Toolkit is a cross-platform MCP server that turns public APIs into clean, agent-ready tools.

## Quick Start

```bash
npx -y public-api-toolkit
```

## Works with

- Codex
- Claude Code
- Cursor
- Generic MCP clients
```

Each installation guide must include:

```md
## Configuration
[exact snippet]

## Verify It Works
[example prompt]

## Troubleshooting
[common errors and fixes]
```

- [ ] **Step 4: Run smoke tests to verify the product docs pass**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test -- tests/smoke.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd /Users/nikhilreddy/Downloads/public-apis-mcp
git add README.md docs
git commit -m "docs: launch flagship product documentation"
```

### Task 5: Final verification and public-release readiness

**Files:**
- Modify: `/Users/nikhilreddy/Downloads/public-apis-mcp/.gitignore`
- Modify: `/Users/nikhilreddy/Downloads/public-apis-mcp/package.json`
- Verify: `/Users/nikhilreddy/Downloads/public-apis-mcp/dist/**/*`

- [ ] **Step 1: Add final release-quality ignores and metadata**

`.gitignore` should include:

```gitignore
node_modules/
dist/
.DS_Store
.env
```

`package.json` should include:

```json
{
  "description": "A cross-platform MCP server that turns public APIs into clean, agent-ready tools.",
  "keywords": ["mcp", "public-api", "codex", "claude-code", "cursor"]
}
```

- [ ] **Step 2: Install dependencies and verify tests**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm install`
Expected: dependencies install successfully

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm test`
Expected: all tests PASS

- [ ] **Step 3: Verify production build**

Run: `cd /Users/nikhilreddy/Downloads/public-apis-mcp && npm run build`
Expected: TypeScript compiles successfully and emits `dist/index.js`

- [ ] **Step 4: Verify the built server boots**

Run:

```bash
cd /Users/nikhilreddy/Downloads/public-apis-mcp
node --input-type=module <<'EOF'
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const client = new Client({ name: 'smoke', version: '1.0.0' }, { capabilities: {} });
const transport = new StdioClientTransport({ command: 'node', args: ['dist/index.js'], cwd: process.cwd() });
await client.connect(transport);
const tools = await client.listTools();
console.log(tools.tools.length);
await transport.close();
EOF
```

Expected: prints `41`

- [ ] **Step 5: Commit**

```bash
cd /Users/nikhilreddy/Downloads/public-apis-mcp
git add .gitignore package.json package-lock.json
git commit -m "chore: prepare public api toolkit for release"
```

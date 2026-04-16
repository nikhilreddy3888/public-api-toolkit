# ChatGPT And Remote MCP

Public API Toolkit does not plug directly into ChatGPT out of the box today.

As of April 16, 2026, OpenAI's MCP and Apps SDK documentation distinguishes between:

- local MCP processes used by tools like Codex, Claude Code, and Cursor
- remote MCP servers reachable over the public internet

OpenAI's MCP connector guide describes remote MCP servers as public internet endpoints, and the Apps SDK is built around connecting ChatGPT to deployed MCP apps. Public API Toolkit currently ships a local stdio server only:

```text
node dist/index.js
```

That means you need one more layer before ChatGPT can use it.

## What Works Today

### Path 1: Add A Remote MCP Transport To This Repo

This is the clean long-term approach if ChatGPT support matters to you.

You would extend the server with a remote transport such as streaming HTTP and then deploy it to a public URL. Once that exists, you can follow OpenAI's ChatGPT Apps flow to connect the deployed MCP app.

### Path 2: Put A Bridge In Front Of The Existing Stdio Server

This is useful for experiments or internal deployments.

The bridge process would:

- start `public-api-toolkit` locally
- speak stdio MCP to the toolkit
- expose a remote MCP endpoint that ChatGPT can reach

This repo does not ship that bridge yet.

## Recommended Positioning For This Repository

Treat ChatGPT support as:

- conceptually compatible
- not turnkey in the current release
- best handled by adding remote transport in a follow-up release

That keeps the README honest while still giving users a clear path forward.

## If You Need ChatGPT Support Immediately

1. Keep the stdio server for Codex, Claude Code, Cursor, and local MCP clients.
2. Add or deploy a remote MCP wrapper.
3. Connect the deployed app in ChatGPT's Apps workflow.
4. Verify tool execution against a public URL, not a local process.

## Documentation Note

If you publish this repo before adding remote transport, keep ChatGPT wording explicit:

- say `requires a remote MCP transport`
- do not say `works directly in ChatGPT`
- link users to this file instead of implying parity with local MCP clients

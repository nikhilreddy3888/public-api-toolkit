# ChatGPT And Remote MCP

Public API Toolkit does not connect to ChatGPT directly in the current release because the project ships a local stdio server only:

```text
node dist/index.js
```

ChatGPT requires a remote MCP transport that is reachable over the public internet.

## What You Need

Choose one of these approaches:

1. Add a remote transport such as streaming HTTP to this repo and deploy it.
2. Put a bridge in front of the existing stdio server that exposes a remote MCP endpoint.

This repository does not ship either layer today.

## Recommendation

Use Public API Toolkit directly in local MCP clients such as Codex, Claude Code, Cursor, Gemini CLI, OpenCode, and similar tools. If ChatGPT support matters, treat it as a follow-up deployment task rather than a turnkey install path.

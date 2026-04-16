# GitHub Release

The GitHub release should feel like a product launch, not just a source snapshot.

## Before You Tag

1. Run the full local verification flow.
2. Confirm the README and installation guides reflect the current release.
3. Make sure the release notes match what is actually shipped.

Suggested verification:

```bash
npm test
npm run build
node -e "import('./dist/server/toolRegistry.js').then((m) => console.log(m.listRegisteredTools().length))"
```

## Suggested Release Title

```text
Public API Toolkit v1.0.0
```

## Suggested Release Notes Structure

### Highlights

- Public API Toolkit launches as a standalone MCP server
- 41 grouped `public_api_<group>` tools behind one stdio runtime
- direct local setup guides for Codex, Claude Code, Cursor, and generic MCP clients

### What It Is

Public API Toolkit is a cross-platform MCP server that turns public APIs into clean, agent-ready tools.

### Included In This Release

- the modular TypeScript MCP server
- Codex-compatible plugin packaging
- ready-to-copy client examples
- installation and configuration docs

### Notes

- local stdio MCP is the primary transport in this release
- ChatGPT and other remote-only MCP surfaces need a remote transport layer

## Assets To Attach

- source tarball from GitHub
- optional npm tarball produced by `npm pack`
- screenshots or short GIFs only if they match the actual product and docs

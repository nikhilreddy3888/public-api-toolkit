# GitHub Release

## Before You Tag

1. Run the full local verification flow.
2. Confirm the README and install guides match the release.
3. Make sure the notes reflect the shipped tool surface.

Suggested verification:

```bash
npm test
npm run build
node -e "import('./dist/server/toolRegistry.js').then((m) => console.log(m.listRegisteredTools().length))"
```

## Release Title

```text
Public API Toolkit v1.0.4
```

## Release Notes Checklist

- state that this is a local stdio MCP server
- call out any new or changed `public_api_<group>` tools
- mention any provider or API-key changes
- note that ChatGPT still requires a remote MCP transport

## Assets

- GitHub source tarball
- optional npm tarball from `npm pack`
- screenshots only if they match the current product and docs

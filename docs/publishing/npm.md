# Publishing To npm

This repo is already shaped like a publishable CLI package:

- package name: `public-api-toolkit`
- executable: `public-api-toolkit`
- entrypoint: `dist/index.js`

## Preflight Checklist

1. Run tests.
2. Build the TypeScript output.
3. Confirm the package name and version.
4. Pack the tarball locally before publishing.

```bash
npm test
npm run build
npm pack
```

## Versioning

Bump the version before publishing:

```bash
npm version patch
```

Use `minor` or `major` when the external tool surface changes enough to deserve it.

## Publish

```bash
npm publish --access public
```

After publish, the examples in this repo that use:

```bash
npx -y public-api-toolkit
```

become immediately usable.

## Post-Publish Verification

Run a clean install test from outside the repo:

```bash
npx -y public-api-toolkit
```

Then connect it from one client, such as Codex or Cursor, and confirm a simple prompt succeeds.

## Release Notes Checklist

- Mention that the package is a stdio MCP server.
- Mention that ChatGPT support still requires a remote MCP transport.
- Call out any new `public_api_<group>` tools or newly supported providers.

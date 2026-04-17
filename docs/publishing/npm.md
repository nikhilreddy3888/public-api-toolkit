# Publishing To npm

Public API Toolkit ships as the `public-api-toolkit` CLI with `dist/index.js` as the executable entrypoint.

## Preflight

```bash
npm test
npm run build
npm pack
```

## Version

```bash
npm version patch
```

Use `minor` or `major` when the external tool surface changes materially.

## Publish

```bash
npm publish --access public
```

## Post-Publish Check

Run a clean install outside the repo:

```bash
npx -y public-api-toolkit
```

Then connect it from one client and verify a simple prompt succeeds.

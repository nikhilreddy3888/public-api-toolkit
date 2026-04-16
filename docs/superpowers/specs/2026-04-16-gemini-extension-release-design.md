# Public API Toolkit Gemini Extension Release Design

## Summary

Release Public API Toolkit as a first-class Gemini CLI extension using a hybrid distribution model:

- direct install from the public GitHub repository
- tagged GitHub Releases with a generic self-contained extension archive

This keeps the default install path simple while improving first-install performance for users who prefer GitHub Releases. It also aligns the repository with Gemini CLI gallery discovery requirements by keeping `gemini-extension.json` at the repository root and documenting the required GitHub topic and tagging flow.

## Goals

- Make the repository reliably installable as a Gemini CLI extension from GitHub
- Add a GitHub Releases packaging flow that produces a valid Gemini extension archive
- Keep the extension manifest and package version in sync for predictable updates
- Document stable release steps, gallery discovery requirements, and user install paths
- Reuse the existing Node-based runtime instead of introducing platform-specific binaries

## Non-Goals

- Do not replace the npm-backed runtime with vendored standalone binaries
- Do not add platform-specific release assets unless the runtime shape changes later
- Do not redesign the MCP server or tool surface as part of this work
- Do not introduce a second extension identity or rename the project
- Do not implement repository migration behavior unless the repo actually moves

## Release Model

### Default install path

The default user-facing install path should remain the Git repository:

```bash
gemini extensions install https://github.com/nikhilreddy3888/public-api-toolkit
```

Reasons:

- it is the simplest setup path to explain
- it supports branch, tag, and commit refs through `--ref`
- it matches Gemini CLI guidance for stable/default-branch installs
- it avoids forcing users to understand release assets for everyday installs

### Release-archive path

Tagged GitHub Releases should also publish a generic archive asset for Gemini CLI to consume as the latest release artifact.

Reasons:

- faster initial installs than a full clone
- explicit versioned release artifacts
- better fit for product-style release pages and changelogs
- future-ready if the project later needs build outputs beyond source checkout

### Release channels

- default branch: stable channel
- optional future branch: `dev`
- version tags: `vX.Y.Z`

The repo should not add extra channel complexity unless there is a real need for preview releases.

## Gemini Extension Requirements

The extension must satisfy Gemini CLI expectations in both the repository root and the release archive:

- `gemini-extension.json` at the root
- valid `contextFileName` that points to `GEMINI.md`
- extension version kept in sync with the shipped package version
- runtime entry that launches the MCP server consistently after install

For this project, the extension should continue to launch:

```json
{
  "mcpServers": {
    "public-api-toolkit": {
      "command": "npx",
      "args": ["-y", "public-api-toolkit"]
    }
  }
}
```

That keeps the Gemini extension aligned with the npm-published package instead of inventing a separate release-only runtime model.

## Repository Changes

### 1. Manifest consistency

Update `gemini-extension.json` so its `version` matches `package.json`.

This should become a release invariant:

- package version and Gemini extension version always match
- a release should not ship if those versions drift

### 2. Packaging script

Add a packaging script that:

- runs after a successful build
- creates a temporary release directory
- copies the extension files needed by Gemini CLI
- emits a generic archive to a `release/` directory

The archive should contain, at minimum:

- `gemini-extension.json`
- `GEMINI.md`
- `README.md`
- `LICENSE`
- runtime files required by the extension contract

Because this extension currently uses `npx -y public-api-toolkit`, the archive does not need to embed a compiled standalone binary. It does need to remain a valid extension with the manifest at the archive root.

### 3. GitHub Actions release workflow

Add a workflow triggered by version tags such as `v1.0.4`.

The workflow should:

1. check out the repository
2. set up Node
3. run `npm ci`
4. run `npm test`
5. run `npm run build`
6. run the packaging script
7. create or update a GitHub Release
8. attach the generated generic archive asset

Since the project is platform-independent, start with one generic asset rather than multiple per-platform artifacts.

### 4. Documentation updates

Update Gemini-specific docs so they explain:

- direct repo install
- installing a specific tag or branch with `--ref`
- release-based installs and update expectations
- gallery listing requirements:
  - public GitHub repository
  - `gemini-cli-extension` GitHub topic
  - tagged releases
  - root `gemini-extension.json`

Relevant docs to update:

- `README.md`
- `docs/installation/gemini-cli.md`
- `docs/publishing/github-release.md`

## Archive Structure

The release archive should be a standard Gemini extension archive with `gemini-extension.json` at the root.

Expected shape:

```text
public-api-toolkit/
  gemini-extension.json
  GEMINI.md
  README.md
  LICENSE
  ...
```

The exact extra files can stay minimal, but the archive must validate as a Gemini extension without requiring users to reconstruct repository layout manually.

## Validation And Failure Conditions

The release pipeline should fail when any of the following are true:

- `package.json` and `gemini-extension.json` versions do not match
- `npm test` fails
- `npm run build` fails
- the archive is not created
- `gemini-extension.json` is missing from the archive root
- `GEMINI.md` is missing when referenced by `contextFileName`

This validation is more important than broad automation, because broken packaging would directly affect install and update behavior for Gemini users.

## Testing Strategy

### Local verification

Before tagging a release:

```bash
npm test
npm run build
npm run package:gemini
```

Then verify:

- the generated archive exists
- the archive root contains `gemini-extension.json`
- the manifest version matches `package.json`
- the install docs match the shipped behavior

### CI verification

The tag-triggered release workflow should perform the same checks automatically.

If the repo later adds a broader release checklist, Gemini extension validation should be part of that shared flow rather than a special-case manual step.

## Data Flow

### Development flow

1. update code and docs
2. bump version in `package.json`
3. sync `gemini-extension.json`
4. run local verification

### Release flow

1. merge the release-ready state to the default branch
2. create tag `vX.Y.Z`
3. GitHub Actions runs tests, build, and packaging
4. workflow publishes the GitHub Release and attaches the archive
5. Gemini users install from repo or update to the latest tagged release

### Gallery discovery flow

1. repository remains public
2. repository includes the `gemini-cli-extension` topic
3. releases are tagged publicly
4. crawler finds the repo and validates the root manifest

## Error Handling

Documentation should make two things clear:

- repo install is the default, most flexible path
- GitHub Releases are an optimization, not a different product

If release assets are unavailable, users should still be able to install from the repository. If npm publish lags behind a source release, the docs should avoid claiming the release archive contains a separate standalone runtime.

## Tradeoffs

### Why keep the npm-backed runtime

Pros:

- simplest current runtime model
- consistent with existing install docs
- no binary distribution burden
- no extra platform matrix

Cons:

- still depends on npm availability at runtime
- release archive improves extension delivery, but not the server runtime footprint

This is acceptable for the current product stage because the goal is correct Gemini extension distribution, not shipping a binary application.

### Why use both Git and Releases

Pros:

- direct install stays simple
- tagged releases improve first-install efficiency
- supports both stable branch installs and explicit versioned releases

Cons:

- slightly more docs and automation surface

The added complexity is small and matches Gemini CLI’s documented release model well.

## Success Criteria

- `gemini extensions install https://github.com/nikhilreddy3888/public-api-toolkit` is the documented stable path
- tagged releases attach a valid extension archive
- the manifest version always matches the package version
- the repo is gallery-ready once public tagging and the GitHub topic are in place
- local and CI verification catch broken Gemini packaging before release

## Implementation Notes

- Prefer one generic archive name for now because the extension is platform-independent
- Keep the release workflow separate from the existing `ci.yml` if that keeps tagging logic clearer
- Avoid promising migration support in docs until `migratedTo` is actually needed
- Keep the README concise and let the dedicated Gemini installation guide hold the detailed commands

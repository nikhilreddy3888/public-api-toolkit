---
name: dev_tools
description: >
  Developer tools - npm packages, GitHub repos, CDN libraries. Free. No API key.
  Use when user ask about npm package, GitHub repo, CDN link.
---

Dev tools. Free. No key.

## APIs

- npm: `https://registry.npmjs.org/{package}`
- GitHub: `https://api.github.com/repos/{owner}/{repo}`
- CDNJS: `https://api.cdnjs.com/libraries?search={query}`

## Example

```json
{"package": "lodash"}
```

Returns: latest version, description, homepage.

```json
{"repo": "facebook/react"}
```

Returns: stars, forks, description, default_branch.
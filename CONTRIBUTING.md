# Contributing to Public API Toolkit

Public API Toolkit is a collection of **agent-ready skills**. Instead of a complex server, each skill is defined by a simple `SKILL.md` file that tells the agent how to call an API directly.

The best contributions improve tool coverage, fix broken API endpoints, or tighten documentation.

## Repository Map

```text
skills/
  weather/
    SKILL.md    <-- Definition, API links, and examples
  crypto/
    SKILL.md
site/
  index.html    <-- Marketing landing page
  styles.css
GEMINI.md       <-- Gemini CLI specific context
CLAUDE.md       <-- Claude Code specific context
```

## Add A New Skill

1. Create a new folder in `skills/` (e.g., `skills/my_new_tool/`).
2. Create a `SKILL.md` file inside that folder.
3. Follow the standard format:
   - **Frontmatter**: Name and description.
   - **APIs**: List the endpoints.
   - **Example**: Provide JSON inputs the agent should use.

### `SKILL.md` Example Template:

```markdown
---
name: my_tool
description: >
  Short description of what it does.
  Use when user asks about X, Y, Z.
---

Tool details. Free. No key needed.

## API

- Action: `https://api.example.com/data?query={query}`

## Example

```json
{"query": "search term"}
```
```

## Update Documentation

After adding a skill:
1. Add it to the list in `README.md`.
2. Add it to the skills table in `GEMINI.md` and `CLAUDE.md`.
3. Add it to `.claude-plugin/plugin.json`.

## Fix A Broken Provider

Public APIs drift. Keep the repair as small as possible.

1. Find the `SKILL.md` file for the broken tool.
2. Verify the new endpoint URL.
3. Update the URL and the example if the schema changed.

## Pull Request Checklist

- [ ] Folder created in `skills/`
- [ ] `SKILL.md` follows standard format
- [ ] Updated `README.md`, `GEMINI.md`, and `CLAUDE.md`
- [ ] Added to `.claude-plugin/plugin.json`

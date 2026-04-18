---
name: wikipedia
description: >
  Wikipedia summaries. Free. No API key.
  Use when user ask about topics, want summary.
---

Get Wikipedia summary. Free.

## API

- Summary: `https://en.wikipedia.org/api/rest_v1/page/summary/{title}`
- Search: `https://en.wikipedia.org/w/api.php?action=opensearch&search={query}`

## Example

```json
{"title": "Tokyo"}
```
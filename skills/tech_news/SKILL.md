---
name: tech_news
description: >
  Tech news from Hacker News and Dev.to. Free. No API key.
  Use when user ask about tech news, latest programming articles.
---

Tech news. Free. No key.

## APIs

- Hacker News: `https://hacker-news.firebaseio.com/v0/topstories.json`
- HN Item: `https://hacker-news.firebaseio.com/v0/item/{id}.json`
- Dev.to: `https://dev.to/api/articles?per_page=10`

## Example

```json
{"source": "hackernews", "limit": 5}
```

Returns: top 5 HN stories with titles, urls, score.

```json
{"source": "devto", "tag": "javascript"}
```

Returns: latest JavaScript articles.
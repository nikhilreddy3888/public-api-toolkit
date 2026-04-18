---
name: news
description: >
  Space and science news from Spaceflight News API. Free. No API key.
  Use when user ask about space news, latest launches, NASA updates.
---

Space news. Free. No key.

## API

- Articles: `https://api.spaceflightnewsapi.net/v4/articles/`
- Blogs: `https://api.spaceflightnewsapi.net/v4/blogs/`
- Reports: `https://api.spaceflightnewsapi.net/v4/reports/`

## Example

```json
{"limit": 10}
```

Returns: title, summary, image, url, news_site, published_at.

```json
{"search": "NASA"}
```

Search specific topics.
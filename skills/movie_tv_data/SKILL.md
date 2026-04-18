---
name: movie_tv_data
description: >
  TV and movie data from TVmaze API. Free. No API key.
  Use when user ask about TV shows, movies, actors, episode guides.
---

TV/Movie data. Free. No key.

## API

- Search: `https://api.tvmaze.com/search/shows?q={query}`
- Lookup: `https://api.tvmaze.com/shows/{id}`
- Episodes: `https://api.tvmaze.com/shows/{id}/episodes`
- Schedule: `https://api.tvmaze.com/schedule?country={country}&date={date}`

## Example

```json
{"query": "Breaking Bad"}
```

Returns: show name, summary, image, premiered, rating.

```json
{"id": 169}
```

Get full show details with episode list.
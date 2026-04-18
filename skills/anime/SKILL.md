---
name: anime
description: >
  Anime quotes, facts, and Studio Ghibli info. Free. No API key.
  Use when user ask about anime quotes, random anime facts, Ghibli movies.
---

Anime data. Free. No key.

## APIs

- Random Quote: `https://animechan.xyz/api/random`
- Anime Facts: `https://anime-facts-rest-api.herokuapp.com/api/v1`
- Ghibli Films: `https://ghibliapi.vercel.app/films`
- Anime Search (Jikan): `https://api.jikan.moe/v4/anime?q={query}`

## Example

```json
{"type": "quote"}
```

Returns: random anime quote.

```json
{"query": "Naruto"}
```

Returns: Naruto anime details.

```json
{"type": "ghibli"}
```

Returns: list of Studio Ghibli films.

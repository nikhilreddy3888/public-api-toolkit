---
name: books
description: >
  Book search from Open Library. Free. No API key.
  Use when user ask "find books about X", "who wrote Y", "book search".
---

Book search. Free. No key.

## API

- Search: `https://openlibrary.org/search.json?q={query}`
- By author: `https://openlibrary.org/search.json?author={author}`
- By ISBN: `https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json`

## Example

```json
{"query": "Harry Potter"}
```

Returns: title, author, publish_year, cover (if available).

## Note

Covers available via `https://covers.openlibrary.org/b/id/{id}-M.jpg`
---
name: random_facts
description: >
  Random facts, jokes, quotes from various free APIs. Free. No API key.
  Use when user ask for a fact, joke, quote, random info.
---

Random facts. Free. No key.

## APIs

- Jokes: `https://api.chucknorris.io/jokes/random`
- Quotes: `https://api.quotable.io/random`
- Facts: `https://uselessfacts.jsph.pl/api/v2/facts/random`
- Trivia: `https://opentdb.com/api.php?amount=1`

## Example

```json
{"type": "joke"}
```

Returns: joke text, categories.

```json
{"type": "quote"}
```

Returns: content, author.

```json
{"type": "fact"}
```

Returns: useless but fun fact.
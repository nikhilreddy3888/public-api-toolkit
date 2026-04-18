---
name: entertainment
description: >
  Rick and Morty, Star Wars, and Harry Potter data. Free. No API key.
  Use when user ask about Rick and Morty, Star Wars characters, Harry Potter info.
---

Entertainment data. Free. No key.

## APIs

- Rick and Morty: `https://rickandmortyapi.com/api/character/?name={query}`
- Star Wars (SWAPI): `https://swapi.dev/api/people/?search={query}`
- Harry Potter: `https://hp-api.onrender.com/api/characters`
- MCU Countdown: `https://mcu-countdown.vercel.app/api`

## Example

```json
{"query": "Rick"}
```

Returns: Rick Sanchez characters and info.

```json
{"query": "Luke Skywalker"}
```

Returns: Luke Skywalker character info.

```json
{"type": "mcu"}
```

Returns: days until next MCU film.

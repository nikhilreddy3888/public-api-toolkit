---
name: pokemon
description: >
  Pokémon information from PokéAPI. Free. No API key.
  Use when user ask about Pokémon stats, abilities, types, moves.
---

Pokémon data. Free. No key.

## API

- Character: `https://pokeapi.co/api/v2/pokemon/{name_or_id}`
- Ability: `https://pokeapi.co/api/v2/ability/{name_or_id}`
- Type: `https://pokeapi.co/api/v2/type/{name_or_id}`
- Move: `https://pokeapi.co/api/v2/move/{name_or_id}`

## Example

```json
{"name_or_id": "pikachu"}
```

Returns: pikachu stats, type, abilities, weight.

```json
{"name_or_id": 25}
```

Returns: Pikachu info by ID.

---
name: animals
description: >
  Animal facts, dog/cat breeds, animal images. Free. No API key.
  Use when user ask about animal facts, dog breeds, cat breeds.
---

Animal data. Free. No key.

## APIs

- Cat facts: `https://catfact.ninja/fact`
- Dog breeds: `https://dog.ceo/api/breeds/list/all`
- Dog image: `https://dog.ceo/api/breed/{breed}/images/random`
- Animal facts: `https://catfact.ninja/facts`

## Example

```json
{"type": "cat_fact"}
```

Returns: fact about cats.

```json
{"type": "dog_breeds"}
```

Returns: list of all dog breeds.

```json
{"breed": "labrador"}
```

Returns: random labrador image URL.
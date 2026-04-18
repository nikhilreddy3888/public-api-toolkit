---
name: food_recipes
description: >
  Recipes from TheMealDB. Free. No API key.
  Use when user ask for recipes, cooking, meal ideas.
---

Recipes. Free. No key.

## API

- Search: `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- Random: `https://www.themealdb.com/api/json/v1/1/random.php`
- By ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`
- Categories: `https://www.themealdb.com/api/json/v1/1/categories.php`

## Example

```json
{"query": "pizza"}
```

Returns: meal name, ingredients, instructions, image.

```json
{"action": "random"}
```

Returns random recipe.
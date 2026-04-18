---
name: name_insights
description: >
  Name analysis - gender, age, nationality from Genderize API. Free. No API key.
  Use when user ask "what gender is name X", "age of name Y", " nationality".
---

Name insights. Free. No key.

## API

- Gender: `https://api.genderize.io?name={name}`
- Age: `https://api.agify.io?name={name}`
- Nationality: `https://api.nationalize.io?name={name}`

## Example

```json
{"name": "John"}
```

Returns: gender, probability.

```json
{"name": "Maria", "action": "nationality"}
```

Returns: country probabilities.
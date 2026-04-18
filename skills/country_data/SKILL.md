---
name: country_data
description: >
  Country information from REST Countries API. Free. No API key.
  Use when user ask about country info, population, capital, flag.
---

Country data. Free. No key.

## API

- All: `https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags`
- By name: `https://restcountries.com/v3.1/name/{name}`
- By code: `https://restcountries.com/v3.1/alpha/{code}`

## Example

```json
{"name": "Japan"}
```

Returns: name, capital, region, population, flag, languages, currency.

## Note

Handles partial names. Returns array of matches.
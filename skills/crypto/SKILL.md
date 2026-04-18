---
name: crypto
description: >
  Crypto prices from CoinGecko. Free. No API key.
  Use when user ask about bitcoin, ethereum, crypto prices.
---

Get crypto data. Free. No key.

## API

- Price: `https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd`
- Search: `https://api.coingecko.com/api/v3/search?query={query}`

## Example

```json
{"ids": "bitcoin,ethereum"}
```

Returns USD prices.
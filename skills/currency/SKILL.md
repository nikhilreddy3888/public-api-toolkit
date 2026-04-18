---
name: currency
description: >
  Currency exchange from ExchangeRate-API. Free. No API key.
  Use when user ask about exchange rates, currency conversion.
---

Get FX rates. Free. No key.

## API

- Latest: `https://open.er-api.com/v6/latest/{base}`
- Convert: built from latest rates

## Example

```json
{"base": "USD"}
```

Returns: rates for all currencies vs USD.

```json
{"base": "EUR", "target": "USD"}
```

Returns: EUR to USD rate.
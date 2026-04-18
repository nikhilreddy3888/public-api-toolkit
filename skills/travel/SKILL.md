---
name: travel
description: >
  Multi-step trip planner. Combines geocoding + weather + currency + holidays.
  Use when user ask about travel, trip planning, "what's weather in X".
---

Trip planner. Composes other skills.

## How it works

1. Geocode location → get lat/lon
2. Get weather for coordinates
3. Get holidays for country
4. Get currency if needed
5. Return combined trip info

## Example

```json
{"destination": "Tokyo", "days": 7}
```

Returns: weather forecast, local holidays, timezone, currency.

## Composed from

- geocoding
- weather
- holidays
- currency
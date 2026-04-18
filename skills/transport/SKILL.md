---
name: transport
description: >
  Transportation data - flight tracking, bike shares, EV charging. Free. No API key.
  Use when user ask about flights, bike shares, EV stations.
---

Transport data. Free. No key.

## APIs

- Bike shares: `https://api.citybik.es/v2/networks`
- EV stations: `https://api.openchargemap.io/v3/poi/?output=json&latitude={lat}&longitude={lon}`
- Flight tracking: `https://airports-api.com/api/flights?airport={airport}` (key needed)

## Example

```json
{"action": "bike_shares"}
```

Returns: available bike networks by location.

```json
{"action": "ev_stations", "lat": 40.71, "lon": -74.01}
```

Returns: EV charging stations nearby.
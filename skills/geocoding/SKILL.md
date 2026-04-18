---
name: geocoding
description: >
  Address lookup from OpenStreetMap/Nominatim. Free. No API key.
  Use when user ask for address, coordinates, location lookup.
---

Get coordinates from address. Free.

## API

- Forward: `https://nominatim.openstreetmap.org/search?q={q}&format=json`
- Reverse: `https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json`

## Example

```json
{"q": "1600 Pennsylvania Avenue Washington DC"}
```
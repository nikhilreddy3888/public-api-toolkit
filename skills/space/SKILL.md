---
name: space
description: >
  Space data - ISS position, NASA images, SpaceX launches. Free. No API key.
  Use when user ask "where is ISS", "NASA photos", "SpaceX launch schedule".
---

Space data. Free. No key.

## APIs

- ISS position: `https://api.wheretheiss.at/v1/satellites/25544`
- NASA images: `https://images-api.nasa.gov/search?q={query}`
- SpaceX: `https://api.spacexdata.com/v5/launches/latest`
- Launches: `https://api.spacexdata.com/v5/launches/upcoming`

## Example

```json
{"action": "iss_position"}
```

Returns: latitude, longitude, altitude, velocity.

```json
{"action": "nasa_image", "query": "mars"}
```

Returns: nasa.gov image URLs.
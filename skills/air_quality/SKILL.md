---
name: air_quality
description: >
  Air quality data from WAQI (World Air Quality Index). Free. No API key.
  Use when user ask about air quality, AQI, pollution levels.
---

Air quality. Free. No key.

## API

- By coords: `https://api.waqi.info/feed/geo:{lat};{lon}/?token=demo`
- By city: `https://api.waqi.info/feed/{city}/?token=demo`
- Map: `https://api.waqi.info/map/bounds?token=demo&latlng={bounds}`

## Example

```json
{"lat": 40.71, "lon": -74.01}
```

Returns: AQI, pollutant levels (PM2.5, PM10, O3, NO2), advice.

## Note

demo token has limits. Get free token at https://waqi.info/
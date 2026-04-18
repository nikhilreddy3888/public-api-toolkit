---
name: weather
description: >
  Weather data from Open-Meteo. Free. No API key.
  Use when user ask about weather, forecast, temperature.
---

Get weather data. Free. No key needed.

## API

- Current: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,weather_code`
- Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`

## Example

```json
{"lat": 40.71, "lon": -74.01}
```

Returns current temp, weather code, forecast.
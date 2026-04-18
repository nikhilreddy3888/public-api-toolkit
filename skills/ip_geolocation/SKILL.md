---
name: ip_geolocation
description: >
  IP address to location mapping. Free. No API key.
  Use when user ask "what is my IP", "where is this IP from", "IP location".
---

IP → location. Free. No key.

## APIs

### ipwho.is (Recommended)
- **Endpoint**: `https://ipwho.is/{ip}`
- **Method**: GET
- **Auth**: None
- **Docs**: https://ipwho.is/

### ip-api.com
- **Endpoint**: `http://ip-api.com/json/{ip}` (limited, 45 req/min)
- **Method**: GET
- **Auth**: None

## Example

```json
{"ip": "8.8.8.8"}
```

Returns: city, region, country, ISP, timezone, coordinates.

## Note

Prefer ipwho.is for higher rate limits.
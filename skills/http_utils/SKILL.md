---
name: http_utils
description: >
  HTTP utilities - IP check, headers, QR codes, timestamps. Free. No API key.
  Use when user ask about my IP, generate QR code, current time.
---

HTTP utilities. Free. No key.

## APIs

- IP check: `https://httpbin.org/ip`
- Headers: `https://httpbin.org/headers`
- User agent: `https://httpbin.org/user-agent`
- QR code: `https://api.qrserver.com/v1/create-qr-code/?data={data}`
- Time: `https://worldtimeapi.org/api/ip`

## Example

```json
{"action": "my_ip"}
```

Returns: origin IP address.

```json
{"data": "https://example.com", "action": "qr_code"}
```

Returns: QR code image URL.
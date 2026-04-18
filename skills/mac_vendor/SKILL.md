---
name: mac_vendor
description: >
  Lookup hardware vendor from MAC address.
  Use when user ask "what vendor is MAC X", "who made this device".
---

# MAC Vendor

Lookup hardware vendor from MAC address.

## APIs

### macvendors.com
- **Endpoint**: `https://api.macvendors.com/v1/{mac}`
- **Method**: GET
- **Auth**: None (1000 requests/day free)
- **Docs**: https://app.macvendors.com/

### macaddress.io
- **Endpoint**: `https://api.macaddress.io/v1`
- **Method**: GET
- **Auth**: API key required (free tier: 100/day)
- **Docs**: https://macaddress.io/api

## Example Queries

- "What vendor is MAC address 00:1A:2B:3C:4D:5E"
- "Who made this network device"
- "Find vendor for AA:BB:CC:DD:EE:FF"

## Response

```json
{
  "vendor": "Apple, Inc.",
  "company": "Apple Computer, Inc.",
  "address": "1 Infinite Loop, Cupertino, CA"
}
```

## Use Cases

- Network device identification
- Security monitoring
- Device inventory management
- Virtual machine detection

## Token Savings

15-25x vs LLM reasoning for hardware vendor lookup.
---
name: url_check
description: >
  Scan URLs for malware, phishing. Free. No key ( ContrastAPI).
  Use when user ask "check if URL is safe", "scan for malware".
---

# URL Check

Scan and analyze URLs for malware, phishing, and security threats.

## APIs

### urlscan.io
- **Endpoint**: `https://urlscan.io/api/v1/scan/`
- **Method**: POST
- **Auth**: API key required (free registration)
- **Docs**: https://docs.urlscan.io/
- **Search API**: `https://urlscan.io/api/v1/search/`

### ContrastAPI (free, no key)
- **Endpoint**: `https://api.contrastcyber.com/v1/threat/{domain}`
- **Method**: GET
- **Auth**: None (100/hour)
- **Docs**: https://api.contrastcyber.com/

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string | URL to scan |
| visibility | string | public/unlisted/private |

## Example Queries

- "Check if this URL is safe: https://example.com"
- "Scan for malware: suspicious-link.net"
- "Check domain reputation for company.io"

## Response

```json
{
  "verdicts": {
    "overall": "malicious",
    "engines": {
      "malicious": 5,
      "suspicious": 2,
      "harmless": 10
    }
  }
}
```

## Use Cases

- Validate suspicious links
- Brand protection / phishing detection
- Security research
- Link preview generation

## Token Savings

20-40x vs LLM analysis of security threats.
---
name: dns_network
description: >
  DNS lookup via Cloudflare DoH (DNS over HTTPS). Free. No API key.
  Use when user ask about DNS lookup, whois, domain info.
---

DNS lookup. Free. No key.

## API

- DoH: `https://cloudflare-dns.com/dns-query?name={name}&type={type}`
- Types: A, AAAA, MX, TXT, CNAME, NS, SOA

## Example

```json
{"name": "example.com", "type": "A"}
```

Returns: IPv4 addresses.

```json
{"name": "example.com", "type": "MX"}
```

Returns: mail servers.
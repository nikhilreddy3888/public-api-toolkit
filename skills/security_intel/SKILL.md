---
name: security_intel
description: >
  Security vulnerability data from NVD (National Vulnerability Database). Free. No API key.
  Use when user ask about CVE, vulnerabilities, security flaws, exploit info.
---

Security intel. Free. No key.

## API

- Search: `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch={query}`
- Recent: `https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=10`
- CVE details: `https://services.nvd.nist.gov/rest/json/cve/{cve_id}`

## Example

```json
{"query": "log4j"}
```

Returns: CVE list with descriptions, CVSS scores.

```json
{"cve_id": "CVE-2021-44228"}
```

Returns: full CVE details.
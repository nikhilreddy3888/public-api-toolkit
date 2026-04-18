---
name: coding_contests
description: >
  Upcoming and ongoing competitive coding contests (Codeforces, LeetCode, HackerRank). Free. No API key.
  Use when user ask about upcoming coding competitions, hackathons, programming contests.
---

Competitive coding contests information from Kontests API. Free. No key.

## APIs

- All Contests: `https://kontests.net/api/v1/all`
- Codeforces: `https://kontests.net/api/v1/codeforces`
- LeetCode: `https://kontests.net/api/v1/leet_code`
- HackerRank: `https://kontests.net/api/v1/hacker_rank`

## Example

```json
{"platform": "all"}
```

Returns: list of all upcoming/ongoing coding contests with start/end times and links.

```json
{"platform": "leet_code"}
```

Returns: upcoming LeetCode contests.

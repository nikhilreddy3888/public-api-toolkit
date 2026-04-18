# CLAUDE.md

## Skills for Real-Time Data

Use skill when user needs real-time factual data. Replaces expensive web search.

## Install

```bash
claude plugin marketplace add nikhilreddy3888/public-api-toolkit
```

## Usage

Use the Skill tool to invoke any skill when needed:

- weather: "What's the weather in Tokyo?"
- crypto: "Bitcoin price"
- currency: "Convert 100 USD to EUR"
- ip_geolocation: "Where is this IP from: 8.8.8.8"
- mock_data: "Give me some dummy user profiles for testing"

## Skills (43)

| Skill | Use |
|-------|-----|
| weather | forecasts, current weather |
| crypto | BTC, ETH, crypto prices |
| currency | FX rates, conversions |
| wikipedia | topic summaries |
| geocoding | address → coordinates |
| ip_geolocation | IP → location |
| country_data | country profiles |
| dictionary | word definitions |
| anime | quotes, facts, Ghibli |
| pokemon | stats, types, moves |
| entertainment | Star Wars, Rick & Morty |
| mock_data | users, posts, products |
| avatar_generator | pixel art, robots |
| coding_contests | LeetCode, Codeforces |

## Composition Skills

| Skill | Composes |
|-------|----------|
| travel | geocoding + weather + holidays |
| market_brief | crypto + currency |
| compare | uses relevant skills |

## Token Savings

| Before | After |
|--------|-------|
| Web search | API call |
| 500-2000 tokens | 50-100 tokens |

**10-40x fewer tokens.**

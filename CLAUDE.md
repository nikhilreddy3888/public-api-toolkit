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
- email_validation: "Is contact@company.io valid?"

## Skills (43)

| Skill | Use |
|-------|-----|
| weather | forecasts, current weather |
| crypto | BTC, ETH, crypto prices |
| currency | FX rates, conversions |
| wikipedia | topic summaries |
| geocoding | address → coordinates |
| ip_geolocation | IP → location |
| country_data | country info |
| dictionary | word definitions |
| email_validation | email verification |
| url_check | URL security scan |
| mac_vendor | device vendor |
| anime | quotes, facts, Ghibli |
| pokemon | stats, types, moves |
| horoscope | daily astrological info |
| science_facts | math/science trivia |
| entertainment | Star Wars, Rick & Morty |
| mock_data | users, posts, products |
| avatar_generator | pixel art, robots |
| profanity_filter | censor bad words |
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

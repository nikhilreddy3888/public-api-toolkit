# AGENTS.md

## Do

- Keep skills simple: SKILL.md files in skills/ folder
- No MCP, no complex build, no unnecessary deps
- Update README when skills change

## Install (All Providers)

### Gemini CLI
```bash
gemini extensions install https://github.com/nikhilreddy3888/public-api-toolkit
```

### Claude Code
```bash
claude plugin marketplace add nikhilreddy3888/public-api-toolkit
```

### OpenClaw
```bash
openclaw plugins install https://github.com/nikhilreddy3888/public-api-toolkit
```

## Skills (43)

Use skill when user needs real-time data:

| Skill | Use |
|-------|-----|
| weather | forecasts, current conditions |
| crypto | BTC, ETH, crypto prices |
| currency | FX rates, conversions |
| wikipedia | topic summaries |
| geocoding | address → coordinates |
| ip_geolocation | IP → location |
| country_data | country profiles |
| dictionary | word definitions |
| news | space/science news |
| translation | text translation |
| space | ISS, NASA images |
| food_recipes | meal ideas |
| holidays | public holidays |
| dev_tools | npm, GitHub data |
| security_intel | CVE lookups |
| travel | multi-step trip planner |
| market_brief | crypto + FX snapshot |
| compare | compare two things |
| anime | quotes, facts, Ghibli |
| pokemon | stats, types, moves |
| horoscope | daily astrological info |
| science_facts | math/science trivia |
| entertainment | Star Wars, Rick & Morty |
| mock_data | users, posts, products |
| avatar_generator | pixel art, robots |
| profanity_filter | censor bad words |
| coding_contests | LeetCode, Codeforces |

## Don't

- Don't add MCP server code
- Don't add complex build steps
- Don't add unnecessary dependencies

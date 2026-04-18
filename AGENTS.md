# AGENTS.md

## Do

- Keep skills simple: SKILL.md files in skills/ folder
- No MCP, no complex build, no unnecessary deps
- Update README when skills change

## Install (All Providers)

### Claude Code
```bash
claude plugin marketplace add nikhilreddy3888/public-api-toolkit
```

### Gemini CLI
```bash
gemini extensions install https://github.com/nikhilreddy3888/public-api-toolkit
```

### Codex
```bash
codex install-skill https://github.com/nikhilreddy3888/public-api-toolkit
```

### Copilot CLI
```bash
copilot extensions install nikhilreddy3888/public-api-toolkit
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
| country_data | country info |
| dictionary | word definitions |
| news | space/science news |
| translation | text translation |
| space | ISS, NASA images |
| food_recipes | meal ideas |
| holidays | public holidays |
| dev_tools | npm, GitHub data |
| security_intel | CVE lookups |
| travel | trip planner |
| market_brief | crypto + FX snapshot |
| compare | compare two things |
| email_validation | email verification |
| url_check | URL security scan |
| mac_vendor | device vendor lookup |
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

- Don't add MCP
- Don't add complex build
- Don't add unnecessary deps

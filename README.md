# Public API Toolkit

**why use many API when few skill do trick**

43 agent skills. One install. Zero config. No keys.

Weather, crypto, currency, Wikipedia +39 more. Free. Token-efficient.

## Why use this?

| Before | After |
|--------|-------|
| Web search → scrape → parse | API → JSON |
| 500-2000 tokens | 50-100 tokens |
| minutes | <300ms |

**10-40x fewer tokens. Replaces expensive web searches with structured data.**

## Install

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

### Codex
```bash
codex install-skill https://github.com/nikhilreddy3888/public-api-toolkit
```

## Skills (43)

Weather, Crypto, Currency, Wikipedia, Geocoding, IP Geolocation, Country Data, Dictionary, Books, Translation, News, Movie/TV, Food/Recipes, Math, Space, Holidays, Transport, Random Facts, Animals, Name Insights, Security Intel, Job Search, Air Quality, HTTP Utils, DNS, Dev Tools, Tech News, Travel, Market Brief, Compare, Email Validation, URL Scan, MAC Vendor, Anime, Pokemon, Horoscope, Science Facts, Entertainment, Mock Data, Avatars, Profanity Filter, Coding Contests.

---

# Contributing to Public API Toolkit

Public API Toolkit is a collection of **agent-ready skills**. Instead of a complex server, each skill is defined by a simple `SKILL.md` file that tells the agent how to call an API directly.

## Repository Map

```text
skills/
  weather/
    SKILL.md    <-- Definition, API links, and examples
  crypto/
    SKILL.md
site/
  index.html    <-- Marketing landing page
  styles.css
GEMINI.md       <-- Gemini CLI specific context
CLAUDE.md       <-- Claude Code specific context
OPENCLAW.md     <-- OpenClaw specific context
```

## Add A New Skill

1. Create a new folder in `skills/`.
2. Create a `SKILL.md` file following the standard format (Frontmatter + APIs + Example).
3. Update documentation and manifests.

## License

MIT

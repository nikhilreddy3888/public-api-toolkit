# Public API Toolkit Launch Posts

This file is a reusable launch kit for marketing `public-api-toolkit` across developer communities without overclaiming what the product does today.

## Messaging Guardrails

Lead with what is true right now:

- it is a cross-platform MCP server
- it exposes grouped public API tools for structured factual lookups
- it works well in Codex, Claude Code, Cursor, Gemini CLI, OpenCode, and generic MCP clients
- it is useful when an agent would otherwise browse for weather, exchange rates, country data, Wikipedia summaries, holidays, geocoding, open data, and similar structured answers

Avoid leading with claims we have not benchmarked or productized yet:

- exact token savings percentages
- autonomous routing intelligence
- enterprise SLAs
- automatic semantic query routing
- coverage claims that exceed the current shipped tool surface

## Positioning Lines

Use one of these as the opening sentence:

- `Public API Toolkit turns public APIs into clean MCP tools for AI agents.`
- `Structured factual lookups should hit APIs, not scraped web pages.`
- `One MCP server for weather, FX, crypto, Wikipedia, geocoding, open data, and more.`

## Product Hunt

### Name

`Public API Toolkit`

### Tagline

`Structured public data for AI agents through one MCP server.`

### Short Description

`A cross-platform MCP server that packages public APIs into clean, agent-ready tools for Codex, Claude Code, Cursor, Gemini CLI, OpenCode, and other MCP clients.`

### Full Description

```md
Public API Toolkit helps AI agents answer structured factual questions through APIs instead of brittle web search.

It bundles grouped MCP tools for things like:
- weather and air quality
- exchange rates and crypto prices
- dictionaries and Wikipedia summaries
- geocoding, holidays, and country data
- open data, public records, and developer utilities

Why it exists:
- structured JSON is a better fit than scraped HTML for repeatable agent workflows
- one MCP server is easier to manage than many single-purpose connectors
- many providers work with zero setup, while premium-compatible APIs stay optional

It works well with Codex, Claude Code, Cursor, Gemini CLI, OpenCode, and other MCP-compatible clients.
```

### First Maker Comment

```md
I built Public API Toolkit because a lot of factual agent queries still get handled the expensive, noisy way: web search, scraped HTML, and stale model memory.

This project packages structured public API lookups into one MCP server so agent tools can reach for APIs first when that is the better instrument.

A few things I cared about while building it:
- grouped tools instead of a giant flat tool list
- useful with minimal setup
- cross-client install docs, not just one ecosystem
- realistic positioning around where MCP helps most and where it does not

Happy to answer questions about the tool grouping model, provider choices, or how I’d install it in specific clients.
```

### Product Hunt Comment Replies

#### “Why not just use web search?”

```md
For open-ended research, web search still matters. Public API Toolkit is for the more structured side of the spectrum, where an API response is cleaner, faster, and easier for an agent to reuse than scraped pages.
```

#### “Why bundle this instead of separate MCP servers?”

```md
Convenience and consistency. If you regularly need weather, FX, Wikipedia, country data, holidays, geocoding, and open data in the same workflow, one maintained MCP surface is much easier to manage than five or ten separate installs.
```

#### “Does it work in ChatGPT?”

```md
The current release is stdio-first, so it works directly in local MCP clients. ChatGPT-style remote MCP support needs a transport layer in front of the server, which is documented separately.
```

## Reddit

Always check subreddit rules before posting. Some communities allow launch posts only in weekly threads or require strong technical detail.

### r/ClaudeAI

**Title**

`Built an MCP server that gives Claude structured public API tools instead of making it browse for everything`

**Body**

```md
I built an MCP server called Public API Toolkit that bundles public API lookups into one local tool surface for Claude Code and other MCP clients.

The idea is simple: some questions are better answered by APIs than by web search or stale model memory.

Examples where it helps:
- weather and air quality
- exchange rates and crypto prices
- geocoding and country data
- Wikipedia summaries and dictionary lookups
- holidays, open data, and public records

What I tried to optimize for:
- grouped tools instead of a giant flat list
- useful without a pile of API keys
- docs for multiple clients, not just one

Repo: https://github.com/nikhilreddy3888/public-api-toolkit
npm: https://www.npmjs.com/package/public-api-toolkit

If you use Claude Code heavily, I’d love feedback on where grouped MCP tools feel better than separate single-purpose servers, and where they do not.
```

### r/LocalLLaMA

**Title**

`Public API Toolkit: one MCP server for structured public data in local agent workflows`

**Body**

```md
Sharing a project I’ve been working on: Public API Toolkit.

It is a local MCP server that exposes grouped public API tools for structured factual lookups, so agents can use APIs instead of relying on browsing or stale parametric knowledge for everything.

Current sweet spots:
- weather
- FX and crypto
- country data
- geocoding
- Wikipedia
- public holidays
- open-data lookups

It is meant for MCP-capable tools like Codex, Claude Code, Cursor, Gemini CLI, OpenCode, and similar local agent setups.

What I’d especially love feedback on from this crowd:
- whether grouped tool surfaces feel better than many narrow MCP installs
- where provider reliability matters most
- what other structured lookup domains are worth prioritizing

Repo: https://github.com/nikhilreddy3888/public-api-toolkit
```

### r/Cursor

**Title**

`If you use Cursor with MCP, Public API Toolkit gives it weather, FX, Wikipedia, geocoding, and more through one server`

**Body**

```md
I put together Public API Toolkit, a local MCP server that packages structured public API lookups into one install.

The goal was not “more tools for the sake of it.” It was making Cursor better at the kinds of factual requests that are cleaner through APIs than through browsing.

Good fits:
- weather
- exchange rates
- crypto prices
- country and university data
- geocoding
- Wikipedia summaries
- public holidays and open data

Would love feedback from Cursor users on whether the grouped-tool approach feels practical in day-to-day workflows.

Repo: https://github.com/nikhilreddy3888/public-api-toolkit
```

### r/SideProject

**Title**

`Built Public API Toolkit, an MCP server for turning public APIs into agent tools`

**Body**

```md
I’ve been working on a side project called Public API Toolkit.

It packages public API lookups into a cross-platform MCP server so AI tools can answer structured factual questions through APIs instead of scraping pages.

I focused on:
- clean grouped tools
- cross-client setup docs
- practical zero-config usefulness
- honest docs about where it helps most

It is live here:
- GitHub: https://github.com/nikhilreddy3888/public-api-toolkit
- npm: https://www.npmjs.com/package/public-api-toolkit

Happy to share the build process or what I learned packaging for Codex, Claude Code, Cursor, Gemini CLI, and other MCP clients.
```

## Launch Checklist

- update the README hero and install links before posting
- make sure npm and GitHub versions match
- test at least one happy-path flow with the published package
- include one concrete example prompt in launch comments
- avoid “X saves Y%” claims unless you have your own measurements ready
- be ready with follow-up replies about client setup and provider reliability

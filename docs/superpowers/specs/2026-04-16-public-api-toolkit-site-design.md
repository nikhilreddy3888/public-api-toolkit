# Public API Toolkit Site Design

## Summary

Build a polished static landing page inside the `public-api-toolkit` repository that presents the project like a flagship MCP product, with the provided cube logo as the dominant visual anchor and a stronger token-efficiency narrative inspired by `caveman`, but adapted for the real product shape of Public API Toolkit.

The site should feel like a launch page, not a documentation index. It should make a strong economic argument first, then ground that argument in practical, credible product framing.

## Goals

- Create a static GitHub Pages-style landing page in the public repo
- Use `image-logo.png` as the main hero visual
- Lead with an economic-first message around token waste and factual queries
- Explain clearly why structured API calls are often a better fit than browsing for certain AI tasks
- Present Public API Toolkit as one maintained MCP surface for structured public data
- Drive users toward GitHub, npm, and client installation docs

## Non-Goals

- Do not turn the landing page into a full docs site
- Do not add a frontend framework or runtime dependency
- Do not claim autonomous routing, enterprise SLAs, or benchmarked savings the repo does not currently prove
- Do not bury the page in dense documentation or package-level internals

## Product Positioning

### Primary headline direction

`Stop wasting tokens on things free APIs can answer instantly.`

### Supporting product framing

Public API Toolkit helps AI agents answer structured factual questions through APIs instead of defaulting to web search, scraped pages, or stale model memory.

It should be positioned as:

- a cross-platform MCP server
- a structured public data layer for AI agents
- one grouped tool surface instead of many one-off installs
- most useful when the answer is already available as reliable structured data

### Credibility rules

The page should be bold, but claims about token savings, latency, and cost should be presented as directional patterns:

- use language like `can be`, `often`, or `in many cases`
- avoid presenting every numeric range as a guaranteed outcome
- keep the economic argument strong while preserving trust

## Visual Direction

### Core mood

- warm infra-product aesthetic
- calm, premium, technical
- poster-like first viewport
- large hero composition with sparse, strong copy
- subtle grid texture and soft ambient light
- graphite text with restrained orange accenting

### Hero visual

The provided cube logo should be used as the central hero image, not a small mark in the corner.

The logo’s meaning in the page composition:

- many data blocks
- one coherent system
- structured information instead of search noise

The hero should give the logo room to breathe and let it do narrative work.

### Design constraints

- no generic SaaS card mosaic in the hero
- no dashboard mockup replacing the logo as first impression
- no loud rainbow gradients
- no dark-mode default
- no boilerplate docs-site layout

## Information Architecture

The site should be a single long landing page with a small number of high-impact sections.

### 1. Hero

Purpose:

- establish the token-waste problem
- make Public API Toolkit feel important immediately
- create a memorable visual first impression

Contents:

- headline: `Stop wasting tokens on things free APIs can answer instantly.`
- short supporting copy
- primary CTA to GitHub or install
- secondary CTA to docs or supported clients
- proof strip with directional numeric callouts
- large logo composition

Suggested proof strip themes:

- `10x–40x` more tokens burned
- `2–8s` extra latency
- `41 grouped tools`

These must be clearly contextualized as directional patterns rather than universal measurements.

### 2. Problem Section

Title direction:

`AI is solving easy problems the hard way.`

Purpose:

- explain the token-efficiency argument in concrete terms
- make the pain visible through examples instead of abstract claims

Contents:

- a short explanation that browsing and reasoning are often the wrong tools for structured factual lookups
- a visual list or table of example queries

Example query types:

- weather in Tokyo
- FX conversion
- Bitcoin price
- IP geolocation
- translation
- structured public data lookups

Each example should show:

- what AI often does today
- what it should do instead
- which Public API Toolkit tool group maps to that use case

### 3. Product Section

Title direction:

`What Public API Toolkit actually is.`

Purpose:

- de-hype the narrative
- explain the real product shape clearly
- preserve trust

Contents:

- one MCP server
- 41 grouped tools
- cross-client local setup
- practical structured-data coverage
- one code/config snippet

This section should make it clear that Public API Toolkit is not a magical universal router. It is a practical MCP server for grouped public API access.

### 4. Use Cases

Purpose:

- translate the product into workflows people recognize

Suggested audiences:

- AI coding tools
- research assistants
- customer-facing AI products
- MCP power users who want one maintained install

Each use-case block should be short and concrete.

### 5. Client / Install Section

Purpose:

- convert interest into action
- prove that the project is genuinely cross-client

Clients to feature:

- Codex
- Claude Code
- Cursor
- Gemini CLI
- OpenCode
- generic MCP clients

This section should include either:

- a compact client matrix, or
- a visual install grid with links to the existing docs

### 6. Final CTA

Purpose:

- give users a clean way to act
- close with confidence and clarity

CTA targets:

- GitHub repo
- npm package
- installation docs

## Copy Strategy

### Tone

- bold but credible
- concise
- technical without sounding dry
- infra-product voice, not meme voice

### Messaging hierarchy

1. economic and performance waste
2. structured factual lookups are different from open-ended research
3. Public API Toolkit solves this with one MCP server
4. it works across popular AI coding and agent clients

### Things to say

- structured factual queries are often better served by APIs than search
- MCP is the practical bridge for agent clients
- one maintained server is easier than many fragmented installs
- this works best for live factual retrieval, not every possible research task

### Things not to say

- “every AI product on the planet”
- benchmarked exact savings unless measured by this project
- fully autonomous routing claims
- investment-deck language
- enterprise readiness beyond what the repo actually ships

## Implementation Shape

### Technology

Build the site as static files inside the repo:

- `site/index.html`
- `site/styles.css`
- `site/script.js` only if needed
- `site/assets/` for logo and any lightweight visual assets

The implementation should not require a frontend framework.

### Content model

The page should be fully hand-authored HTML/CSS with:

- strong typography
- careful spacing
- a small number of sections
- limited, meaningful motion

### Motion

Use only subtle motion such as:

- page-load reveal
- gentle section fades or staggered entry
- restrained hover emphasis on CTA or use-case blocks

No heavy animation systems or ornamental movement.

## Asset Handling

The provided logo image should be copied into the repo and referenced from the static site.

Preferred path:

- `site/assets/logo.png`

If the source image needs resizing or optimization for web use, produce a web-ready version while preserving the original composition and color feel.

## Responsive Behavior

The site must work well on:

- desktop
- tablet
- mobile

Responsive priorities:

- hero remains legible in one screenful
- logo still feels central on mobile
- proof strip stacks cleanly
- install/client section remains easy to scan

## Testing And Verification

Verification should include:

- open the static page locally in a browser
- confirm the logo loads correctly
- confirm mobile and desktop layouts both hold up
- check there are no broken links to GitHub, npm, or docs
- confirm the landing page reflects the approved copy structure

## Success Criteria

The landing page succeeds if:

- it feels like a serious product launch page
- the token-efficiency story is immediately clear
- the logo becomes a memorable brand anchor
- the site explains what the product is without overclaiming
- a user can understand the value and install path within one quick scan

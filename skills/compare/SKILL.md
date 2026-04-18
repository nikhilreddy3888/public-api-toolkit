---
name: compare
description: >
  Compare two things side-by-side. Uses other skills as needed.
  Use when user ask to compare X vs Y, difference between A and B.
---

Compare two things. Uses relevant skills.

## How it works

1. Parse comparison request
2. Fetch data for both items using appropriate skill
3. Format side-by-side comparison

## Example

```json
{"item1": "Bitcoin", "item2": "Ethereum"}
```

Returns: comparison table with price, market cap, tech, use cases.

```json
{"item1": "Python", "item2": "JavaScript"}
```

Returns: comparison of programming languages.

## Usage

Works with any two comparable items - stocks, countries, tech, etc.
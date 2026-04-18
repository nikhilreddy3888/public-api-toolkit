---
name: profanity_filter
description: >
  Content validator against profanity & obscenity from PurgoMalum. Free. No API key.
  Use when user ask to filter bad words, check text for profanity, or censor text.
---

Profanity and obscenity filter. Free. No key.

## APIs

- PurgoMalum JSON: `https://www.purgomalum.com/service/json?text={text}`
- PurgoMalum Plain Text: `https://www.purgomalum.com/service/plain?text={text}`

## Example

```json
{"text": "this is some bad text"}
```

Returns: censored text with asterisks replacing profanity, e.g., "this is some *** text".

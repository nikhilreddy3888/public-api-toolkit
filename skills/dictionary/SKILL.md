---
name: dictionary
description: >
  Word synonyms, rhymes, related words from Datamuse API. Free. No API key.
  Use when user ask "synonyms for X", "words like Y", "rhymes with Z".
---

Word lookup. Free. No key.

## API

- Like: `https://api.datamuse.com/words?ml={word}` (words meaning similar)
- Synonyms: `https://api.datamuse.com/words?rel_syn={word}`
- Rhymes: `https://api.datamuse.com/words?rel_rhy={word}`
- Sounds like: `https://api.datamuse.com/words?sl={word}`
- Related: `https://api.datamuse.com/words?rel_trg={word}`

## Example

```json
{"word": "happy", "action": "like"}
```

Returns: synonyms and similar words.

```json
{"word": "fire", "action": "rhymes"}
```

Returns: rhyming words.
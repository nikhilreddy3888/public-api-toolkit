---
name: translation
description: >
  Text translation from MyMemory. Free. No API key.
  Use when user ask "translate X to Y", "how do you say Z in Spanish".
---

Translate text. Free. No key.

## API

- MyMemory: `https://api.mymemory.translated.net/get?q={text}&langpair={source}|{target}`
- Free, no key. Works for casual use.

## Example

```json
{"text": "hello world", "source": "en", "target": "es"}
```

Returns: translatedText "Hola Mundo".
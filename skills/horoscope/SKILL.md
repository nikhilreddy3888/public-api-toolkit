---
name: horoscope
description: >
  Daily horoscope from Aztro. Free. No API key.
  Use when user ask about their daily prediction, horoscope, "what's my sign today".
---

Daily horoscope. Free. No key.

## API

- Prediction: `https://aztro.sameerkumar.website/?sign={sign}&day=today` (Method: POST)

## Example

```json
{"sign": "aries"}
```

Returns: prediction, lucky number, lucky color, mood, compatibility.

## Signs

Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.

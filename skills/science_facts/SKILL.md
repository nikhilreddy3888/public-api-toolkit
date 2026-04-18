---
name: science_facts
description: >
  Science and math facts from Numbers API. Free. No API key.
  Use when user ask for a math fact, science trivia, random number info.
---

Science & Math trivia. Free. No key.

## APIs

- Math Fact: `http://numbersapi.com/{number}/math`
- Science Fact: `http://numbersapi.com/random/science`
- Year Fact: `http://numbersapi.com/{year}/year`
- Trivia: `http://numbersapi.com/random/trivia`

## Example

```json
{"number": 42}
```

Returns: "42 is the number of km in a marathon."

```json
{"type": "science"}
```

Returns: random science fact.

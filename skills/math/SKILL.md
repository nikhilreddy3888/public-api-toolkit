---
name: math
description: >
  Math calculations from Math.js. Free. No API key.
  Use when user ask to calculate X, evaluate expression, solve math problem.
---

Math calculations. Free. No key.

## API

- Evaluate: `http://api.mathjs.org/v4/?expr={expression}`

## Example

```json
{"expression": "sqrt(16) + 2^3"}
```

Returns: result "24".

```json
{"expression": "sin(pi/2)"}
```

Returns: "1".

## Note

Handles basic math. For complex math, may need local computation.
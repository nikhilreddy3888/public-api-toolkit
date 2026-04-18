---
name: avatar_generator
description: >
  Generate unique avatars (robots, pixel art, identicons) from text seeds. Free. No API key.
  Use when user ask to generate a random avatar, profile picture, or robot image.
---

Avatar generation APIs. Free. No key.

## APIs

- RoboHash: `https://robohash.org/{seed}`
- DiceBear Pixel Art: `https://api.dicebear.com/7.x/pixel-art/svg?seed={seed}`
- DiceBear Bottts: `https://api.dicebear.com/7.x/bottts/svg?seed={seed}`

## Example

```json
{"seed": "john_doe", "style": "pixel-art"}
```

Returns: SVG URL for a unique pixel-art avatar based on the text "john_doe".

```json
{"seed": "my_robot", "style": "robohash"}
```

Returns: image URL for a unique robot avatar.

---
name: images
description: >
  Placeholder images from Lorem Picsum. Free. No API key.
  Use when user need placeholder images, mock images for design.
---

Placeholder images. Free. No key.

## API

- Random: `https://picsum.photos/200/300`
- Specific: `https://picsum.photos/id/{id}/200/300`
- List: `https://picsum.photos/v2/list`

## Example

```json
{"width": 400, "height": 300}
```

Returns: image URL (redirects to actual image).

## Note

Images change on each request. Use id for consistent image.
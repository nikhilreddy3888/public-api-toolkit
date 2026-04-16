const MAX_RESPONSE_LENGTH = 30_000;

export function serializeToolResult(value: unknown): string {
  const text =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);

  if (text.length <= MAX_RESPONSE_LENGTH) {
    return text;
  }

  const marker = `\n[TRUNCATED ${text.length - MAX_RESPONSE_LENGTH} CHARS]`;
  return `${text.slice(0, MAX_RESPONSE_LENGTH - marker.length)}${marker}`;
}

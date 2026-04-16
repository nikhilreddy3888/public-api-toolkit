import assert from "node:assert/strict";
import test from "node:test";

import { normalizeFetchResult } from "../src/lib/apiFetch.js";
import { serializeToolResult } from "../src/lib/response.js";

test("serializeToolResult truncates oversized payloads with a marker", () => {
  const output = serializeToolResult({ value: "x".repeat(31_000) });

  assert.match(output, /\[TRUNCATED/);
  assert.ok(output.length <= 30_200);
});

test("normalizeFetchResult preserves parsed JSON payloads", async () => {
  const response = new Response(JSON.stringify({ hello: "world" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

  const result = await normalizeFetchResult(response);

  assert.deepEqual(result, { hello: "world" });
});

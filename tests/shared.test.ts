import assert from "node:assert/strict";
import test from "node:test";

import { apiFetch, normalizeFetchResult } from "../src/lib/apiFetch.js";
import { UpstreamError } from "../src/lib/errors.js";
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

test("apiFetch retries a transient upstream failure before succeeding", async () => {
  let attempts = 0;

  const result = await apiFetch(
    "https://example.com/test",
    {},
    async () => {
      attempts += 1;

      if (attempts === 1) {
        return new Response("temporary failure", { status: 503 });
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  );

  assert.deepEqual(result, { ok: true });
  assert.equal(attempts, 2);
});

test("apiFetch stops retrying after the retry budget is exhausted", async () => {
  let attempts = 0;

  await assert.rejects(
    () =>
      apiFetch(
        "https://example.com/test",
        {},
        async () => {
          attempts += 1;
          return new Response("still failing", { status: 503 });
        },
      ),
    (error: unknown) => {
      assert.ok(error instanceof UpstreamError);
      assert.match(error.message, /503/);
      return true;
    },
  );

  assert.equal(attempts, 3);
});

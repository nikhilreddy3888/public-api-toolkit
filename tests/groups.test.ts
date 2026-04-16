import assert from "node:assert/strict";
import test from "node:test";

import { getToolGroup } from "../src/catalog/toolGroups.js";

test("weather current action requires coordinates and builds an Open-Meteo request", async () => {
  const group = getToolGroup("weather");
  const calls: string[] = [];

  const result = await group.execute(
    { action: "current", lat: 43.65, lon: -79.38 },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { ok: true };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.deepEqual(result, { ok: true });
  assert.match(calls[0] ?? "", /current_weather=true/);
});

test("stock market quote returns setup guidance when premium keys are missing", async () => {
  const group = getToolGroup("stock_market");

  const result = await group.execute(
    { action: "quote", symbol: "MSFT" },
    {
      fetchJson: async () => {
        throw new Error("should not fetch without keys");
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.match(String(result), /PUBLIC_APIS_FINNHUB/);
});

test("random facts quote falls back when the primary quote provider is unavailable", async () => {
  const group = getToolGroup("random_facts");
  const calls: string[] = [];

  const result = await group.execute(
    { action: "quote" },
    {
      fetchJson: async (url) => {
        const target = url.toString();
        calls.push(target);

        if (target.includes("quotable.io")) {
          throw new Error("certificate expired");
        }

        return [{ q: "Stay hungry, stay foolish.", a: "Steve Jobs" }];
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.deepEqual(result, [{ q: "Stay hungry, stay foolish.", a: "Steve Jobs" }]);
  assert.equal(calls.length, 2);
  assert.match(calls[0] ?? "", /quotable\.io/);
  assert.match(calls[1] ?? "", /zenquotes\.io/);
});

test("open data city search falls back when Teleport is unavailable", async () => {
  const group = getToolGroup("open_data");
  const calls: string[] = [];

  const result = await group.execute(
    { action: "city_search", query: "Toronto" },
    {
      fetchJson: async (url) => {
        const target = url.toString();
        calls.push(target);

        if (target.includes("teleport.org")) {
          throw new Error("ENOTFOUND");
        }

        return { results: [{ name: "Toronto", country: "Canada" }] };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.deepEqual(result, { results: [{ name: "Toronto", country: "Canada" }] });
  assert.equal(calls.length, 2);
  assert.match(calls[0] ?? "", /teleport\.org/);
  assert.match(calls[1] ?? "", /open-meteo\.com/);
});

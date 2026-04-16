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

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

test("university_data search uses the Hipolabs HTTP endpoint", async () => {
  const group = getToolGroup("university_data");
  const calls: string[] = [];

  await group.execute(
    { action: "search", country: "Canada" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return [{ name: "University of Toronto" }];
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /^http:\/\/universities\.hipolabs\.com\/search/);
});

test("math number_fact falls back to Wikipedia when Numbers API is unavailable", async () => {
  const group = getToolGroup("math");
  const textCalls: string[] = [];
  const jsonCalls: string[] = [];

  const result = await group.execute(
    { action: "number_fact", number: "42", fact_type: "trivia" },
    {
      fetchJson: async (url) => {
        jsonCalls.push(url.toString());
        return { extract: "42 is the second sphenic number." };
      },
      fetchText: async (url) => {
        textCalls.push(url.toString());
        throw new Error("connect timeout");
      },
      getEnv: () => undefined,
    },
  );

  assert.equal(result, "42 is the second sphenic number.");
  assert.equal(textCalls.length, 1);
  assert.match(textCalls[0] ?? "", /numbersapi\.com\/42\/trivia/);
  assert.equal(jsonCalls.length, 1);
  assert.match(jsonCalls[0] ?? "", /wikipedia\.org\/api\/rest_v1\/page\/summary\/42_\(number\)/);
});

test("translation description no longer references FunTranslations", () => {
  const group = getToolGroup("translation");

  assert.doesNotMatch(group.description, /FunTranslations/);
});

test("space iss_position calls WhereTheISS API", async () => {
  const group = getToolGroup("space");
  const calls: string[] = [];

  await group.execute(
    { action: "iss_position" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { latitude: 42.0, longitude: -73.0 };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /wheretheiss\.at/);
});

test("blockchain mempool_stats calls mempool.space API", async () => {
  const group = getToolGroup("blockchain");
  const calls: string[] = [];

  await group.execute(
    { action: "mempool_stats" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { count: 100 };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /mempool\.space\/api\/mempool/);
});

test("name_insights genderize calls genderize.io", async () => {
  const group = getToolGroup("name_insights");
  const calls: string[] = [];

  await group.execute(
    { action: "genderize", name: "Alex" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { name: "Alex", gender: "male", probability: 0.87 };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /genderize\.io/);
});

test("animals dog_breed calls Dog CEO breed list", async () => {
  const group = getToolGroup("animals");
  const calls: string[] = [];

  await group.execute(
    { action: "dog_breed" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { message: { affenpinscher: [] } };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /dog\.ceo/);
});

test("random_facts today_in_history calls Wikipedia onthisday API", async () => {
  const group = getToolGroup("random_facts");

  await group.execute(
    { action: "today_in_history" },
    {
      fetchJson: async (url) => {
        assert.match(url.toString(), /en\.wikipedia\.org\/api\/rest_v1\/feed\/onthisday/);
        return { selected: [{ text: "Test event" }] };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );
});

test("development dns uses Cloudflare DoH", async () => {
  const group = getToolGroup("dns_network");
  const calls: string[] = [];

  await group.execute(
    { action: "dns", domain: "example.com" },
    {
      fetchJson: async (url, init) => {
        calls.push(url.toString());
        return { Status: 0, Answer: [] };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /dns\.cloudflare\.com/);
});

test("http_utils time calls WorldTimeAPI with timezone", async () => {
  const group = getToolGroup("http_utils");
  const calls: string[] = [];

  await group.execute(
    { action: "time", timezone: "America/New_York" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { dateTime: "2025-01-01T12:00:00", timeZone: "America/New_York" };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /timeapi\.io/);
  assert.match(calls[0] ?? "", /America/);
});

test("http_utils time without timezone uses IP-based lookup", async () => {
  const group = getToolGroup("http_utils");
  const calls: string[] = [];

  await group.execute(
    { action: "time", timezone: "" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { dateTime: "2025-01-01T12:00:00", timeZone: "UTC" };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /timeapi\.io/);
  assert.match(calls[0] ?? "", /ip/);
});

test("air_quality uk_carbon_forecast calls carbon intensity 24h endpoint", async () => {
  const group = getToolGroup("air_quality");
  const calls: string[] = [];

  await group.execute(
    { action: "uk_carbon_forecast", lat: 51.5, lon: -0.1 },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { data: { forecast: [] } };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /carbonintensity\.org\.uk\/intensity\/24h/);
});

test("open_data f1_sessions calls OpenF1 API", async () => {
  const group = getToolGroup("open_data");
  const calls: string[] = [];

  await group.execute(
    { action: "f1_sessions", year: 2025 },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return [];
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /openf1\.org/);
});

test("dev_tools npm_info queries npm registry", async () => {
  const group = getToolGroup("dev_tools");
  const calls: string[] = [];

  await group.execute(
    { action: "npm_info", query: "express" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { name: "express", version: "4.18.2" };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /registry\.npmjs\.org\/express/);
});

test("tech_news hackernews_top returns stories", async () => {
  const group = getToolGroup("tech_news");

  await group.execute(
    { action: "hackernews_top", limit: 2 },
    {
      fetchJson: async (url) => {
        const target = url.toString();
        if (target.includes("topstories")) {
          return [1, 2, 3];
        }
        return { id: parseInt(target.split("/item/")[1]?.split(".")[0] ?? "0"), title: "Test" };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );
});

test("open_data archive_search queries Internet Archive", async () => {
  const group = getToolGroup("open_data");
  const calls: string[] = [];

  await group.execute(
    { action: "archive_search", query: "moon landing" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { response: { docs: [] } };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /archive\.org/);
});

test("dns_network reverse_dns queries Cloudflare DoH with PTR type", async () => {
  const group = getToolGroup("dns_network");
  const calls: string[] = [];

  await group.execute(
    { action: "reverse_dns", ip: "8.8.8.8" },
    {
      fetchJson: async (url, init) => {
        calls.push(url.toString());
        return { Status: 0, Answer: [] };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /dns\.cloudflare\.com/);
  assert.match(calls[0] ?? "", /type=PTR/);
});

test("movie_tv_data disney calls Disney API", async () => {
  const group = getToolGroup("movie_tv_data");
  const calls: string[] = [];

  await group.execute(
    { action: "disney", query: "Mickey" },
    {
      fetchJson: async (url) => {
        calls.push(url.toString());
        return { data: [{ name: "Mickey Mouse" }] };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );

  assert.equal(calls.length, 1);
  assert.match(calls[0] ?? "", /disneyapi\.dev/);
});

test("weather sun_times uses Open-Meteo instead of sunrise-sunset.org", async () => {
  const group = getToolGroup("weather");

  await group.execute(
    { action: "sun_times", lat: 51.5, lon: -0.1 },
    {
      fetchJson: async (url) => {
        assert.match(url.toString(), /open-meteo\.com/);
        assert.match(url.toString(), /sunrise/);
        return { daily: { sunrise: ["2025-01-01T06:00"] } };
      },
      fetchText: async () => "",
      getEnv: () => undefined,
    },
  );
});

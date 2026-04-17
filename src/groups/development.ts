import {
  createToolGroup,
  omitKeys,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { arrayProp, integerProp, objectSchema, stringProp } from "../lib/schema.js";

const JUDGE0_COMPILERS: Record<string, number> = {
  python: 92,
  python3: 92,
  javascript: 93,
  js: 93,
  typescript: 94,
  ts: 94,
  c: 50,
  cpp: 54,
  ruby: 72,
  go: 95,
  rust: 73,
  java: 91,
  php: 68,
  perl: 85,
  bash: 46,
  lua: 64,
  haskell: 61,
  swift: 83,
};

export const developmentGroups = [
  createToolGroup({
    key: "http_utils",
    description: "HTTP and URL helper endpoints.",
    inputSchema: objectSchema(
      ["my_ip", "headers", "user_agent", "qr_code", "epoch", "time"],
      {
        text: stringProp("Text to encode as QR."),
        size: stringProp("QR image size.", { default: "256x256" }),
        timezone: stringProp("IANA timezone (e.g. America/New_York)."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("http_utils", input, ctx, {
        my_ip: async () => ctx.fetchJson("https://httpbin.org/ip"),
        headers: async () => ctx.fetchJson("https://httpbin.org/headers"),
        user_agent: async () => ctx.fetchJson("https://httpbin.org/user-agent"),
        qr_code: async () => ({
          url: withQuery("https://api.qrserver.com/v1/create-qr-code/", {
            data: readString(input, "text"),
            size: readString(input, "size", "256x256"),
          }).toString(),
        }),
        epoch: async () => ctx.fetchText("https://icanhazepoch.com/"),
        time: async () => {
          const tz = readString(input, "timezone", "").trim();
          const path = tz
            ? `/api/time/current/zone?timeZone=${encodeURIComponent(tz)}`
            : "/api/time/current/ip";
          return ctx.fetchJson(`https://timeapi.io${path}`);
        },
      }),
  }),
  createToolGroup({
    key: "dns_network",
    description: "DNS lookup and reverse DNS APIs.",
    inputSchema: objectSchema(
      ["dns", "reverse_dns"],
      {
        domain: stringProp("Domain name."),
        ip: stringProp("IP address for reverse DNS lookup."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("dns_network", input, ctx, {
        dns: async () =>
          ctx.fetchJson(
            withQuery("https://dns.cloudflare.com/dns-query", {
              name: readString(input, "domain"),
              type: "A",
            }),
            { headers: { Accept: "application/dns-json" } },
          ),
        reverse_dns: async () =>
          ctx.fetchJson(
            withQuery("https://dns.cloudflare.com/dns-query", {
              name: readString(input, "ip"),
              type: "PTR",
            }),
            { headers: { Accept: "application/dns-json" } },
          ),
      }),
  }),
  createToolGroup({
    key: "code_execution",
    description: "Compile and run source code via Judge0.",
    inputSchema: objectSchema(
      ["run"],
      {
        language: stringProp("Friendly language name, such as python or javascript."),
        code: stringProp("Source code to compile or run."),
        stdin: stringProp("Optional standard input text."),
        compiler_options: arrayProp(
          "Optional compiler or runtime flags.",
          { type: "string" },
        ),
      },
      ["language", "code"],
    ),
    execute: (input, ctx) =>
      runActionMap("code_execution", input, ctx, {
        run: async () => {
          const language = readString(input, "language").toLowerCase();
          const languageId = JUDGE0_COMPILERS[language];
          if (!languageId) {
            return {
              error: `Unsupported language '${language}'.`,
              supported_languages: Object.keys(JUDGE0_COMPILERS),
            };
          }

          const submitResult = await ctx.fetchJson(
            "https://ce.judge0.com/submissions?base64_encoded=false&wait=false",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                source_code: readString(input, "code"),
                language_id: languageId,
                stdin: readString(input, "stdin"),
              }),
            },
          ) as Record<string, unknown>;

          const token = submitResult["token"];
          if (!token) {
            return { error: "Failed to submit code to Judge0.", detail: submitResult };
          }

          await new Promise((resolve) => setTimeout(resolve, 3000));

          const result = await ctx.fetchJson(
            `https://ce.judge0.com/submissions/${encodeURIComponent(String(token))}?base64_encoded=false`,
          ) as Record<string, unknown>;

          const status = (result["status"] as Record<string, unknown>) ?? {};
          return {
            status: status["description"] ?? "Unknown",
            stdout: result["stdout"] ?? "",
            stderr: result["stderr"] ?? "",
            compile_output: result["compile_output"] ?? "",
            exit_code: result["exit_code"],
            time: result["time"],
            memory: result["memory"],
          };
        },
      }),
  }),
  createToolGroup({
    key: "placeholder_data",
    description: "Placeholder users, text, objects, avatars, and UUIDs.",
    inputSchema: objectSchema(
      [
        "random_user",
        "fake_users",
        "posts",
        "bacon_ipsum",
        "uuid",
        "fake_store",
        "reqres_users",
        "robot_avatar",
        "dicebear_avatar",
        "lorem",
      ],
      {
        limit: integerProp("Result count.", { default: 5 }),
        page: integerProp("Page number.", { default: 1 }),
        seed: stringProp("Seed for deterministic avatar generation."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("placeholder_data", input, ctx, {
        random_user: async () =>
          ctx.fetchJson(
            withQuery("https://randomuser.me/api/", {
              results: readNumber(input, "limit", 5),
            }),
          ),
        fake_users: async () =>
          ctx.fetchJson(
            withQuery("https://fakerapi.it/api/v1/users", {
              _quantity: readNumber(input, "limit", 5),
            }),
          ),
        posts: async () =>
          ctx.fetchJson(
            withQuery("https://jsonplaceholder.typicode.com/posts", {
              _limit: readNumber(input, "limit", 5),
            }),
          ),
        bacon_ipsum: async () =>
          ctx.fetchJson(
            withQuery("https://baconipsum.com/api/", {
              type: "all-meat",
              paras: readNumber(input, "limit", 3),
            }),
          ),
        uuid: async () =>
          ctx.fetchJson(
            `https://www.uuidtools.com/api/generate/v4/count/${readNumber(input, "limit", 1)}`,
          ),
        fake_store: async () =>
          ctx.fetchJson(
            withQuery("https://fakestoreapi.com/products", {
              limit: readNumber(input, "limit", 5),
            }),
          ),
        reqres_users: async () =>
          ctx.fetchJson(
            withQuery("https://reqres.in/api/users", {
              page: readNumber(input, "page", 1),
            }),
          ),
        robot_avatar: async () => ({
          url: `https://robohash.org/${encodeURIComponent(
            readString(input, "seed", "public-api-toolkit"),
          )}.png`,
        }),
        dicebear_avatar: async () => ({
          url: withQuery(
            "https://api.dicebear.com/9.x/identicon/svg",
            {
              seed: readString(input, "seed", "public-api-toolkit"),
            },
          ).toString(),
        }),
        lorem: async () => {
          const result = await ctx.fetchJson(
            withQuery("https://dummyjson.com/posts", {
              limit: readNumber(input, "limit", 3),
            }),
          ) as Record<string, unknown>;
          const posts = Array.isArray(result["posts"]) ? result["posts"] : [];
          const bodies = posts.map((p: Record<string, unknown>) => p["body"]).filter(Boolean);
          return bodies.length > 0 ? bodies.join("\n\n") : "No lorem ipsum text available.";
        },
      }),
  }),
] as const;

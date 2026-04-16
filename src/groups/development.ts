import {
  createToolGroup,
  omitKeys,
  readNumber,
  readString,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { arrayProp, integerProp, objectSchema, stringProp } from "../lib/schema.js";

const WANDBOX_COMPILERS: Record<string, string> = {
  python: "cpython-3.10.2",
  javascript: "nodejs-18.17.1",
  js: "nodejs-18.17.1",
  c: "gcc-head",
  cpp: "gcc-head",
  ruby: "ruby-3.2.2",
  go: "go-1.22",
  rust: "rust-1.78.0",
  java: "openjdk-jdk-17.0.1",
  php: "php-8.3.7",
  perl: "perl-5.38.2",
  bash: "bash",
  lua: "lua-5.4.6",
  haskell: "ghc-9.2.8",
  swift: "swift-5.10",
};

export const developmentGroups = [
  createToolGroup({
    key: "http_utils",
    description: "HTTP and URL helper endpoints.",
    inputSchema: objectSchema(
      ["my_ip", "headers", "user_agent", "qr_code", "shorten_url", "epoch", "http2_check"],
      {
        text: stringProp("Text to encode as QR."),
        url: stringProp("URL for shortening or protocol checks."),
        size: stringProp("QR image size.", { default: "256x256" }),
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
        shorten_url: async () =>
          ctx.fetchJson("https://cleanuri.com/api/v1/shorten", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              url: readString(input, "url"),
            }).toString(),
          }),
        epoch: async () => ctx.fetchText("https://icanhazepoch.com/"),
        http2_check: async () =>
          ctx.fetchJson(
            withQuery("https://http2.pro/api/v1", {
              url: readString(input, "url"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "dns_network",
    description: "DNS, subnet, and domain search APIs.",
    inputSchema: objectSchema(
      ["dns", "subnet", "domain_search"],
      {
        domain: stringProp("Domain name."),
        cidr: stringProp("CIDR range."),
        query: stringProp("Domain search term."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("dns_network", input, ctx, {
        dns: async () =>
          ctx.fetchJson(
            `https://networkcalc.com/api/dns/lookup/${encodeURIComponent(
              readString(input, "domain"),
            )}`,
          ),
        subnet: async () =>
          ctx.fetchJson(
            `https://networkcalc.com/api/ip/subnet/${encodeURIComponent(
              readString(input, "cidr"),
            )}`,
          ),
        domain_search: async () =>
          ctx.fetchJson(
            withQuery("https://api.domainsdb.info/v1/domains/search", {
              domain: readString(input, "query"),
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "code_execution",
    description: "Compile and run source code via Wandbox.",
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
          const compiler = WANDBOX_COMPILERS[language];
          if (!compiler) {
            return {
              error: `Unsupported language '${language}'.`,
              supported_languages: Object.keys(WANDBOX_COMPILERS),
            };
          }

          return ctx.fetchJson("https://wandbox.org/api/compile.json", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              compiler,
              code: readString(input, "code"),
              stdin: readString(input, "stdin"),
              options: "warning,gnu++17",
              compiler_option_raw: "",
              runtime_option_raw: "",
              save: false,
            }),
          });
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
        lorem: async () =>
          ctx.fetchText("https://loripsum.net/api/3/short/plaintext"),
      }),
  }),
  createToolGroup({
    key: "screenshot",
    description: "Microlink screenshot metadata and preview URLs.",
    inputSchema: objectSchema(
      ["capture"],
      {
        url: stringProp("Public website URL."),
      },
      ["url"],
    ),
    execute: (input, ctx) =>
      runActionMap("screenshot", input, ctx, {
        capture: async () =>
          ctx.fetchJson(
            withQuery("https://api.microlink.io/", {
              url: readString(input, "url"),
              screenshot: true,
              meta: false,
              embed: "screenshot.url",
            }),
          ),
      }),
  }),
] as const;

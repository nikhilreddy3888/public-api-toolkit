import {
  createToolGroup,
  missingKeyMessage,
  readNumber,
  readString,
  requireFields,
  runActionMap,
  withQuery,
} from "../lib/tool.js";
import { integerProp, numberProp, objectSchema, stringProp } from "../lib/schema.js";

export const financeGroups = [
  createToolGroup({
    key: "currency_exchange",
    description: "Frankfurter currency exchange endpoints.",
    inputSchema: objectSchema(
      ["latest", "convert", "historical", "timeseries", "currencies"],
      {
        from: stringProp("Base currency code.", { default: "USD" }),
        to: stringProp("Target currency code.", { default: "EUR" }),
        amount: numberProp("Amount to convert.", { default: 1 }),
        date: stringProp("Historical date in YYYY-MM-DD format."),
        start_date: stringProp("Timeseries start date."),
        end_date: stringProp("Timeseries end date."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("currency_exchange", input, ctx, {
        latest: async () =>
          ctx.fetchJson(
            withQuery("https://api.frankfurter.app/latest", {
              from: readString(input, "from", "USD"),
              to: readString(input, "to", "EUR"),
            }),
          ),
        convert: async () =>
          ctx.fetchJson(
            withQuery("https://api.frankfurter.app/latest", {
              amount: readNumber(input, "amount", 1),
              from: readString(input, "from", "USD"),
              to: readString(input, "to", "EUR"),
            }),
          ),
        historical: async () => {
          const date = readString(input, "date");
          requireFields({ date }, ["date"]);
          return ctx.fetchJson(
            withQuery(`https://api.frankfurter.app/${date}`, {
              from: readString(input, "from", "USD"),
              to: readString(input, "to", "EUR"),
            }),
          );
        },
        timeseries: async () => {
          const start = readString(input, "start_date");
          const end = readString(input, "end_date");
          requireFields({ start, end }, ["start", "end"], "Missing start_date or end_date.");
          return ctx.fetchJson(
            withQuery(`https://api.frankfurter.app/${start}..${end}`, {
              from: readString(input, "from", "USD"),
              to: readString(input, "to", "EUR"),
            }),
          );
        },
        currencies: async () => ctx.fetchJson("https://api.frankfurter.app/currencies"),
      }),
  }),
  createToolGroup({
    key: "crypto_data",
    description: "CoinGecko market data.",
    inputSchema: objectSchema(
      ["price", "top", "detail", "search", "trending", "history", "exchanges"],
      {
        coin: stringProp("CoinGecko coin id or search term.", {
          default: "bitcoin",
        }),
        vs_currency: stringProp("Fiat or crypto quote currency.", {
          default: "usd",
        }),
        limit: integerProp("Result size.", { default: 10 }),
        date: stringProp("Historical date in DD-MM-YYYY format."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("crypto_data", input, ctx, {
        price: async () =>
          ctx.fetchJson(
            withQuery("https://api.coingecko.com/api/v3/simple/price", {
              ids: readString(input, "coin", "bitcoin"),
              vs_currencies: readString(input, "vs_currency", "usd"),
              include_24hr_change: true,
              include_market_cap: true,
            }),
          ),
        top: async () =>
          ctx.fetchJson(
            withQuery("https://api.coingecko.com/api/v3/coins/markets", {
              vs_currency: readString(input, "vs_currency", "usd"),
              order: "market_cap_desc",
              per_page: readNumber(input, "limit", 10),
              page: 1,
            }),
          ),
        detail: async () =>
          ctx.fetchJson(
            `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(
              readString(input, "coin", "bitcoin"),
            )}`,
          ),
        search: async () =>
          ctx.fetchJson(
            withQuery("https://api.coingecko.com/api/v3/search", {
              query: readString(input, "coin", "bitcoin"),
            }),
          ),
        trending: async () =>
          ctx.fetchJson("https://api.coingecko.com/api/v3/search/trending"),
        history: async () =>
          ctx.fetchJson(
            withQuery(
              `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(
                readString(input, "coin", "bitcoin"),
              )}/history`,
              {
                date: readString(input, "date", "01-01-2024"),
              },
            ),
          ),
        exchanges: async () =>
          ctx.fetchJson(
            withQuery("https://api.coingecko.com/api/v3/exchanges", {
              per_page: readNumber(input, "limit", 10),
              page: 1,
            }),
          ),
      }),
  }),
  createToolGroup({
    key: "stock_market",
    description: "Quotes, symbol search, SEC EDGAR, and FRED.",
    inputSchema: objectSchema(
      ["quote", "search", "sec_filings", "fred_series"],
      {
        symbol: stringProp("Ticker or series identifier."),
        query: stringProp("Free-text search query."),
      },
    ),
    execute: (input, ctx) =>
      runActionMap("stock_market", input, ctx, {
        quote: async () => {
          const symbol = readString(input, "symbol");
          requireFields({ symbol }, ["symbol"]);

          const finnhubKey = ctx.getEnv("FINNHUB");
          if (finnhubKey) {
            return ctx.fetchJson(
              withQuery("https://finnhub.io/api/v1/quote", {
                symbol,
                token: finnhubKey,
              }),
            );
          }

          const alphaKey = ctx.getEnv("ALPHAVANTAGE");
          if (alphaKey) {
            return ctx.fetchJson(
              withQuery("https://www.alphavantage.co/query", {
                function: "GLOBAL_QUOTE",
                symbol,
                apikey: alphaKey,
              }),
            );
          }

          return missingKeyMessage(
            ["FINNHUB", "ALPHAVANTAGE"],
            "Stock quotes need a premium-compatible key.",
          );
        },
        search: async () => {
          const query = readString(input, "query", readString(input, "symbol"));
          requireFields({ query }, ["query"]);

          const finnhubKey = ctx.getEnv("FINNHUB");
          if (finnhubKey) {
            return ctx.fetchJson(
              withQuery("https://finnhub.io/api/v1/search", {
                q: query,
                token: finnhubKey,
              }),
            );
          }

          const alphaKey = ctx.getEnv("ALPHAVANTAGE");
          if (alphaKey) {
            return ctx.fetchJson(
              withQuery("https://www.alphavantage.co/query", {
                function: "SYMBOL_SEARCH",
                keywords: query,
                apikey: alphaKey,
              }),
            );
          }

          return missingKeyMessage(
            ["FINNHUB", "ALPHAVANTAGE"],
            "Symbol search needs a premium-compatible key.",
          );
        },
        sec_filings: async () => {
          const query = readString(input, "query", readString(input, "symbol"));
          requireFields({ query }, ["query"]);
          return ctx.fetchJson(
            withQuery("https://efts.sec.gov/LATEST/search-index", {
              q: query,
              dateRange: "all",
            }),
          );
        },
        fred_series: async () => {
          const symbol = readString(input, "symbol");
          requireFields({ symbol }, ["symbol"]);

          const fredKey = ctx.getEnv("FRED");
          if (!fredKey) {
            return missingKeyMessage(
              ["FRED"],
              "FRED series requests require a FRED API key.",
            );
          }

          return ctx.fetchJson(
            withQuery(
              "https://api.stlouisfed.org/fred/series/observations",
              {
                series_id: symbol,
                api_key: fredKey,
                file_type: "json",
              },
            ),
          );
        },
      }),
  }),
] as const;

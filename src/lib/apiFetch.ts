import { UpstreamError } from "./errors.js";

export type FetchLike = typeof fetch;

const USER_AGENT = "public-api-toolkit/1.0";
const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_RETRY_COUNT = 3;

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function normalizeFetchResult(
  response: Response,
): Promise<unknown | string> {
  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.text();

  if (!body) {
    return "";
  }

  if (
    contentType.includes("application/json") ||
    contentType.includes("+json") ||
    body.startsWith("{") ||
    body.startsWith("[")
  ) {
    return JSON.parse(body) as unknown;
  }

  return body;
}

export async function apiFetch(
  url: string | URL,
  init: RequestInit = {},
  fetchImpl: FetchLike = fetch,
): Promise<unknown | string> {
  for (let attempt = 1; attempt <= DEFAULT_RETRY_COUNT; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    try {
      const response = await fetchImpl(url, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
          "User-Agent": USER_AGENT,
          ...(init.headers ?? {}),
        },
      });

      if (!response.ok && isRetryableStatus(response.status) && attempt < DEFAULT_RETRY_COUNT) {
        continue;
      }

      const parsed = await normalizeFetchResult(response);

      if (!response.ok) {
        throw new UpstreamError(
          `Upstream request failed with ${response.status}: ${
            typeof parsed === "string" ? parsed : JSON.stringify(parsed)
          }`,
          response.status,
        );
      }

      return parsed;
    } catch (error) {
      if (error instanceof UpstreamError) {
        throw error;
      }

      const timedOut = error instanceof Error && error.name === "AbortError";
      const isLastAttempt = attempt === DEFAULT_RETRY_COUNT;

      if (!isLastAttempt) {
        await sleep(150 * 2 ** (attempt - 1));
        continue;
      }

      if (timedOut) {
        throw new UpstreamError("Upstream request timed out after 15 seconds.");
      }

      throw new UpstreamError(
        error instanceof Error ? error.message : "Unknown upstream request error.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new UpstreamError("Unknown upstream request error.");
}

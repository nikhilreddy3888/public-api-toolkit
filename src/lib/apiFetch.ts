import { UpstreamError } from "./errors.js";

export type FetchLike = typeof fetch;

const USER_AGENT = "public-api-toolkit/1.0";
const DEFAULT_TIMEOUT_MS = 15_000;

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

    if (error instanceof Error && error.name === "AbortError") {
      throw new UpstreamError("Upstream request timed out after 15 seconds.");
    }

    throw new UpstreamError(
      error instanceof Error ? error.message : "Unknown upstream request error.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

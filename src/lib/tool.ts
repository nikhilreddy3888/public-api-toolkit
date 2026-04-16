import { ConfigError, InputError } from "./errors.js";
import type { JsonSchema } from "./schema.js";

export type ToolInput = Record<string, unknown>;

export interface ToolExecutionContext {
  fetchJson: (url: string | URL, init?: RequestInit) => Promise<unknown>;
  fetchText: (url: string | URL, init?: RequestInit) => Promise<string>;
  getEnv: (name: string) => string | undefined;
}

export interface ToolGroupDefinition {
  key: string;
  description: string;
  inputSchema: JsonSchema;
  execute: (input: ToolInput, ctx: ToolExecutionContext) => Promise<unknown>;
}

type ToolActionHandler = (
  input: ToolInput,
  ctx: ToolExecutionContext,
) => Promise<unknown>;

export function createToolGroup(definition: ToolGroupDefinition): ToolGroupDefinition {
  return definition;
}

export function runActionMap(
  groupKey: string,
  input: ToolInput,
  ctx: ToolExecutionContext,
  handlers: Record<string, ToolActionHandler>,
): Promise<unknown> {
  const action = readString(input, "action");
  const handler = handlers[action];

  if (!handler) {
    throw new InputError(
      `Unsupported action '${action}' for ${groupKey}. Available actions: ${Object.keys(
        handlers,
      ).join(", ")}`,
    );
  }

  return handler(input, ctx);
}

export function readString(
  input: ToolInput,
  key: string,
  fallback = "",
): string {
  const value = input[key];
  return typeof value === "string" ? value : fallback;
}

export function readNumber(
  input: ToolInput,
  key: string,
  fallback?: number,
): number {
  const value = input[key];
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new InputError(`Missing or invalid numeric field '${key}'.`);
}

export function readBoolean(
  input: ToolInput,
  key: string,
  fallback = false,
): boolean {
  const value = input[key];
  return typeof value === "boolean" ? value : fallback;
}

export function readStringArray(input: ToolInput, key: string): string[] {
  const value = input[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function requireFields(
  input: ToolInput,
  fields: string[],
  detail?: string,
): void {
  const missing = fields.filter((field) => input[field] === undefined || input[field] === "");

  if (missing.length > 0) {
    throw new InputError(
      detail ??
        `Missing required field${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`,
    );
  }
}

export function requireOneOf(input: ToolInput, fields: string[]): void {
  const hasOne = fields.some((field) => {
    const value = input[field];
    return value !== undefined && value !== "";
  });

  if (!hasOne) {
    throw new InputError(`Provide at least one of: ${fields.join(", ")}`);
  }
}

export function withQuery(
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined>,
): URL {
  const url = new URL(baseUrl);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

export function omitKeys(
  input: ToolInput,
  keys: string[],
): Record<string, unknown> {
  const clone: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    if (!keys.includes(key)) {
      clone[key] = value;
    }
  }

  return clone;
}

export function missingKeyMessage(
  envNames: string[],
  detail?: string,
): string {
  const formatted = envNames.map((name) => `PUBLIC_APIS_${name}`).join(" or ");
  return detail
    ? `${detail} Set ${formatted} in your environment.`
    : `This action requires ${formatted} to be set.`;
}

export function getRequiredEnv(
  ctx: ToolExecutionContext,
  envNames: string[],
  detail?: string,
): string {
  for (const name of envNames) {
    const value = ctx.getEnv(name);
    if (value) {
      return value;
    }
  }

  throw new ConfigError(missingKeyMessage(envNames, detail));
}

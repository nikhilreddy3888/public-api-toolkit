const PUBLIC_API_PREFIX = "PUBLIC_APIS_";

export function toPublicApiEnvKey(name: string): string {
  return `${PUBLIC_API_PREFIX}${name}`
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();
}

export function getPublicApiEnv(
  name: string,
  env: NodeJS.ProcessEnv = process.env,
): string | undefined {
  return env[toPublicApiEnvKey(name)];
}

export function getFirstPublicApiEnv(
  names: string[],
  env: NodeJS.ProcessEnv = process.env,
): string | undefined {
  for (const name of names) {
    const value = getPublicApiEnv(name, env);
    if (value) {
      return value;
    }
  }

  return undefined;
}

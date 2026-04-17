export function createTarEnv(baseEnv = process.env) {
  return {
    ...baseEnv,
    LANG: "C",
    LC_ALL: "C",
    LC_CTYPE: "C",
  };
}

import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("Gemini manifest version and runtime package match package.json", async () => {
  const [packageRaw, manifestRaw] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../gemini-extension.json", import.meta.url), "utf8"),
  ]);

  const pkg = JSON.parse(packageRaw) as { version: string };
  const manifest = JSON.parse(manifestRaw) as {
    version: string;
    mcpServers: Record<string, { command: string; args: string[] }>;
  };

  assert.equal(manifest.version, pkg.version);
  assert.equal(manifest.mcpServers["public-api-toolkit"].command, "npx");
  assert.deepEqual(manifest.mcpServers["public-api-toolkit"].args, [
    "-y",
    `public-api-toolkit@${pkg.version}`,
  ]);
});

test("package scripts register Gemini packaging commands", async () => {
  const packageRaw = await readFile(
    new URL("../package.json", import.meta.url),
    "utf8",
  );

  const pkg = JSON.parse(packageRaw) as {
    scripts: Record<string, string>;
  };

  assert.equal(
    pkg.scripts["package:gemini"],
    "node scripts/package-gemini-extension.mjs",
  );
  assert.equal(
    pkg.scripts["verify:gemini-release"],
    "node scripts/verify-gemini-release.mjs",
  );
});

test("gitignore excludes generated Gemini release assets", async () => {
  const gitignore = await readFile(
    new URL("../.gitignore", import.meta.url),
    "utf8",
  );

  assert.match(gitignore, /^release\/$/m);
});

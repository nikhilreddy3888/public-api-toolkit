import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

test("package scripts and source entrypoints exist", async () => {
  const pkg = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  ) as {
    name: string;
    bin: Record<string, string>;
    scripts: Record<string, string>;
  };
  const lock = JSON.parse(
    await readFile(new URL("../package-lock.json", import.meta.url), "utf8"),
  ) as {
    name: string;
  };

  assert.equal(pkg.name, "public-api-toolkit");
  assert.equal(lock.name, "public-api-toolkit");
  assert.equal(pkg.bin["public-api-toolkit"], "dist/index.js");
  assert.equal(pkg.scripts.build, "tsc -p tsconfig.json");
  assert.equal(pkg.scripts.test, "tsx --test tests/*.test.ts");
});

test("plugin config points at the built dist entrypoint", async () => {
  const pluginDirs = await readdir(new URL("../plugins", import.meta.url), {
    withFileTypes: true,
  });
  const pluginDir = pluginDirs.find((entry) => entry.isDirectory());

  assert.ok(pluginDir, "expected at least one plugin directory");

  const raw = await readFile(
    new URL(`../plugins/${join(pluginDir.name, ".mcp.json")}`, import.meta.url),
    "utf8",
  );
  const plugin = JSON.parse(raw) as { command: string; args: string[] };

  assert.equal(plugin.command, "node");
  assert.deepEqual(plugin.args, ["dist/index.js"]);
});

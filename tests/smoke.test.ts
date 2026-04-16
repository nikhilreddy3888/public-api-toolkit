import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

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

test("packaging assets use the renamed public-api-toolkit identity", async () => {
  const [
    pluginRaw,
    pluginManifestRaw,
    skillRaw,
    codexRaw,
    claudeRaw,
    cursorRaw,
    genericRaw,
  ] = await Promise.all([
    readFile(
      new URL("../plugins/public-api-toolkit/.mcp.json", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../plugins/public-api-toolkit/.codex-plugin/plugin.json",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../skills/public-api-toolkit/SKILL.md", import.meta.url), "utf8"),
    readFile(new URL("../examples/codex/config.toml", import.meta.url), "utf8"),
    readFile(new URL("../examples/claude-code/mcp.json", import.meta.url), "utf8"),
    readFile(new URL("../examples/cursor/mcp.json", import.meta.url), "utf8"),
    readFile(new URL("../examples/generic/stdio.json", import.meta.url), "utf8"),
  ]);

  const plugin = JSON.parse(pluginRaw) as { command: string; args: string[] };
  const pluginManifest = JSON.parse(pluginManifestRaw) as {
    name: string;
    description: string;
    mcp: { config: string };
  };
  const claude = JSON.parse(claudeRaw) as {
    mcpServers: Record<string, { command: string; args: string[] }>;
  };
  const cursor = JSON.parse(cursorRaw) as {
    mcpServers: Record<string, { command: string; args: string[] }>;
  };
  const generic = JSON.parse(genericRaw) as { command: string; args: string[] };

  assert.equal(plugin.command, "node");
  assert.deepEqual(plugin.args, ["dist/index.js"]);
  assert.equal(pluginManifest.name, "public-api-toolkit");
  assert.equal(pluginManifest.mcp.config, ".mcp.json");
  assert.match(skillRaw, /name:\s*public-api-toolkit/);
  assert.match(codexRaw, /\[mcp_servers\.public-api-toolkit\]/);
  assert.match(codexRaw, /command\s*=\s*"npx"/);
  assert.equal(claude.mcpServers["public-api-toolkit"].command, "npx");
  assert.deepEqual(claude.mcpServers["public-api-toolkit"].args, [
    "-y",
    "public-api-toolkit",
  ]);
  assert.equal(cursor.mcpServers["public-api-toolkit"].command, "npx");
  assert.deepEqual(cursor.mcpServers["public-api-toolkit"].args, [
    "-y",
    "public-api-toolkit",
  ]);
  assert.equal(generic.command, "npx");
  assert.deepEqual(generic.args, ["-y", "public-api-toolkit"]);
});

test("runtime identity strings match the public product name", async () => {
  const [serverSource, indexSource, apiFetchSource] = await Promise.all([
    readFile(new URL("../src/server/createServer.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/apiFetch.ts", import.meta.url), "utf8"),
  ]);

  assert.match(serverSource, /name:\s*"public-api-toolkit"/);
  assert.match(indexSource, /Failed to start public-api-toolkit\./);
  assert.match(apiFetchSource, /public-api-toolkit\/1\.0/);
});

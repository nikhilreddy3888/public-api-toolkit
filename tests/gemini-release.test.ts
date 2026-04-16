import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile, rm } from "node:fs/promises";
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);

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

test("Gemini release packaging creates a root-level archive", async () => {
  const releaseDir = new URL("../release", import.meta.url);
  const archivePath = new URL(
    "../release/public-api-toolkit-gemini-extension.tar.gz",
    import.meta.url,
  );

  await rm(releaseDir, { recursive: true, force: true });

  await execFile("node", ["scripts/package-gemini-extension.mjs"], {
    cwd: new URL("..", import.meta.url),
  });

  await access(archivePath);

  const { stdout } = await execFile(
    "tar",
    ["-tzf", "release/public-api-toolkit-gemini-extension.tar.gz"],
    {
      cwd: new URL("..", import.meta.url),
    },
  );

  const entries = stdout
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  for (const file of [
    "gemini-extension.json",
    "GEMINI.md",
    "README.md",
    "LICENSE",
  ]) {
    assert.ok(entries.includes(file), `${file} missing from archive`);
  }

  assert.ok(
    entries.every((entry) => !entry.startsWith("public-api-toolkit/")),
    "archive should not be nested under public-api-toolkit/",
  );

  await execFile("node", ["scripts/verify-gemini-release.mjs"], {
    cwd: new URL("..", import.meta.url),
  });
});

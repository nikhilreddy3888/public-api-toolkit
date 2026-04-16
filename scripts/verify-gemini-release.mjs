import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const releaseDir = path.join(rootDir, "release");
const archivePath = path.join(
  releaseDir,
  "public-api-toolkit-gemini-extension.tar.gz",
);
const requiredFiles = ["gemini-extension.json", "GEMINI.md", "README.md", "LICENSE"];

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function main() {
  await access(archivePath);

  const [packageJson, geminiManifest] = await Promise.all([
    readJson(path.join(rootDir, "package.json")),
    readJson(path.join(rootDir, "gemini-extension.json")),
  ]);

  if (packageJson.version !== geminiManifest.version) {
    throw new Error(
      `gemini-extension.json version ${geminiManifest.version} does not match package.json version ${packageJson.version}`,
    );
  }

  const server = geminiManifest.mcpServers?.["public-api-toolkit"];
  if (!server) {
    throw new Error('gemini-extension.json is missing mcpServers["public-api-toolkit"]');
  }

  const expectedArgs = ["-y", `public-api-toolkit@${packageJson.version}`];
  if (server.command !== "npx") {
    throw new Error(
      `gemini mcp server command must be npx, got ${JSON.stringify(server.command)}`,
    );
  }
  if (JSON.stringify(server.args) !== JSON.stringify(expectedArgs)) {
    throw new Error(
      `gemini mcp server args must be ${JSON.stringify(expectedArgs)}, got ${JSON.stringify(server.args)}`,
    );
  }

  const stdout = execFileSync(
    "tar",
    ["-tzf", archivePath],
    {
      cwd: rootDir,
      encoding: "utf8",
    },
  );

  const entries = stdout
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);

  for (const file of requiredFiles) {
    if (!entries.includes(file)) {
      throw new Error(`${file} missing from archive`);
    }
  }

  if (entries.some((entry) => entry.startsWith("public-api-toolkit/"))) {
    throw new Error("archive should not be nested under public-api-toolkit/");
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

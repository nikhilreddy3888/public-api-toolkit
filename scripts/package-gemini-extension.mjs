import { access, cp, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const releaseDir = path.join(rootDir, "release");
const stagingDir = path.join(releaseDir, "gemini-extension");
const archivePath = path.join(
  releaseDir,
  "public-api-toolkit-gemini-extension.tar.gz",
);
const requiredFiles = ["gemini-extension.json", "GEMINI.md", "README.md", "LICENSE"];

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function main() {
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

  if (server.command !== "npx") {
    throw new Error(
      `gemini mcp server command must be npx, got ${JSON.stringify(server.command)}`,
    );
  }

  const expectedArgs = ["-y", `public-api-toolkit@${packageJson.version}`];
  if (JSON.stringify(server.args) !== JSON.stringify(expectedArgs)) {
    throw new Error(
      `gemini mcp server args must be ${JSON.stringify(expectedArgs)}, got ${JSON.stringify(server.args)}`,
    );
  }

  await access(path.join(rootDir, "dist", "index.js"));

  await rm(stagingDir, { recursive: true, force: true });
  await rm(archivePath, { force: true });
  await mkdir(releaseDir, { recursive: true });
  await mkdir(stagingDir, { recursive: true });

  await Promise.all(
    requiredFiles.map((file) =>
      cp(path.join(rootDir, file), path.join(stagingDir, file)),
    ),
  );

  execFileSync(
    "tar",
    [
      "-czf",
      archivePath,
      ...requiredFiles,
    ],
    {
      cwd: stagingDir,
      stdio: "inherit",
    },
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

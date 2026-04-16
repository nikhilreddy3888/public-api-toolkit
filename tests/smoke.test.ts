import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("package scripts and source entrypoints exist", async () => {
  const pkg = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  ) as {
    name: string;
    description: string;
    author?: string;
    homepage?: string;
    bugs?: { url?: string };
    repository?: { type?: string; url?: string };
    bin: Record<string, string>;
    scripts: Record<string, string>;
    keywords: string[];
    engines?: { node?: string };
  };
  const lock = JSON.parse(
    await readFile(new URL("../package-lock.json", import.meta.url), "utf8"),
  ) as {
    name: string;
  };

  assert.equal(pkg.name, "public-api-toolkit");
  assert.equal(
    pkg.description,
    "Structured public data for AI agents through one cross-platform MCP server.",
  );
  assert.equal(pkg.author, "Nikhil Reddy");
  assert.equal(lock.name, "public-api-toolkit");
  assert.equal(pkg.bin["public-api-toolkit"], "dist/index.js");
  assert.equal(pkg.scripts.build, "tsc -p tsconfig.json");
  assert.equal(pkg.scripts.test, "tsx --test tests/*.test.ts");
  assert.equal(
    pkg.homepage,
    "https://github.com/nikhilreddy3888/public-api-toolkit#readme",
  );
  assert.equal(
    pkg.bugs?.url,
    "https://github.com/nikhilreddy3888/public-api-toolkit/issues",
  );
  assert.equal(pkg.repository?.type, "git");
  assert.equal(
    pkg.repository?.url,
    "https://github.com/nikhilreddy3888/public-api-toolkit.git",
  );
  assert.match(pkg.engines?.node ?? "", />=18/);
  assert.ok(pkg.keywords.includes("codex"));
  assert.ok(pkg.keywords.includes("claude-code"));
  assert.ok(pkg.keywords.includes("cursor"));
  assert.ok(pkg.keywords.includes("mcp-server"));
  assert.ok(pkg.keywords.includes("ai-agents"));
  assert.ok(pkg.keywords.includes("gemini-cli"));
});

test("packaging assets use the renamed public-api-toolkit identity", async () => {
  const [
    pluginRaw,
    pluginManifestRaw,
    rootPluginManifestRaw,
    rootMcpRaw,
    geminiExtensionRaw,
    geminiInstructionsRaw,
    codexInstallRaw,
    opencodeInstallRaw,
    skillRaw,
    codexRaw,
    claudeRaw,
    cursorRaw,
    genericRaw,
    geminiSettingsRaw,
    opencodeRaw,
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
    readFile(new URL("../.claude-plugin/plugin.json", import.meta.url), "utf8"),
    readFile(new URL("../.mcp.json", import.meta.url), "utf8"),
    readFile(new URL("../gemini-extension.json", import.meta.url), "utf8"),
    readFile(new URL("../GEMINI.md", import.meta.url), "utf8"),
    readFile(new URL("../.codex/INSTALL.md", import.meta.url), "utf8"),
    readFile(new URL("../.opencode/INSTALL.md", import.meta.url), "utf8"),
    readFile(new URL("../skills/public-api-toolkit/SKILL.md", import.meta.url), "utf8"),
    readFile(new URL("../examples/codex/config.toml", import.meta.url), "utf8"),
    readFile(new URL("../examples/claude-code/mcp.json", import.meta.url), "utf8"),
    readFile(new URL("../examples/cursor/mcp.json", import.meta.url), "utf8"),
    readFile(new URL("../examples/generic/stdio.json", import.meta.url), "utf8"),
    readFile(new URL("../examples/gemini/settings.json", import.meta.url), "utf8"),
    readFile(new URL("../examples/opencode/opencode.jsonc", import.meta.url), "utf8"),
  ]);

  const plugin = JSON.parse(pluginRaw) as { command: string; args: string[] };
  const pluginManifest = JSON.parse(pluginManifestRaw) as {
    name: string;
    description: string;
    mcp: { config: string };
  };
  const rootPluginManifest = JSON.parse(rootPluginManifestRaw) as {
    name: string;
    description: string;
    mcp: { config: string };
  };
  const rootMcp = JSON.parse(rootMcpRaw) as { command: string; args: string[] };
  const geminiExtension = JSON.parse(geminiExtensionRaw) as {
    name: string;
    contextFileName: string;
    mcpServers: Record<string, { command: string; args: string[] }>;
  };
  const claude = JSON.parse(claudeRaw) as {
    mcpServers: Record<string, { command: string; args: string[] }>;
  };
  const cursor = JSON.parse(cursorRaw) as {
    mcpServers: Record<string, { command: string; args: string[] }>;
  };
  const generic = JSON.parse(genericRaw) as { command: string; args: string[] };
  const geminiSettings = JSON.parse(geminiSettingsRaw) as {
    mcpServers: Record<string, { command: string; args: string[] }>;
  };

  assert.equal(plugin.command, "node");
  assert.deepEqual(plugin.args, ["dist/index.js"]);
  assert.equal(pluginManifest.name, "public-api-toolkit");
  assert.equal(pluginManifest.mcp.config, ".mcp.json");
  assert.equal(rootPluginManifest.name, "public-api-toolkit");
  assert.equal(rootPluginManifest.mcp.config, ".mcp.json");
  assert.equal(rootMcp.command, "npx");
  assert.deepEqual(rootMcp.args, ["-y", "public-api-toolkit"]);
  assert.equal(geminiExtension.name, "public-api-toolkit");
  assert.equal(geminiExtension.contextFileName, "GEMINI.md");
  assert.equal(
    geminiExtension.mcpServers["public-api-toolkit"].command,
    "npx",
  );
  assert.deepEqual(geminiExtension.mcpServers["public-api-toolkit"].args, [
    "-y",
    "public-api-toolkit",
  ]);
  assert.match(geminiInstructionsRaw, /Prefer this extension/i);
  assert.match(codexInstallRaw, /\[mcp_servers\.public-api-toolkit\]/);
  assert.match(opencodeInstallRaw, /"type": "local"/);
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
  assert.equal(geminiSettings.mcpServers["public-api-toolkit"].command, "npx");
  assert.match(opencodeRaw, /"public-api-toolkit"/);
  assert.match(opencodeRaw, /"type": "local"/);
});

test("runtime identity strings match the public product name", async () => {
  const [
    serverSource,
    indexSource,
    apiFetchSource,
    developmentGroupSource,
    mediaGroupSource,
  ] = await Promise.all([
    readFile(new URL("../src/server/createServer.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/apiFetch.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/groups/development.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../src/groups/mediaEntertainment.ts", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(serverSource, /name:\s*"public-api-toolkit"/);
  assert.match(indexSource, /Failed to start public-api-toolkit\./);
  assert.match(apiFetchSource, /public-api-toolkit\/1\.0/);
  assert.doesNotMatch(developmentGroupSource, /public-apis-mcp/);
  assert.doesNotMatch(mediaGroupSource, /public-apis-mcp/);
});

test("launch docs exist for supported client setup flows", async () => {
  const files = await Promise.all([
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../CONTRIBUTING.md", import.meta.url), "utf8"),
    readFile(new URL("../STATUS.md", import.meta.url), "utf8"),
    readFile(new URL("../.github/ISSUE_TEMPLATE.md", import.meta.url), "utf8"),
    readFile(
      new URL("../.github/PULL_REQUEST_TEMPLATE.md", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../.github/workflows/ci.yml", import.meta.url), "utf8"),
    readFile(new URL("../docs/marketing/launch-posts.md", import.meta.url), "utf8"),
    readFile(new URL("../docs/getting-started.md", import.meta.url), "utf8"),
    readFile(new URL("../docs/installation/codex.md", import.meta.url), "utf8"),
    readFile(
      new URL("../docs/installation/claude-code.md", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../docs/installation/cursor.md", import.meta.url), "utf8"),
    readFile(
      new URL("../docs/installation/opencode.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../docs/installation/gemini-cli.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../docs/installation/github-copilot-cli.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../docs/installation/chatgpt-mcp.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../docs/installation/generic-mcp-clients.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../docs/configuration/environment-variables.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../docs/configuration/tool-groups.md", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../docs/configuration/api-keys.md", import.meta.url), "utf8"),
    readFile(new URL("../docs/publishing/npm.md", import.meta.url), "utf8"),
    readFile(
      new URL("../docs/publishing/github-release.md", import.meta.url),
      "utf8",
    ),
  ]);

  const [
    readme,
    contributingDoc,
    statusDoc,
    issueTemplate,
    prTemplate,
    ciWorkflow,
    marketingDoc,
    gettingStarted,
    codexDoc,
    claudeDoc,
    cursorDoc,
    opencodeDoc,
    geminiDoc,
    copilotDoc,
    chatgptDoc,
    genericDoc,
    envDoc,
    groupDoc,
    apiKeysDoc,
    npmDoc,
    githubDoc,
  ] = files;

  assert.match(
    readme,
    /Structured public data for AI agents\./i,
  );
  assert.match(readme, /STATUS\.md/);
  assert.match(readme, /Why Teams Use It/i);
  assert.match(readme, /Why It Is Bundled/i);
  assert.match(contributingDoc, /Contributing to Public API Toolkit/);
  assert.match(contributingDoc, /Added or updated tests first/i);
  assert.match(statusDoc, /Total tools:\*\*\s*41/i);
  assert.match(statusDoc, /Recently Fixed/i);
  assert.match(issueTemplate, /Public API Toolkit/);
  assert.match(prTemplate, /npm test/);
  assert.match(ciWorkflow, /npm ci/);
  assert.match(marketingDoc, /Product Hunt/i);
  assert.match(marketingDoc, /r\/ClaudeAI/i);
  assert.match(readme, /41 grouped `public_api_<group>` tools/i);
  assert.match(gettingStarted, /That should print `41`\./);
  assert.match(codexDoc, /~\/\.codex\/config\.toml/);
  assert.match(claudeDoc, /claude mcp add-json/);
  assert.match(cursorDoc, /mcp\.json/);
  assert.match(opencodeDoc, /opencode\.jsonc/);
  assert.match(geminiDoc, /gemini extensions install/);
  assert.match(copilotDoc, /copilot plugin install/);
  assert.match(chatgptDoc, /requires a remote MCP transport/i);
  assert.match(genericDoc, /"command": "npx"/);
  assert.match(envDoc, /PUBLIC_APIS_FRED/);
  assert.match(groupDoc, /public_api_weather/);
  assert.match(apiKeysDoc, /PUBLIC_APIS_OMDB/);
  assert.match(npmDoc, /npm publish --access public/);
  assert.match(githubDoc, /Public API Toolkit v1\.0\.0/);
});

test("static landing page assets and copy exist", async () => {
  const [siteHtml, siteCss, siteJs, readme, logo] = await Promise.all([
    readFile(new URL("../site/index.html", import.meta.url), "utf8"),
    readFile(new URL("../site/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../site/script.js", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../site/assets/logo.png", import.meta.url)),
  ]);

  assert.match(
    siteHtml,
    /Stop wasting tokens on things free APIs can answer instantly\./i,
  );
  assert.match(siteHtml, /AI is solving easy problems the hard way\./i);
  assert.match(siteHtml, /What Public API Toolkit actually is\./i);
  assert.match(siteHtml, /assets\/logo\.png/i);
  assert.match(siteCss, /grid|radial-gradient|linear-gradient/i);
  assert.match(siteJs, /DOMContentLoaded|copy/i);
  assert.ok(logo.byteLength > 0);
  assert.match(readme, /landing page|GitHub Pages|site\//i);
});

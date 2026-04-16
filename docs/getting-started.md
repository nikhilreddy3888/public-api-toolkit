# Getting Started

Public API Toolkit is easiest to try locally first, then wire into the MCP client you already use.

## Prerequisites

- Recent Node.js with native `fetch` support
- npm
- An MCP client such as Codex, Claude Code, Cursor, or another local stdio-compatible client

## Local Setup

```bash
git clone https://github.com/<your-org>/public-api-toolkit.git
cd public-api-toolkit
npm install
npm test
npm run build
```

If you want to verify the compiled registry before configuring a client:

```bash
node -e "import('./dist/server/toolRegistry.js').then((m) => console.log(m.listRegisteredTools().length))"
```

That should print `41`.

## First Run

The compiled server is a stdio MCP process:

```bash
node dist/index.js
```

You usually will not interact with that command directly. Your MCP client starts it for you.

## Choose A Client

- Codex: [installation/codex.md](installation/codex.md)
- Claude Code: [installation/claude-code.md](installation/claude-code.md)
- Cursor: [installation/cursor.md](installation/cursor.md)
- ChatGPT / remote MCP: [installation/chatgpt-mcp.md](installation/chatgpt-mcp.md)
- Generic MCP clients: [installation/generic-mcp-clients.md](installation/generic-mcp-clients.md)

## Example Prompts

Once the server is connected, try prompts like:

- `Use public_api_weather to get the current weather for Toronto.`
- `Use public_api_crypto_data to get the bitcoin price in USD.`
- `Use public_api_country_data to summarize Japan.`
- `Use public_api_wikipedia to summarize Model Context Protocol.`
- `Use public_api_holidays to list the next public holidays in Canada.`

## Environment Variables

Many tools work anonymously. Premium providers turn on automatically when their environment variables are present.

macOS and Linux:

```bash
export PUBLIC_APIS_FRED="your-key"
export PUBLIC_APIS_OMDB="your-key"
```

PowerShell:

```powershell
$env:PUBLIC_APIS_FRED = "your-key"
$env:PUBLIC_APIS_OMDB = "your-key"
```

More detail:

- [configuration/environment-variables.md](configuration/environment-variables.md)
- [configuration/api-keys.md](configuration/api-keys.md)

## What To Expect

- Tools are named `public_api_<group>`.
- Every tool accepts an `action` plus group-specific inputs defined in its schema.
- Missing premium keys return a clear setup message instead of crashing the server.
- Large responses are truncated intentionally so agents do not flood the conversation with raw payloads.

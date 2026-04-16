import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

import { getPublicApiEnv } from "../lib/env.js";
import { apiFetch } from "../lib/apiFetch.js";
import { serializeToolResult } from "../lib/response.js";
import { ToolError, UpstreamError } from "../lib/errors.js";
import { getToolGroup } from "../catalog/toolGroups.js";
import { listRegisteredTools } from "./toolRegistry.js";

function toTextResult(value: unknown, isError = false) {
  const structuredContent =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : undefined;

  return {
    content: [
      {
        type: "text" as const,
        text: serializeToolResult(value),
      },
    ],
    structuredContent,
    isError,
  };
}

export function createServer() {
  const server = new Server(
    {
      name: "public-apis-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: listRegisteredTools(),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const name = request.params.name;
    if (!name.startsWith("public_api_")) {
      return toTextResult({ error: `Unknown tool '${name}'.` }, true);
    }

    const key = name.replace(/^public_api_/, "");

    try {
      const group = getToolGroup(key);
      const result = await group.execute(request.params.arguments ?? {}, {
        fetchJson: async (url, init) => apiFetch(url, init),
        fetchText: async (url, init) => {
          const value = await apiFetch(url, init);
          return typeof value === "string" ? value : JSON.stringify(value, null, 2);
        },
        getEnv: (envName) => getPublicApiEnv(envName),
      });

      return toTextResult(result);
    } catch (error) {
      if (error instanceof ToolError || error instanceof UpstreamError) {
        return toTextResult({ error: error.message }, true);
      }

      return toTextResult(
        {
          error:
            error instanceof Error ? error.message : "Unexpected tool execution error.",
        },
        true,
      );
    }
  });

  return server;
}

import assert from "node:assert/strict";
import test from "node:test";

import { listRegisteredTools } from "../src/server/toolRegistry.js";

test("tool registry exposes all public_api_<group> tools", () => {
  const tools = listRegisteredTools();

  assert.equal(tools.length, 41);
  assert.ok(tools.some((tool) => tool.name === "public_api_weather"));
  assert.ok(tools.some((tool) => tool.name === "public_api_open_data"));
});

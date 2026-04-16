import { toolGroups } from "../catalog/toolGroups.js";

export function listRegisteredTools() {
  return toolGroups.map((group) => ({
    name: `public_api_${group.key}`,
    description: group.description,
    inputSchema: group.inputSchema,
  }));
}

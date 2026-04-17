import type { ToolGroupKey } from "./groups.js";
import type { ToolGroupDefinition } from "../lib/tool.js";
import { civicDataGroups } from "../groups/civicData.js";
import { dataReferenceGroups } from "../groups/dataReference.js";
import { devToolsGroups } from "../groups/devTools.js";
import { developmentGroups } from "../groups/development.js";
import { financeGroups } from "../groups/finance.js";
import { funValidationSecurityGroups } from "../groups/funValidationSecurity.js";
import { geoLocationGroups } from "../groups/geoLocation.js";
import { mediaEntertainmentGroups } from "../groups/mediaEntertainment.js";
import { scienceLifestyleGroups } from "../groups/scienceLifestyle.js";
import { textKnowledgeGroups } from "../groups/textKnowledge.js";
import { techNewsGroups } from "../groups/techNews.js";
import { weatherEnvironmentGroups } from "../groups/weatherEnvironment.js";

export const toolGroups = [
  ...dataReferenceGroups,
  ...geoLocationGroups,
  ...financeGroups,
  ...weatherEnvironmentGroups,
  ...developmentGroups,
  ...devToolsGroups,
  ...techNewsGroups,
  ...textKnowledgeGroups,
  ...mediaEntertainmentGroups,
  ...scienceLifestyleGroups,
  ...funValidationSecurityGroups,
  ...civicDataGroups,
] satisfies ToolGroupDefinition[];

const groupMap = new Map<string, ToolGroupDefinition>(
  toolGroups.map((group) => [group.key, group]),
);

export function getToolGroup(key: ToolGroupKey | string): ToolGroupDefinition {
  const group = groupMap.get(key);
  if (!group) {
    throw new Error(`Unknown tool group '${key}'.`);
  }
  return group;
}
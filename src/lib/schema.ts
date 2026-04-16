export type JsonSchema = {
  type: "object";
  properties?: Record<string, unknown>;
  required?: string[];
  additionalProperties?: boolean;
};

export function stringProp(
  description: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return { type: "string", description, ...overrides };
}

export function numberProp(
  description: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return { type: "number", description, ...overrides };
}

export function integerProp(
  description: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return { type: "integer", description, ...overrides };
}

export function booleanProp(
  description: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return { type: "boolean", description, ...overrides };
}

export function enumProp(
  values: string[],
  description: string,
): Record<string, unknown> {
  return { type: "string", enum: values, description };
}

export function arrayProp(
  description: string,
  items: Record<string, unknown>,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    type: "array",
    description,
    items,
    ...overrides,
  };
}

export function objectSchema(
  actions: string[],
  properties: Record<string, unknown> = {},
  required: string[] = [],
): JsonSchema {
  return {
    type: "object",
    additionalProperties: false,
    required: ["action", ...required],
    properties: {
      action: enumProp(actions, "Selects the provider operation to run."),
      ...properties,
    },
  };
}

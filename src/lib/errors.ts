export class ToolError extends Error {
  readonly exposeToModel: boolean;

  constructor(message: string, exposeToModel = true) {
    super(message);
    this.name = new.target.name;
    this.exposeToModel = exposeToModel;
  }
}

export class InputError extends ToolError {}

export class ConfigError extends ToolError {}

export class UpstreamError extends ToolError {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    if (status !== undefined) {
      this.status = status;
    }
  }
}

// Representa um projeto de servidor MCP
export interface Project {
  id: string;
  name: string;
  version: string;
  description?: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Representa uma MCP Tool
export interface Tool {
  id: string;
  projectId: string;
  name: string;
  title: string;
  description: string;
  inputSchema: string; // Ex: "{ city: z.string() }"
  handlerCode: string; // Ex: "async ({ city }) => { ... }"
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Representa um MCP Resource
export interface Resource {
  id: string;
  projectId: string;
  name: string;
  title: string;
  description: string;
  uriTemplate: string; // Ex: "users://{userId}/profile"
  handlerCode: string; // Ex: "async (uri, { userId }) => { ... }"
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Representa um MCP Prompt
export interface Prompt {
  id: string;
  projectId: string;
  name: string;
  title: string;
  description: string;
  argsSchema: string; // Ex: "{ code: z.string() }"
  factoryCode: string; // Ex: "({ code }) => ({ messages: [...] })"
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}
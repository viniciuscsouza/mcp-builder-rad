export interface Project {
  id: string;
  name: string;
  version: string;
  description: string;
  tools: Tool[];
  resources: Resource[];
}

export interface Tool {
  id: string;
  projectId: string;
  name: string;
  description: string;
  inputSchema: string; // Zod schema as a string
  handlerCode: string;
}

export interface Resource {
  id: string;
  projectId: string;
  name: string;
  uriTemplate: string;
  description: string;
  handlerCode: string;
}
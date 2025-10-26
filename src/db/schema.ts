export const CREATE_PROJECTS_TABLE = `
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    description TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`;

export const CREATE_TOOLS_TABLE = `
  CREATE TABLE IF NOT EXISTS tools (
    id TEXT PRIMARY KEY,
    projectId TEXT NOT NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    inputSchema TEXT NOT NULL,
    handlerCode TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
  );
`;

export const CREATE_RESOURCES_TABLE = `
  CREATE TABLE IF NOT EXISTS resources (
    id TEXT PRIMARY KEY,
    projectId TEXT NOT NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    uriTemplate TEXT NOT NULL,
    handlerCode TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
  );
`;

export const CREATE_PROMPTS_TABLE = `
  CREATE TABLE IF NOT EXISTS prompts (
    id TEXT PRIMARY KEY,
    projectId TEXT NOT NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    argsSchema TEXT NOT NULL,
    factoryCode TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
  );
`;
import Database from 'better-sqlite3';
import {
  CREATE_PROJECTS_TABLE,
  CREATE_TOOLS_TABLE,
  CREATE_RESOURCES_TABLE,
  CREATE_PROMPTS_TABLE
} from './schema';

const db = new Database('mcp_server_builder.db', { verbose: console.log });

export function initializeDatabase() {
  db.exec(CREATE_PROJECTS_TABLE);
  db.exec(CREATE_TOOLS_TABLE);
  db.exec(CREATE_RESOURCES_TABLE);
  db.exec(CREATE_PROMPTS_TABLE);
}

export default db;
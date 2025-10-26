# MCP Server Builder RAD

MCP Server Builder RAD (Rapid Application Development) — uma ferramenta GUI para criar, editar e exportar servidores MCP (Model Context Protocol) em TypeScript.

Este repositório contém um construtor visual que ajuda desenvolvedores a montar servidores MCP com facilidade: gerenciar capabilities (tools, resources, prompts), editar handlers em um editor Monaco integrado, escrever e executar testes (Vitest) e exportar um projeto TypeScript pronto para build.

Principais características
- Editor visual de capabilities (Tools, Resources, Prompts)
- Monaco Editor (editor de código) com TypeScript
- Geração de código baseada em templates (Handlebars)
- Validação de schemas com Zod
- Banco local SQLite (better-sqlite3) para armazenamento de projetos
- Exporta projeto completo com package.json, tsconfig e testes

Como contribuir
- Abra uma issue para discutir mudanças grandes.
- Para pequenas correções: fork, branch e PR.
- Mantenha o style com Biome (lint/format) e verifique os testes antes de PR.

Licença
- Consulte o campo `license` no `package.json` (atualmente: ISC).

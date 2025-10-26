# MCP Server Builder

## Visão Geral do Projeto

Este é um RAD (Rapid Application Development) para criar servidores MCP (Model Context Protocol) usando a SDK oficial TypeScript. O aplicativo possui interface gráfica onde usuários podem adicionar capabilities, escrever código e criar testes de forma visual e intuitiva.

## Objetivo

Reduzir o tempo de desenvolvimento de servidores MCP de horas para minutos, fornecendo uma interface visual que gera código TypeScript válido e pronto para uso.

## Stack Tecnológica

### Frontend
- **Framework**: Tauri (para aplicação desktop)
- **UI Framework**: React 18+ com TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Editor de Código**: Monaco Editor (mesmo do VS Code)
- **Ícones**: Lucide React

### Backend/Engine
- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript 5+
- **SDK**: @modelcontextprotocol/sdk (oficial)
- **Validação**: Zod para schemas
- **Templates**: Handlebars
- **Build Tool**: Vite
- **Testes**: Vitest + Testing Library

### Armazenamento
- **Local Database**: SQLite (better-sqlite3)
- **File System**: Node.js fs/promises
- **Config**: JSON files

## Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Testes
npm run test
npm run test:watch
npm run test:e2e

# Lint
npm run lint
npm run lint:fix

# Type check
npm run type-check

# Package (criar executável)
npm run package
```

## Recursos e Referências

### Documentação Oficial
- MCP SDK: https://github.com/modelcontextprotocol
- TypeScript: https://www.typescriptlang.org/docs/
- Tauri: https://v2.tauri.app/start/
- React: https://react.dev/

### Bibliotecas Chave
- Monaco Editor: https://microsoft.github.io/monaco-editor/
- Zod: https://zod.dev/
- Vitest: https://vitest.dev/
- Tailwind CSS: https://tailwindcss.com/

### Exemplos de Servidores MCP
- Buscar repositórios oficiais de exemplo
- Analisar patterns comuns
- Documentar casos de uso reais

## Notas Importantes

- **SEMPRE** validar TypeScript antes de permitir salvar
- **NUNCA** executar código não sandboxed
- **SEMPRE** fazer backup antes de operações destrutivas
- **MANTER** UI responsiva durante operações longas
- **TESTAR** em múltiplas plataformas (Windows, Mac, Linux)
- **DOCUMENTAR** decisões de design importantes
- **PRIORIZAR** experiência do usuário sobre features complexas

## Git Workflow

### Estrutura de Branches
- `main` - branch de produção (protegida)
- `develop` - branch de desenvolvimento (branch padrão para PRs)
- `feature/*` - branches para novas funcionalidades
- `bugfix/*` - branches para correções de bugs
- `hotfix/*` - branches para correções urgentes em produção

### Fluxo de Trabalho

1. **Criar nova branch a partir de `develop`:**
```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nome-da-funcionalidade
```

2. **Desenvolver e commitar:**
```bash
   git add .
   git commit -m "feat: descrição da funcionalidade"
```

3. **Manter a branch atualizada:**
```bash
   git checkout develop
   git pull origin develop
   git checkout feature/nome-da-funcionalidade
   git rebase develop
```

4. **Enviar para o repositório:**
```bash
   git push origin feature/nome-da-funcionalidade
```

5. **Criar Pull Request:**
   - **IMPORTANTE:** Todos os PRs devem ser enviados para a branch `develop`
   - Preencha a descrição do PR com detalhes da implementação
   - Adicione reviewers apropriados
   - Vincule issues relacionadas

### Convenção de Commits

Utilize commits semânticos para melhor rastreabilidade:

- `feat:` - nova funcionalidade
- `fix:` - correção de bug
- `docs:` - mudanças na documentação
- `style:` - formatação, ponto e vírgula faltando, etc
- `refactor:` - refatoração de código
- `test:` - adição ou modificação de testes
- `chore:` - atualização de tarefas de build, configs, etc

**Exemplo:**
```bash
git commit -m "feat: adiciona autenticação JWT"
git commit -m "fix: corrige validação de email no formulário"
```

# Notas sobre o Protocolo MCP e Desenvolvimento de Servidor com TypeScript

Este documento resume as informações essenciais sobre o Model Context Protocol (MCP) e como desenvolver um servidor MCP usando o SDK de TypeScript.

## Core Concepts do MCP

O MCP é um padrão de código aberto para conectar aplicações de IA a sistemas externos, como fontes de dados, ferramentas e fluxos de trabalho. Ele age como uma porta padronizada, semelhante a um USB-C, para aplicações de IA.

### Três Pilares de um Servidor MCP

1.  **Tools**: Funções que um LLM pode chamar ativamente para realizar ações. O modelo decide quando usar as ferramentas com base nas solicitações do usuário.
    *   **Exemplos**: `searchFlights`, `createCalendarEvent`, `sendEmail`.
    *   **Controle**: O modelo de linguagem.

2.  **Resources**: Fontes de dados passivas que fornecem acesso somente leitura a informações para dar contexto ao modelo.
    *   **Exemplos**: `file:///path/to/document.md`, `calendar://events/2024`.
    *   **Controle**: A aplicação cliente.

3.  **Prompts**: Templates de instrução pré-construídos que guiam o modelo a trabalhar com ferramentas e recursos específicos para realizar tarefas complexas.
    *   **Exemplos**: `plan-vacation`, `summarize-meetings`.
    *   **Controle**: O usuário.

## Desenvolvimento de Servidor com TypeScript SDK

O SDK de TypeScript (`@modelcontextprotocol/sdk`) fornece as ferramentas necessárias para criar servidores MCP.

### Passos Essenciais

1.  **Instalação**:
    ```bash
    npm install @modelcontextprotocol/sdk
    ```

2.  **Instanciação do Servidor**:
    ```typescript
    import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

    const server = new McpServer({
      name: "meu-servidor-mcp",
      version: "1.0.0",
    });
    ```

3.  **Registro de Tools**:
    Use o método `registerTool` para definir uma nova ferramenta. É necessário fornecer um nome, descrição, esquema de entrada (usando `zod`) e um handler assíncrono.
    ```typescript
    import { z } from "zod";

    server.registerTool(
      "add",
      {
        title: "Addition Tool",
        description: "Add two numbers",
        inputSchema: { a: z.number(), b: z.number() },
      },
      async ({ a, b }) => ({
        content: [{ type: "text", text: String(a + b) }],
      })
    );
    ```

4.  **Registro de Resources**:
    Use `registerResource` para expor dados. Recursos podem ser estáticos (URI fixa) ou dinâmicos (com templates de URI).
    ```typescript
    import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

    server.registerResource(
      "greeting",
      new ResourceTemplate("greeting://{name}", { list: undefined }),
      {
        title: "Greeting Resource",
        description: "Dynamic greeting generator",
      },
      async (uri, { name }) => ({
        contents: [
          {
            uri: uri.href,
            text: `Hello, ${name}!`,
          },
        ],
      })
    );
    ```

5.  **Conexão com um Transporte**:
    O servidor precisa se conectar a um transporte para se comunicar. O mais comum para desenvolvimento local é o `StdioServerTransport`.
    ```typescript
    import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

    const transport = new StdioServerTransport();
    await server.connect(transport);
    ```

### Considerações Importantes

*   **Logging**: Em servidores baseados em `stdio`, **nunca** use `console.log()`, pois ele escreve para `stdout` e pode corromper as mensagens JSON-RPC. Use `console.error()` para logs, que escreve em `stderr`.
*   **Versionamento**: O Node.js v18.x ou superior é necessário.
*   **Segurança**: Para servidores HTTP, configure a proteção contra DNS rebinding e CORS adequadamente.

## Referências

*   **Documentação Principal do MCP**: [What is the Model Context Protocol (MCP)?](knowledge/mcp-doc/intro.mdx)
*   **Conceitos de Servidor**: [Understanding MCP servers](knowledge/mcp-doc/server-concepts.mdx)
*   **Guia de Construção de Servidor (com exemplos em Node/TypeScript)**: [Build an MCP server](knowledge/mcp-doc/build-server.mdx)
*   **README do SDK de TypeScript**: [MCP TypeScript SDK](knowledge/typescript-sdk/README.md)
*   **Repositório do Protocolo**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)

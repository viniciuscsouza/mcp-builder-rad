# Specifications de Software: 01 - Modelagem de Dados

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento define as estruturas de dados, schemas e o modelo de armazenamento para a aplicação MCP Server Builder RAD. Ele detalha como os projetos, ferramentas (Tools), recursos (Resources) e suas configurações serão representados, armazenados e relacionados.

**Por quê?**  
Um modelo de dados claro e bem definido é fundamental para a integridade dos dados, a estabilidade da aplicação e, mais importante, para a lógica de geração de código TypeScript. Este documento serve como a única fonte da verdade para todas as entidades de dados do sistema.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Entidades de Dados Principais

### Entidade 1: `Project`
- **Descrição:** Representa um único projeto de servidor MCP criado pelo usuário. Funciona como um contêiner para todas as ferramentas, recursos e configurações associadas.
- **Atributos:**
  - `id`: `string` (UUID, Chave Primária)
  - `name`: `string` (Nome do projeto, ex: "Servidor de Clima")
  - `version`: `string` (Versão do servidor, ex: "1.0.0")
  - `description`: `string` (Descrição opcional)
  - `createdAt`: `Date`
  - `updatedAt`: `Date`
- **Relacionamentos:** Um `Project` possui muitas `Tools`, muitos `Resources` e muitos `Prompts`.

### Entidade 2: `Tool`
- **Descrição:** Representa uma única capacidade de `Tool` do MCP dentro de um projeto.
- **Atributos:**
  - `id`: `string` (UUID, Chave Primária)
  - `projectId`: `string` (Chave Estrangeira para `Project`)
  - `name`: `string` (Identificador único no código, ex: "fetchWeather")
  - `title`: `string` (Nome de exibição na UI, ex: "Buscar Clima")
  - `description`: `string` (Descrição da funcionalidade)
  - `inputSchema`: `string` (O código do schema Zod armazenado como texto, ex: `{ city: z.string() }`)
  - `handlerCode`: `string` (O corpo da função `async` do handler, armazenado como texto)
  - `createdAt`: `Date`
  - `updatedAt`: `Date`
- **Relacionamentos:** Uma `Tool` pertence a um `Project`.

### Entidade 3: `Resource`
- **Descrição:** Representa uma única capacidade de `Resource` do MCP dentro de um projeto.
- **Atributos:**
  - `id`: `string` (UUID, Chave Primária)
  - `projectId`: `string` (Chave Estrangeira para `Project`)
  - `name`: `string` (Identificador único no código, ex: "userProfile")
  - `title`: `string` (Nome de exibição na UI, ex: "Perfil de Usuário")
  - `description`: `string` (Descrição do recurso)
  - `uriTemplate`: `string` (O template da URI, ex: "users://{userId}/profile")
  - `handlerCode`: `string` (O corpo da função `async` do handler, armazenado como texto)
  - `createdAt`: `Date`
  - `updatedAt`: `Date`
- **Relacionamentos:** Um `Resource` pertence a um `Project`.

### Entidade 4: `Prompt`
- **Descrição:** Representa um template de `Prompt` reutilizável do MCP.
- **Atributos:**
  - `id`: `string` (UUID, Chave Primária)
  - `projectId`: `string` (Chave Estrangeira para `Project`)
  - `name`: `string` (Identificador único no código, ex: "codeReview")
  - `title`: `string` (Nome de exibição na UI, ex: "Revisão de Código")
  - `description`: `string` (Descrição do prompt)
  - `argsSchema`: `string` (O código do schema Zod para os argumentos, ex: `{ code: z.string() }`)
  - `factoryCode`: `string` (O corpo da função fábrica que retorna a estrutura de mensagens)
  - `createdAt`: `Date`
  - `updatedAt`: `Date`
- **Relacionamentos:** Um `Prompt` pertence a um `Project`.

---

## 3. Requisitos Técnicos

**Tecnologias de Armazenamento:**
- **Banco de Dados:** SQLite (via `better-sqlite3`) será usado para armazenar os metadados estruturados das entidades (`Project`, `Tool`, `Resource`, `Prompt`).
- **Sistema de Arquivos:** O módulo `fs/promises` do Node.js será usado para criar, ler e escrever os arquivos de código-fonte `.ts` gerados para cada projeto no disco.

---

## 4. Fluxo de Dados Principal

**Cenário: Usuário cria uma nova `Tool`**

1. O usuário preenche um formulário na interface gráfica com os dados da `Tool` (nome, título, descrição, schema de entrada e código do handler).
2. A aplicação valida os campos no frontend e no backend.
3. Um novo registro para a `Tool` é inserido na tabela correspondente no banco de dados SQLite, associado ao `Project` ativo.
4. O motor de geração de código da aplicação é acionado.
5. O motor lê os dados do `Project` e de todas as suas `Tools` e `Resources` associadas a partir do banco de dados.
6. Um arquivo `server.ts` (ou similar) é gerado ou atualizado no sistema de arquivos, contendo a chamada `server.registerTool()` com os dados recuperados do banco.

---

## 5. Interface (Definição de Tipos)

As seguintes interfaces TypeScript serão usadas para representar as entidades na aplicação:

```typescript
// Representa um projeto de servidor MCP
interface Project {
  id: string;
  name: string;
  version: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Representa uma MCP Tool
interface Tool {
  id: string;
  projectId: string;
  name: string;
  title: string;
  description: string;
  inputSchema: string; // Ex: "{ city: z.string() }"
  handlerCode: string; // Ex: "async ({ city }) => { ... }"
  createdAt: Date;
  updatedAt: Date;
}

// Representa um MCP Resource
interface Resource {
  id: string;
  projectId: string;
  name: string;
  title: string;
  description: string;
  uriTemplate: string; // Ex: "users://{userId}/profile"
  handlerCode: string; // Ex: "async (uri, { userId }) => { ... }"
  createdAt: Date;
  updatedAt: Date;
}

// Representa um MCP Prompt
interface Prompt {
  id: string;
  projectId: string;
  name: string;
  title: string;
  description: string;
  argsSchema: string; // Ex: "{ code: z.string() }"
  factoryCode: string; // Ex: "({ code }) => ({ messages: [...] })"
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 6. Dados

(Conteúdo movido para as seções 2 e 5 para melhor organização neste documento específico).

---

## 7. Dependências Externas

- **`better-sqlite3`**: Driver Node.js para interação com o banco de dados SQLite.
- **`zod`**: A biblioteca será usada no *código gerado*. A aplicação em si apenas armazenará as definições do Zod como texto.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Armazenar código (schemas, handlers) como texto no banco de dados pode ser frágil e propenso a erros de sintaxe. | Implementar validação robusta antes de salvar. O editor Monaco fornecerá *syntax highlighting* e uma validação no backend (usando um parser TypeScript) será executada antes da geração do código para detectar erros. |
| Evolução e migração do schema do banco de dados SQLite. | Adotar uma biblioteca de migração leve ou criar um script de versionamento simples desde o início para gerenciar alterações no schema do banco de forma sistemática. |

---

## 9. Timeline

- N/A

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Entidade | Um objeto de dados primário na aplicação, como `Project`, `Tool` ou `Resource`. |
| Schema | Neste contexto, refere-se à estrutura das tabelas do banco de dados e à forma das entidades de dados. |
| Handler | O bloco de código (função) que contém a lógica de execução de uma `Tool` ou `Resource`. |

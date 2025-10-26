# Specifications de Software: Fase 0 - Setup Inicial

**Projeto:** MCP Server Builder RAD  
**Versão:** 0.1  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento detalha as especificações para a fase inicial de configuração e pesquisa do projeto. Ele delineia as tarefas fundamentais necessárias antes que o desenvolvimento de funcionalidades possa começar.

**Por quê?**  
Para garantir que o ambiente de desenvolvimento esteja corretamente configurado, o SDK principal seja compreendido, as estruturas de dados sejam planejadas e o processo de build seja estabelecido. Isso minimiza riscos futuros e retrabalho.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Tarefas Iniciais

### Tarefa 1: Configurar Ambiente de Desenvolvimento
- **Descrição:** Montar o ambiente de desenvolvimento completo integrando Tauri, React e TypeScript.
- **Como funciona:**
  1. Inicializar um novo projeto Tauri.
  2. Integrar o template do React com TypeScript como o framework de frontend.
  3. Instalar e configurar dependências básicas: Tailwind CSS (estilo), Zustand (estado) e Lucide React (ícones).
  4. Garantir que a aplicação "Hello World" padrão execute com sucesso no desktop.
- **Pronto quando:** Uma aplicação desktop básica usando Tauri com um frontend React/TypeScript estiver rodando localmente via `npm run dev` sem erros.

### Tarefa 2: Estudar SDK MCP TypeScript
- **Descrição:** Realizar uma análise aprofundada do `@modelcontextprotocol/sdk` para entender sua arquitetura, capacidades, APIs principais e limitações.
- **Como funciona:**
  1. Revisar a documentação oficial e os exemplos de código do SDK.
  2. Identificar os componentes-chave: `McpServer`, `registerTool`, `registerResource`, `ResourceTemplate`, e transportes como `StdioServerTransport`.
  3. Analisar o uso de `zod` para a definição de schemas de entrada.
  4. Documentar as melhores práticas, especialmente sobre logging (`console.error` vs `console.log`) e tratamento de erros.
  5. Utilize a pasta `knowledge` como base de conhecimento.
- **Pronto quando:** Um resumo com os principais aprendizados for criado, detalhando como usar o SDK para implementar os recursos do RAD.

### Tarefa 3: Definir Estrutura de Dados do Projeto
- **Descrição:** Projetar os modelos de dados da aplicação, definindo como projetos, capabilities (tools/resources) e configurações serão estruturados e armazenados.
- **Como funciona:**
  1. Definir o schema para um "Projeto", que conterá metadados e uma coleção de tools/resources.
  2. Definir o schema para uma "Tool", incluindo nome, descrição, schema de entrada (Zod) e o código do handler.
  3. Definir o schema para um "Resource", incluindo seu template de URI, descrição e o código do handler.
  4. Escolher a estratégia de armazenamento: SQLite para dados estruturados e arquivos no sistema de arquivos para o código gerado.
- **Pronto quando:** Os schemas de dados estiverem definidos (ex: usando interfaces TypeScript ou schemas Zod) e a estratégia de armazenamento estiver decidida.

### Tarefa 4: Configurar Pipeline de Build
- **Descrição:** Configurar os scripts e workflows necessários para build, teste, lint e empacotamento da aplicação.
- **Como funciona:**
  1. Validar e ajustar os scripts `npm` (`build`, `test`, `lint`, `type-check`, `package`) definidos no `README.md`.
  2. Configurar o Vitest para a execução de testes unitários e de integração.
  3. Assegurar que o comando `npm run package` do Tauri consiga gerar um executável para a plataforma de desenvolvimento atual (Linux).
- **Pronto quando:** A aplicação puder ser construída, testada e empacotada em um executável distribuível usando os comandos `npm`.

---

## 3. Requisitos Técnicos

**Tecnologias:**
- Frontend: Tauri, React 18+, TypeScript, Tailwind CSS, Zustand
- Backend/Engine: Node.js 18+, TypeScript 5+, @modelcontextprotocol/sdk
- Banco de dados: SQLite (via better-sqlite3)
- Build Tool: Vite

**Performance:**
- N/A para esta fase.

**Segurança:**
- N/A para esta fase.

---

## 4. Fluxo Principal

**Cenário:** N/A
- Fluxos de usuário serão definidos em especificações de funcionalidades futuras.

---

## 5. Interface

**Principais telas:**
- N/A
- A interface será detalhada em especificações futuras.

---

## 6. Dados

**Principais informações armazenadas:**
- **Projeto:** (id, nome, versão, descrição)
- **Tool:** (id, id_projeto, nome, descrição, schema_entrada, codigo_handler)
- **Resource:** (id, id_projeto, nome, template_uri, descrição, codigo_handler)

---

## 7. Dependências Externas

- **@modelcontextprotocol/sdk:** SDK principal para a lógica de servidor MCP.
- **Tauri:** Framework para a construção da aplicação desktop.
- **React:** Biblioteca de UI para o frontend.
- **Monaco Editor:** Componente de editor de código.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Complexidade ou breaking changes no SDK do MCP. | A "Tarefa 2: Estudar SDK" é dedicada a mitigar isso, antecipando a pesquisa. |
| Incompatibilidades entre Tauri, Vite e dependências do frontend. | A "Tarefa 1: Configurar Ambiente" visa identificar e resolver esses problemas em uma configuração mínima. |

---

## 9. Timeline

- **Fase 0:** 26/10/2025 - 28/10/2025 - Conclusão de todas as tarefas de setup descritas neste documento.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| MCP | Model Context Protocol. Um padrão para conectar aplicações de IA a sistemas externos. |
| RAD | Rapid Application Development. |
| Tauri | Um framework para construir aplicações desktop multiplataforma com frontends web. |
| Tool (MCP) | Uma função ativa que um LLM pode invocar para realizar uma ação. |
| Resource (MCP) | Uma fonte de dados passiva que fornece contexto a um LLM. |

# Specifications de Software: 12 - Gerenciador de Projetos

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica o `ProjectManager`, uma interface dedicada (seja um modal de tela cheia ou uma visão principal) para criar, abrir, listar e gerenciar os projetos de servidor MCP.

**Por quê?**  
Para fornecer um hub central onde os usuários possam organizar seu trabalho. Esta interface é o ponto de entrada da aplicação e permite operações de ciclo de vida do projeto, como criação, exclusão, duplicação e compartilhamento (importar/exportar).

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Interface `ProjectManager`
- **Descrição:** Uma interface no estilo dashboard que exibe uma lista de todos os projetos do usuário e fornece ações para gerenciá-los.

- **Requisitos Funcionais:**
  - `[RF-001]` Deve listar todos os projetos existentes em um formato de grade ou lista.
  - `[RF-002]` Deve fornecer um meio de criar um novo projeto.
  - `[RF-003]` Deve permitir abrir um projeto existente, carregando-o no espaço de trabalho principal da aplicação.
  - `[RF-004]` Deve permitir a exclusão de um projeto, com uma etapa de confirmação para evitar perda acidental de dados.
  - `[RF-005]` Deve permitir a duplicação de um projeto existente.
  - `[RF-006]` Deve permitir a exportação de um projeto para um arquivo (ex: `.zip` contendo um `project.json`).
  - `[RF-007]` Deve permitir a importação de um projeto a partir de um arquivo.
  - `[RF-008]` Deve incluir uma barra de busca para filtrar projetos por nome.
  - `[RF-009]` Deve suportar a ordenação da lista de projetos por critérios como nome e data de modificação.
  - `[RF-010]` Cada projeto na lista deve exibir metadados chave, como data da última modificação e um resumo do seu conteúdo (nº de tools, resources, etc.).

- **Pronto quando:** A interface de gerenciamento de projetos estiver funcional, permitindo ao usuário realizar todas as operações de ciclo de vida de um projeto.

---

## 3. Requisitos Técnicos

- **Componentes:** Construído com os componentes do Design System (`Card`, `Button`, `Input`, `Modal`).
- **Acesso a Dados:** Irá interagir diretamente com a camada de dados (especificada em `01_DATA_MODELING.md`) para buscar a lista de projetos e realizar operações CRUD.
- **Sistema de Arquivos:** A funcionalidade de importar/exportar exigirá o uso das APIs de sistema de arquivos (provavelmente através do Tauri) para ler e escrever no disco do usuário.

---

## 4. Fluxo de Interação

**Cenário: Usuário deleta um projeto.**

1.  O usuário está na tela do `ProjectManager`.
2.  Ele clica no ícone de lixeira (🗑️) no card do projeto que deseja excluir.
3.  Um modal de confirmação é exibido: "Você tem certeza que deseja deletar o projeto 'nome-do-projeto'? Esta ação não pode ser desfeita."
4.  O usuário clica no botão "Deletar" no modal.
5.  A aplicação executa a lógica para remover o projeto e todos os seus dados associados (tools, resources, etc.) do banco de dados.
6.  A lista de projetos na UI é atualizada, removendo o card do projeto excluído.
7.  Uma notificação (toast) de sucesso é exibida: "Projeto 'nome-do-projeto' deletado com sucesso."

---

## 5. Detalhes da Interface

### Estrutura Visual

```
┌──────────────────────────────────────────────┐
│ Meus Projetos                             ✕  │
├──────────────────────────────────────────────┤
│ [🔍 Buscar projetos...]  [Novo] [Importar]   │
├──────────────────────────────────────────────┤
│                                              │
│ ┌─ my-database-server ──────────────────┐   │
│ │ Servidor MCP para banco de dados      │   │
│ │ 📊 3 tools  📦 2 resources  🧪 5 tests │   │
│ │ Modificado: há 2 horas               │   │
│ │                 [Abrir] [Export] [🗑️] │   │
│ └───────────────────────────────────────┘   │
│                                              │
│ ┌─ api-wrapper ─────────────────────────┐   │
│ │ Wrapper para API externa              │   │
│ │ 📊 5 tools  📦 0 resources  🧪 8 tests │   │
│ │ Modificado: ontem                     │   │
│ │                 [Abrir] [Export] [🗑️] │   │
│ └───────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

---

## 6. Dados e Estado

- **Estado Consumido (da camada de dados):**
  - `projects: Project[]`: A lista de todos os projetos.
  - Para cada projeto, um resumo de seu conteúdo (ex: `tools.length`).

- **Estado Local:**
  - `filterQuery: string`: O texto atual do campo de busca.
  - `sortBy: 'name' | 'date'`: O critério de ordenação atual.

---

## 7. Dependências

- **Internas:** Componentes do Design System.
- **Externas:** API do Tauri para acesso ao sistema de arquivos.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| A lógica de importação/exportação pode ser complexa (serialização de dados, compatibilidade de versão). | Definir um formato de arquivo claro e versionado (ex: um arquivo `.zip` contendo um `project.json` com todos os dados). A lógica de importação deve incluir verificações para lidar com arquivos de versões mais antigas da aplicação. |
| A exclusão de um projeto é uma ação destrutiva. Uma falha no meio da operação pode deixar dados órfãos. | Envolver toda a lógica de exclusão em uma transação de banco de dados para garantir que ou todos os dados relacionados sejam excluídos, ou nenhum seja (atomicidade). |

---

## 9. Timeline

- **Fase 1:** Implementar a listagem de projetos existentes.
- **Fase 2:** Implementar as funcionalidades de "Criar Novo" e "Abrir".
- **Fase 3:** Implementar "Deletar" (com confirmação) e "Duplicar".
- **Fase 4:** Implementar busca, filtro e ordenação.
- **Fase 5:** Implementar a funcionalidade de importação/exportação.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| CRUD | Acrônimo para Create, Read, Update, Delete - as quatro operações básicas de persistência de dados. |
| Serialização | O processo de converter uma estrutura de dados em um formato que pode ser armazenado ou transmitido. |

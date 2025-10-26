# Specifications de Software: 14 - Arquitetura de Gerenciamento de Estado

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento descreve a arquitetura completa de gerenciamento de estado para a aplicação, utilizando a biblioteca Zustand. Ele define como o estado da aplicação é estruturado, acessado, modificado e persistido.

**Por quê?**  
Para estabelecer um padrão previsível, escalável e de fácil manutenção para o estado da aplicação. Uma arquitetura bem definida previne inconsistências, simplifica a depuração e garante que as diferentes partes da UI reajam de forma correta e performática às mudanças nos dados.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Princípios e Estrutura

### Princípio 1: Store Centralizado com Slices
- **Descrição:** A aplicação utilizará um único store Zustand, que será composto por múltiplas "slices" (fatias). Cada slice será responsável por um domínio específico do estado (ex: dados do projeto, estado da UI), combinando a simplicidade de um store único com a organização de responsabilidades separadas.
- **Implementação:** Um store raiz (`useBoundStore`) será criado combinando as várias slices. Cada slice será definida em seu próprio arquivo, contendo seu estado e ações.

### Princípio 2: Imutabilidade com Immer
- **Descrição:** Todas as atualizações de estado devem ser imutáveis. Em vez de modificar o estado diretamente, as ações devem sempre produzir um novo objeto de estado.
- **Implementação:** O middleware `immer` será integrado ao Zustand para simplificar as atualizações imutáveis, especialmente em objetos aninhados, permitindo uma sintaxe de mutação "aparente" que é segura.

### Princípio 3: Persistência Seletiva
- **Descrição:** Partes do estado que precisam sobreviver entre sessões (como configurações da UI) serão persistidas no `localStorage`.
- **Implementação:** O middleware `persist` do Zustand será usado, configurado para salvar apenas slices ou propriedades específicas do estado, evitando o armazenamento de dados grandes ou transitórios.

### Princípio 4: Ações Assíncronas
- **Descrição:** Ações que envolvem operações assíncronas (como salvar um projeto no banco de dados) serão tratadas diretamente dentro do store.
- **Implementação:** Uma ação definirá um estado de `loading`, executará a operação assíncrona e, em seguida, atualizará o store com o resultado (sucesso ou erro).

---

## 3. Requisitos Técnicos

- **Biblioteca Principal:** `zustand`.
- **Middlewares:**
  - `immer`: Para atualizações imutáveis simplificadas.
  - `zustand/middleware/persist`: Para persistir o estado no `localStorage`.
  - `zustand/middleware/devtools`: Para depuração com o Redux DevTools.

---

## 4. Estrutura do Store

O store global será dividido nas seguintes slices:

### Slice 1: `ProjectSlice`
- **Responsabilidade:** Gerenciar todos os dados do projeto atualmente carregado.
- **Estado:**
  - `project: Project | null`
  - `tools: Tool[]`
  - `resources: Resource[]`
  - `prompts: Prompt[]`
  - `status: 'clean' | 'dirty' | 'saving'`
- **Ações:**
  - `loadProject(projectId)`: Carrega um projeto do banco de dados para o estado.
  - `unloadProject()`: Limpa o estado do projeto atual.
  - `updateProjectDetails(details)`: Atualiza os metadados do projeto.
  - `addCapability(type, data)`: Adiciona uma nova tool, resource ou prompt.
  - `updateCapability(id, data)`: Atualiza uma capability existente.
  - `deleteCapability(id)`: Remove uma capability.

### Slice 2: `UISlice`
- **Responsabilidade:** Gerenciar o estado global da interface do usuário.
- **Estado (Persistido):**
  - `isSidebarCollapsed: boolean`
  - `activeProjectId: string | null`
  - `theme: 'light' | 'dark'`
  - `lastOpenedProjects: string[]`
- **Ações:**
  - `toggleSidebar()`
  - `setActiveProject(projectId)`
  - `setTheme(theme)`

### Slice 3: `EditorSlice`
- **Responsabilidade:** Gerenciar o estado relacionado às abas e painéis de edição.
- **Estado:**
  - `activeTabId: string | null` (ID da capability sendo editada)
  - `openTabs: Tab[]` (Lista de abas abertas)
- **Ações:**
  - `openTab(capability)`
  - `closeTab(tabId)`
  - `setActiveTab(tabId)`

### Exemplo de Combinação
```typescript
// src/store/index.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
// ... import slices

export const useBoundStore = create(immer((...a) => ({
  ...createProjectSlice(...a),
  ...createUISlice(...a),
  ...createEditorSlice(...a),
})));
```

---

## 5. Fluxo de Dados

**Cenário: Usuário atualiza o nome de uma `Tool` no `PropertyInspector`.**

1.  O `PropertyInspector` invoca a ação `updateCapability(toolId, { name: newName })` do store.
2.  A ação, dentro da `ProjectSlice`, encontra a `Tool` correspondente no array `state.tools`.
3.  Usando `immer`, ela atualiza a propriedade `name` de forma imutável.
4.  Zustand notifica os componentes inscritos sobre a mudança de estado.
5.  Componentes como a `Sidebar` e o `Header`, que usam o nome da `Tool`, re-renderizam automaticamente para exibir o novo nome.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Re-renderizações desnecessárias de componentes que consomem o store. | Utilizar seletores com comparação `shallow` para inscrever componentes apenas a partes específicas do estado. Ex: `const tools = useBoundStore(state => state.tools, shallow);`. Isso evita que o componente re-renderize se outra parte do estado (ex: `theme`) mudar. |
| O store global se tornar um "god object" monolítico e difícil de gerenciar. | Aplicar estritamente o padrão de slices. Cada slice deve ser autocontido. Ações em uma slice não devem modificar diretamente o estado de outra slice; em vez disso, devem chamar ações da outra slice se necessário. |

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Zustand | Uma biblioteca de gerenciamento de estado para React, conhecida por sua simplicidade e performance. |
| Slice | Uma "fatia" do store global, contendo seu próprio estado e ações, focada em um domínio específico da aplicação. |
| Middleware | Funções que envolvem a criação do store para adicionar funcionalidades extras, como persistência ou imutabilidade. |
| Imutabilidade | O princípio de que o estado não deve ser modificado diretamente, mas sim substituído por uma nova versão atualizada. |

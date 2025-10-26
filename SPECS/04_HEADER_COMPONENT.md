# Specifications de Software: 04 - Componente Header

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica o componente `Header`, a barra superior fixa da aplicação. Ele é responsável por exibir a identidade visual do aplicativo, o contexto do projeto atual, um conjunto de ações globais e indicadores de estado.

**Por quê?**  
Para fornecer um ponto de acesso central e consistente para ações globais e informações de status importantes, melhorando a orientação do usuário e a eficiência do fluxo de trabalho.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Componente `Header`
- **Descrição:** Uma barra de ferramentas persistente no topo da janela que serve como o principal centro de comando e informação de contexto da aplicação.

- **Requisitos Funcionais:**
  - `[RF-001]` Deve exibir o logo e o nome da aplicação (⚡ MCP Builder).
  - `[RF-002]` Deve exibir o nome do projeto atualmente carregado.
  - `[RF-003]` Deve conter botões para as ações principais: Novo, Abrir, Salvar, Exportar e Testar.
  - `[RF-004]` Deve indicar visualmente o estado de salvamento do projeto (não salvo, salvando).
  - `[RF-005]` Deve incluir um menu dropdown para acesso a Configurações e Ajuda.

- **Pronto quando:** O componente `Header` estiver implementado, reativo às mudanças de estado do projeto e com todas as ações funcionais.

---

## 3. Requisitos Técnicos

- **Componentes:** O `Header` será construído utilizando os componentes base do Design System do projeto (ex: `Button`, `Icon`, `Dropdown`).
- **Gerenciamento de Estado:** Consumirá dados de um store global do Zustand para obter o nome do projeto atual e seu estado (`status`: 'clean', 'dirty', 'saving').
- **Ícones:** `lucide-react`.

---

## 4. Ações e Interações

### Ações Principais
1.  **Novo** (Atalho: `Ctrl+N`)
    -   Ícone: `Plus`
    -   Ação: Dispara o fluxo para criação de um novo projeto (ex: abre um modal).
2.  **Abrir** (Atalho: `Ctrl+O`)
    -   Ícone: `FolderOpen`
    -   Ação: Dispara o fluxo para abrir um projeto existente.
3.  **Salvar** (Atalho: `Ctrl+S`)
    -   Ícone: `Save`
    -   Ação: Salva as alterações do projeto atual.
    -   Estado: Desabilitado quando não houver alterações (`status: 'clean'`).
4.  **Exportar** (Atalho: `Ctrl+E`)
    -   Ícone: `Download`
    -   Ação: Inicia o fluxo de exportação do projeto.
    -   Estado: Desabilitado se não houver projeto carregado.
5.  **Testar** (Atalho: `Ctrl+Shift+T`)
    -   Ícone: `Play`
    -   Ação: Executa a suíte de testes do projeto atual.
    -   Estado: Desabilitado se não houver projeto carregado.

### Ações Secundárias
-   **Configurações** (Ícone: `Settings`): Abre a tela ou modal de configurações.
-   **Ajuda** (Ícone: `HelpCircle`): Abre a documentação ou menu de ajuda.

---

## 5. Detalhes da Interface

### Estrutura Visual
O header será dividido em três seções principais: Esquerda (Branding), Centro (Contexto do Projeto) e Direita (Ações).

```
┌───────────────────────────────────────────────────────────────────────────┐
│ [Logo + Título]       [Nome do Projeto + Status]       [Ações + Menus]    │
│ ⚡ MCP Builder         my-project *                     [Btn] [Btn] [⚙️] [?] │
└───────────────────────────────────────────────────────────────────────────┘
```

### Estados Visuais

-   **Estado Normal (Salvo):**
    -   Nenhum indicador ao lado do nome do projeto.
    -   Botão "Salvar" desabilitado.

-   **Estado Dirty (Não Salvo):**
    -   Um asterisco (`*`) é exibido após o nome do projeto.
    -   O botão "Salvar" é habilitado e pode ter um destaque visual.

-   **Estado Salvando:**
    -   Um ícone de spinner é exibido ao lado do nome do projeto.
    -   O botão "Salvar" fica desabilitado.
    -   Um texto "Salvando..." pode ser exibido.

-   **Estado Sem Projeto:**
    -   A área do nome do projeto fica vazia.
    -   Os botões "Salvar", "Exportar" e "Testar" são desabilitados.
    -   Apenas "Novo" e "Abrir" permanecem ativos.

---

## 6. Dados e Estado

- **Estado Consumido (do store global Zustand):**
  - `currentProjectName`: `string | null`
  - `projectStatus`: `'clean' | 'dirty' | 'saving'`

---

## 7. Dependências

- **Internas:** Componentes do Design System (`Button`, `Icon`, `Dropdown`).
- **Externas:** `zustand`, `lucide-react`.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| A lógica para gerenciar os estados (habilitado/desabilitado) dos múltiplos botões pode se tornar complexa e propensa a bugs. | Centralizar essa lógica em um custom hook (ex: `useHeaderState`). O hook receberá o estado bruto do projeto (`projectStatus`, etc.) e retornará um objeto com flags booleanas (`isSaveDisabled`, `isExportDisabled`) para o componente consumir de forma limpa. |
| Atalhos de teclado podem conflitar com os do navegador ou sistema operacional. | Utilizar uma biblioteca robusta para gerenciamento de atalhos globais. Exibir os atalhos nos tooltips dos botões para melhor descoberta pelo usuário. |

---

## 9. Timeline

- **Fase 1:** Implementar o layout estático do `Header` com todos os elementos visuais.
- **Fase 2:** Conectar o componente ao store global para refletir dinamicamente os diferentes estados (dirty, saving, sem projeto).
- **Fase 3:** Implementar a funcionalidade dos botões e os atalhos de teclado.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Dirty State | Um estado que indica a existência de alterações não salvas no projeto atual. |
| Store Global | Um local centralizado (neste caso, implementado com Zustand) para armazenar o estado que é compartilhado por toda a aplicação. |

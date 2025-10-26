# Specifications de Software: 08 - Painel Inspetor de Propriedades

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica o `PropertyInspector`, um painel lateral ou inline que exibe um formulário para visualizar e editar as propriedades da capability (Tool, Resource, etc.) atualmente selecionada na `Sidebar`.

**Por quê?**  
Para fornecer uma maneira rápida e conveniente de editar os metadados e a configuração de uma capability sem a necessidade de abrir um editor de tela cheia para cada pequena alteração. Ele complementa o editor de código principal, cuidando do aspecto de "propriedades" da capability.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Painel `PropertyInspector`
- **Descrição:** Um painel contextual que renderiza um formulário para edição das propriedades da capability selecionada.

- **Requisitos Funcionais:**
  - `[RF-001]` O formulário deve ser contextual, exibindo campos relevantes para o tipo de item selecionado (ex: `uriTemplate` para um Resource).
  - `[RF-002]` As alterações nos campos devem ser salvas automaticamente, com um debounce de 1 segundo.
  - `[RF-003]` Deve fornecer validação inline à medida que o usuário digita.
  - `[RF-004]` Deve incluir um interruptor (toggle) para habilitar/desabilitar a capability.
  - `[RF-005]` Deve incluir botões/links para navegar para o editor de código principal para editar propriedades complexas (ex: `handlerCode`).
  - `[RF-006]` Deve suportar um histórico de alterações local (undo/redo) para as edições feitas no painel.
  - `[RF-007]` Deve exibir badges ou ícones de status para indicar erros ou avisos na configuração da capability.

- **Pronto quando:** O painel estiver funcional, permitindo a edição e o salvamento automático das propriedades da capability selecionada.

---

## 3. Requisitos Técnicos

- **Componentes:** Construído com os componentes do Design System (`Input`, `Button`, `Toggle`, `Card`, `Accordion`).
- **Gerenciamento de Estado:** Fortemente acoplado ao store global do Zustand. Lerá os dados do item selecionado e despachará ações de atualização no auto-save.
- **Validação:** Zod para a lógica de validação inline.

---

## 4. Fluxo de Interação

**Cenário: Usuário edita a descrição de uma `Tool`**

1.  O usuário clica em uma `Tool` na `Sidebar`.
2.  O painel `PropertyInspector` é renderizado (ou atualizado) com os dados da `Tool` selecionada.
3.  O usuário edita o campo "Descrição".
4.  Após 1 segundo sem novas digitações, a função de auto-save é acionada.
5.  Uma ação `updateCapability` é despachada para o store do Zustand com os novos dados.
6.  O estado global é atualizado, e a alteração é persistida. O `Header` pode indicar um estado "dirty".

---

## 5. Detalhes da Interface

### Estrutura Visual

```
┌────────────────────────────────┐
│ ⚡ Tool: searchDatabase        │
├────────────────────────────────┤
│ ☑ Habilitado                   │
│                                │
│ Nome                           │
│ [searchDatabase____________]  │
│                                │
│ Descrição                      │
│ [Busca no banco de dados___]  │
│ [___________________________]  │
│                                │
│ Input Schema                   │
│ [Editar Schema →]             │
│                                │
│ Handler                        │
│ [Editar Código →]             │
│                                │
│ Tags                           │
│ [🏷 database] [🏷 search] [+]  │
│                                │
│ Testes (2)                     │
│ ✓ Test 1                       │
│ ✓ Test 2                       │
│ [+ Adicionar Teste]            │
│                                │
├────────────────────────────────┤
│ [Deletar] [Duplicar] [Export] │
└────────────────────────────────┘
```

---

## 6. Dados e Estado

- **Estado Consumido (do store global):**
  - `selectedItem: Tool | Resource | Prompt | null`: O objeto de dados completo do item selecionado.

- **Ações Despachadas (para o store global):**
  - `updateCapability(id, data)`
  - `deleteCapability(id)`
  - `duplicateCapability(id)`
  - `toggleCapability(id)`

---

## 7. Dependências

- **Internas:** Componentes do Design System.
- **Externas:** `zustand`, `zod`.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| A gestão do histórico de undo/redo (RF-006) junto com o auto-save pode ser complexa. | Implementar a pilha de histórico em um custom hook ou em um slice de estado dedicado ao inspetor. Cada alteração empilha o estado anterior. O auto-save consolida o estado atual, podendo limpar a pilha de "redo", um padrão comum em editores. |
| O painel pode ficar poluído com muitas propriedades para capabilities complexas. | Utilizar seções colapsáveis (componente `Accordion` do Design System) para agrupar propriedades relacionadas (ex: "Geral", "Schema", "Testes"). Manter as propriedades mais comuns visíveis por padrão. |

---

## 9. Timeline

- **Fase 1:** Implementar o layout do formulário que exibe os dados do item selecionado.
- **Fase 2:** Implementar a edição com auto-save e validação inline.
- **Fase 3:** Adicionar os botões de ação (Deletar, Duplicar) e o toggle de habilitar/desabilitar.
- **Fase 4:** Implementar o histórico de undo/redo.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Painel Inspetor | Um painel de UI que exibe e permite a edição das propriedades do objeto atualmente selecionado. |
| Formulário Contextual | Um formulário que altera seus campos e layout com base no contexto (neste caso, o tipo de capability selecionada). |

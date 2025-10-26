# Specifications de Software: 07 - Modal de Criação/Edição de Capability

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica o `CapabilityEditorModal`, um diálogo modal que serve como a interface principal para criar e editar as capabilities de um projeto (Tools, Resources e Prompts).

**Por quê?**  
Para fornecer um fluxo de trabalho guiado, validado e amigável para a definição da lógica central de um servidor MCP. Este modal é uma peça central da experiência RAD, abstraindo a necessidade de escrever código repetitivo manualmente e reduzindo a chance de erros.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Modal de Criação/Edição
- **Descrição:** Um formulário dinâmico apresentado dentro de um modal, cujos campos se adaptam ao tipo de capability (Tool, Resource ou Prompt) que está sendo criada ou editada.

- **Requisitos Funcionais:**
  - `[RF-001]` O formulário deve apresentar campos específicos para cada tipo de capability (ex: `uriTemplate` para Resource).
  - `[RF-002]` Deve fornecer validação de formulário em tempo real usando Zod, com feedback imediato ao usuário.
  - `[RF-003]` Deve exibir um painel de preview (somente leitura) que mostra o código sendo gerado com base nos dados do formulário.
  - `[RF-004]` Deve permitir ao usuário selecionar um template base (ex: "API Call", "Database Query") para preencher o código inicial.
  - `[RF-005]` Deve suportar um modo de criação rápida (campos mínimos) e um modo completo.
  - `[RF-006]` O botão de confirmação deve ter rótulos contextuais, como "Criar" vs. "Criar e Editar".
  - `[RF-007]` Deve fornecer feedback visual claro para cada campo que contenha um erro de validação.

- **Pronto quando:** O modal estiver funcional para criar e editar os três tipos de capabilities, com validação e preview de código funcionando conforme especificado.

---

## 3. Requisitos Técnicos

- **Componentes:** Construído com os componentes do Design System (`Modal`, `Input`, `Button`, `Select`, `CodeEditor` para o preview).
- **Gerenciamento de Estado:** Utilizará estado local do React (ex: `useReducer`) ou um store local do Zustand para gerenciar o estado complexo do formulário.
- **Validação:** Zod será usado para definir os schemas de validação do formulário.
- **Templates:** Um sistema simples de templates (ex: funções que retornam strings de código) será usado para gerar o código de preview e o scaffolding inicial.

---

## 4. Fluxo de Interação

**Cenário: Usuário cria uma nova `Tool` a partir de um template.**

1.  O usuário clica no botão "➕ Novo Tool" na `Sidebar`.
2.  O `CapabilityEditorModal` é aberto com o título "Adicionar Tool".
3.  O usuário digita o nome da tool, ex: "getWeather". A validação em tempo real confirma que o nome é válido.
4.  O usuário seleciona o template "API Call" no dropdown "Template Base".
5.  Os campos de código (schema de entrada e handler) são preenchidos com um código de exemplo para fazer uma chamada de API.
6.  O painel de "Preview" é atualizado em tempo real, mostrando o código `server.registerTool(...)` correspondente.
7.  O usuário clica em "Criar e Editar".
8.  O modal é fechado, a nova `Tool` é adicionada ao estado do projeto (e à `Sidebar`), e a aplicação navega para a tela de edição completa daquela `Tool`.

---

## 5. Detalhes da Interface

### Estrutura Visual

```
┌─────────────────────────────────────────────┐
│  Adicionar Tool                          ✕  │
├─────────────────────────────────────────────┤
│                                             │
│  Nome *                                     │
│  [myNewTool_____________________________]  │
│  ✓ Nome válido                              │
│                                             │
│  Descrição *                                │
│  [Descrição da funcionalidade__________]   │
│  [_____________________________________ ]   │
│                                             │
│  Template Base                              │
│  [▼ Blank (vazio)                      ]   │
│     • Blank                                 │
│     • API Call                              │
│                                             │
│  ☑ Adicionar testes de exemplo             │
│                                             │
│  ┌─ Preview ───────────────────────────┐   │
│  │ export const myNewTool = {          │   │
│  │   name: 'myNewTool',                │   │
│  │   ...                               │   │
│  │ }                                   │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│                    [Cancelar] [Criar →]     │
└─────────────────────────────────────────────┘
```

---

## 6. Dados e Estado

- **Props de Entrada:**
  - `mode: 'create' | 'edit'`
  - `capabilityType: 'tool' | 'resource' | 'prompt'`
  - `capabilityData?: Tool | Resource | Prompt` (para o modo de edição)
  - `onClose: () => void`
  - `onSave: (data: any) => void`

- **Estado Interno do Formulário:**
  - Um objeto contendo os valores de todos os campos do formulário.
  - Um objeto `validationErrors` mapeando nomes de campos para suas mensagens de erro.

---

## 7. Dependências

- **Internas:** Componentes do Design System.
- **Externas:** `zod`, `@monaco-editor/react`.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Gerenciar o estado de um formulário dinâmico para três tipos de capabilities pode gerar lógica condicional complexa. | Criar subcomponentes de formulário para cada tipo de capability (ex: `ToolFormFields`, `ResourceFormFields`). O modal principal renderizará o subcomponente correto com base na prop `capabilityType`. |
| A geração do preview de código em tempo real pode ser lenta e impactar a performance da UI. | A lógica de geração de template deve ser mantida simples (ex: interpolação de strings). Aplicar debounce na atualização do preview para que não seja executada a cada tecla digitada nos campos. |

---

## 9. Timeline

- **Fase 1:** Implementar o layout do modal e o formulário para um tipo de capability (ex: Tool).
- **Fase 2:** Adicionar o suporte dinâmico para os outros tipos (Resource, Prompt).
- **Fase 3:** Implementar a validação em tempo real e o painel de preview de código.
- **Fase 4:** Implementar o sistema de templates.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Modal | Uma janela de diálogo que aparece sobre o conteúdo principal, exigindo interação do usuário. |
| Scaffolding | O processo de gerar código inicial ou uma estrutura de arquivos a partir de um template. |

# Specifications de Software: 13 - Sistema de Atalhos de Teclado

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica a implementação de um sistema de atalhos de teclado para fornecer aos usuários uma maneira rápida e eficiente de executar ações comuns na aplicação.

**Por quê?**  
Para melhorar a eficiência do fluxo de trabalho, aumentar a acessibilidade e proporcionar uma experiência de usuário mais profissional e próxima à de um IDE moderno.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Gerenciador de Atalhos (`ShortcutManager`)
- **Descrição:** Um sistema centralizado para registrar, manipular e customizar os atalhos de teclado em toda a aplicação.

- **Requisitos Funcionais:**
  - `[RF-001]` Deve ser capaz de registrar atalhos globais que funcionam em qualquer parte da aplicação.
  - `[RF-002]` Deve suportar diferentes "contextos", para que um mesmo atalho possa ter ações diferentes dependendo de onde o foco do usuário está (ex: editor de código vs. sidebar).
  - `[RF-003]` Deve fornecer uma interface (ex: nas Configurações) para que os usuários possam customizar os atalhos padrão.
  - `[RF-004]` Uma tela de ajuda ou "cheat sheet" com todos os atalhos disponíveis deve ser acessível através de um atalho específico (ex: `Ctrl+?`).
  - `[RF-005]` Deve fornecer um feedback visual sutil quando um atalho é invocado (ex: um breve "flash" no botão correspondente na UI).

- **Pronto quando:** O sistema de atalhos estiver implementado, com os principais atalhos globais e contextuais funcionando.

---

## 3. Requisitos Técnicos

- **Biblioteca:** Recomenda-se o uso de uma biblioteca dedicada como `hotkeys-js` ou `react-hotkeys-hook` para gerenciar a complexidade de eventos de teclado, teclas modificadoras e contextos.
- **Gerenciamento de Estado:** A configuração dos atalhos (padrão e customizados) será gerenciada em um local central (possivelmente um store do Zustand). O `ShortcutManager` irá ouvir os eventos de teclado e despachar as ações apropriadas.
- **Estrutura de Dados:** Um objeto ou `Map` definirá o mapeamento entre as combinações de teclas e os identificadores de ação.

---

## 4. Fluxo de Interação

**Cenário: Usuário salva o projeto via atalho.**

1.  O usuário fez alterações no projeto, que está no estado "dirty".
2.  Ele pressiona a combinação de teclas `Ctrl+S`.
3.  O `ShortcutManager`, que está ouvindo eventos globais de teclado, captura o evento.
4.  Ele previne a ação padrão do navegador (Salvar Página Como...).
5.  Ele busca a combinação `ctrl+s` em seu registro e encontra o identificador de ação `project.save`.
6.  Ele despacha a ação `project.save` para o store ou handler responsável.
7.  A lógica de salvamento do projeto é executada, e a UI é atualizada para refletir o estado "salvando".

---

## 5. Atalhos Padrão Definidos

- **Nota:** Conflitos de atalhos (como `ctrl+shift+t` duplicado) devem ser resolvidos. A lista abaixo sugere alternativas.

```typescript
// Proposta para: src/lib/keyboard-shortcuts.ts
export const shortcuts = {
  // Projeto
  'ctrl+n': { action: 'project.new', label: 'Novo Projeto' },
  'ctrl+o': { action: 'project.open', label: 'Abrir Projeto' },
  'ctrl+s': { action: 'project.save', label: 'Salvar Projeto' },
  'ctrl+shift+s': { action: 'project.saveAs', label: 'Salvar Como' },
  'ctrl+e': { action: 'project.export', label: 'Exportar Projeto' },
  
  // Capabilities
  'alt+t': { action: 'capability.addTool', label: 'Novo Tool' },
  'alt+r': { action: 'capability.addResource', label: 'Novo Resource' },
  'alt+p': { action: 'capability.addPrompt', label: 'Novo Prompt' },
  'ctrl+d': { action: 'capability.duplicate', label: 'Duplicar Item' },
  'delete': { action: 'capability.delete', label: 'Deletar Item' },
  
  // Editor (contextual)
  'ctrl+f': { action: 'editor.find', label: 'Buscar' },
  'ctrl+h': { action: 'editor.replace', label: 'Substituir' },
  'ctrl+/': { action: 'editor.toggleComment', label: 'Comentar/Descomentar' },
  'shift+alt+f': { action: 'editor.format', label: 'Formatar Código' },
  
  // Testes (contextual)
  'ctrl+t': { action: 'tests.run', label: 'Executar Teste' },
  'ctrl+shift+t': { action: 'tests.runAll', label: 'Executar Todos os Testes' },
  
  // Navegação
  'ctrl+b': { action: 'ui.toggleSidebar', label: 'Alternar Sidebar' },
  'ctrl+p': { action: 'ui.quickOpen', label: 'Busca Rápida de Arquivo' },
  'ctrl+shift+p': { action: 'ui.commandPalette', label: 'Paleta de Comandos' },
  
  // Ajuda
  'f1': { action: 'help.shortcuts', label: 'Ver Atalhos' },
  'ctrl+?': { action: 'help.shortcuts', label: 'Ver Atalhos' },
};
```

---

## 6. Dados e Estado

- A interface de customização de atalhos irá ler e escrever no estado global que armazena o mapeamento de atalhos do usuário.

---

## 7. Dependências Externas

- `hotkeys-js` ou `react-hotkeys-hook` (recomendado).

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Conflitos de atalhos entre si ou com atalhos do navegador/SO. | Manter um registro centralizado de todos os atalhos. A UI de customização deve validar e impedir a criação de atalhos conflitantes. A lista inicial deve ser cuidadosamente revisada. |
| Implementar atalhos contextuais (ex: `delete` que se comporta de forma diferente no editor vs. na sidebar) pode ser complexo. | A biblioteca escolhida deve suportar "escopos". A aplicação deve gerenciar um estado de contexto (ex: `'editor'`, `'sidebar'`) e habilitar/desabilitar escopos de atalhos com base no elemento focado na UI. |

---

## 9. Timeline

- **Fase 1:** Integrar a biblioteca de atalhos e implementar os atalhos globais (Salvar, Novo, etc.).
- **Fase 2:** Implementar os atalhos contextuais, principalmente para o editor de código.
- **Fase 3:** Criar o modal "Cheat Sheet" para exibir todos os atalhos.
- **Fase 4:** Construir a UI para customização de atalhos.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Contexto de Atalho | A parte específica da UI que está ativa, determinando qual conjunto de atalhos deve ser habilitado. |
| Cheat Sheet | Um guia de referência rápida, neste caso, um modal que exibe todos os atalhos de teclado disponíveis. |

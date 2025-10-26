# Specifications de Software: 03 - Layout Principal da Aplicação

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica a implementação do container principal da aplicação, que define as áreas estruturais para o cabeçalho (Header), a barra de navegação lateral (Sidebar) e a área de conteúdo principal (Main Content).

**Por quê?**  
Para criar uma estrutura de interface consistente, previsível e ergonômica para todas as telas da aplicação. Este layout é o esqueleto sobre o qual todas as outras funcionalidades e visualizações serão construídas.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Componente `MainLayout`
- **Descrição:** Um componente React que organiza as principais áreas da UI usando CSS Grid, fornecendo a estrutura visual para toda a aplicação.

- **Requisitos Funcionais:**
  - `[RF-001]` O layout deve ocupar 100% da largura e altura da viewport.
  - `[RF-002]` O layout deve ser responsivo, com uma largura mínima de tela de 1024px.
  - `[RF-003]` A Sidebar deve ser colapsável, alterando sua largura e o conteúdo exibido.
  - `[RF-004]` A área de conteúdo principal deve ter suporte para ser dividida em múltiplos painéis (split panels).
  - `[RF-005]` O estado do layout (ex: sidebar colapsada/expandida) deve ser persistido entre as sessões do usuário.

- **Requisitos Não-Funcionais:**
  - `[RNF-001]` As transições de layout, como colapsar/expandir a sidebar, devem ser suaves, com uma duração de aproximadamente 250ms.
  - `[RNF-002]` A estrutura principal do layout deve ser implementada com CSS Grid.
  - `[RNF-003]` O componente deve ter alta performance, com o objetivo de renderizar em menos de 16ms para garantir animações fluidas.

- **Pronto quando:** O componente `MainLayout` estiver implementado, atendendo a todos os requisitos, e pronto para encapsular o conteúdo das páginas.

---

## 3. Requisitos Técnicos

- **UI Framework:** React 18+ com TypeScript.
- **Estilização:** Tailwind CSS (para implementar o CSS Grid, transições e estilos).
- **Gerenciamento de Estado:** Zustand (para gerenciar e persistir o estado do layout, como `isSidebarCollapsed`).
- **Painéis Divisores:** Uma biblioteca como `react-resizable-panels` para atender ao requisito RF-004.

---

## 4. Fluxo de Interação

**Cenário: Usuário colapsa a Sidebar**

1. O usuário clica no botão de alternância (toggle) na Sidebar.
2. A store do Zustand atualiza o estado `isSidebarCollapsed` para `true`.
3. O componente `MainLayout` re-renderiza com base no novo estado.
4. O `grid-template-columns` do CSS Grid é alterado para refletir a nova largura da sidebar.
5. Uma transição de CSS anima suavemente a mudança de largura em 250ms.
6. O conteúdo da Sidebar se adapta, ocultando os rótulos de texto e exibindo apenas os ícones.
7. O novo estado (`isSidebarCollapsed: true`) é salvo no `localStorage` através de um middleware do Zustand para persistência.

---

## 5. Detalhes da Interface

### Layout Grid

```
┌─────────────────────────────────────────┐
│          Header (64px fixo)             │
├──────────┬──────────────────────────────┤
│          │                              │
│          │                              │
│ Sidebar  │        Main Content          │
│ (240px   │        (flex: 1)             │
│  ou      │                              │
│  48px)   │                              │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Estados da Sidebar
1.  **Expandida**: 240px de largura, exibindo ícones e rótulos de texto.
2.  **Colapsada**: 48px de largura, exibindo apenas os ícones.
3.  **Oculta (Opcional)**: 0px de largura. Pode ser implementada para telas com largura inferior a 1024px em uma fase futura.

---

## 6. Dados e Estado

- **Estado a ser gerenciado:**
  - `isSidebarCollapsed`: `boolean` - Armazenado no Zustand e persistido no `localStorage`.

---

## 7. Dependências Externas

- `zustand`: Para gerenciamento de estado global.
- `react-resizable-panels`: Biblioteca potencial para implementar os painéis divisores no conteúdo principal.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Animar `grid-template-columns` pode causar problemas de performance (repaints). | Investigar técnicas alternativas e mais performáticas. Uma abordagem comum é usar `transform: translateX()` no conteúdo da sidebar e animar a margem da área de conteúdo principal, em vez de animar a própria trilha do grid. |
| A biblioteca de painéis divisores (RF-004) pode entrar em conflito com o layout principal do CSS Grid. | Prototipar a integração o mais cedo possível. Escolher uma biblioteca moderna e garantir que ela possa ser contida dentro da célula do grid do conteúdo principal sem afetar o layout pai. |

---

## 9. Timeline

- **Fase 1:** Implementar o layout estático com Header e Sidebar expandida.
- **Fase 2:** Implementar a funcionalidade de colapsar a Sidebar, incluindo a persistência de estado e as animações.
- **Fase 3:** Pesquisar e integrar a solução de painéis divisores (split panels).

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Viewport | A área de conteúdo visível de uma página da web em um navegador. |
| CSS Grid | Um sistema de layout bidimensional para CSS, ideal para estruturar as principais áreas de uma página. |
| Persistência de Estado | A capacidade de salvar o estado da UI para que ele seja restaurado quando o usuário reabrir a aplicação. |

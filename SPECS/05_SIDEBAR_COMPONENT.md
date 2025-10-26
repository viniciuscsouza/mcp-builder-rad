# Specifications de Software: 05 - Componente Sidebar

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica o componente `Sidebar`, o painel de navegação principal e explorador de arquivos do projeto. Ele exibe a estrutura do projeto em um formato de árvore, permitindo ao usuário navegar e gerenciar as diferentes entidades como Tools, Resources e Prompts.

**Por quê?**  
Para fornecer uma visão hierárquica, clara e organizada do conteúdo do projeto, permitindo navegação rápida, gerenciamento de capabilities e acesso fácil a ações contextuais.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Componente `Sidebar`
- **Descrição:** Um painel lateral que apresenta a estrutura do projeto como uma árvore interativa, com funcionalidades de busca, adição e gerenciamento de itens.

- **Requisitos Funcionais:**
  - `[RF-001]` A estrutura em árvore deve permitir expandir e colapsar os nós pais (as seções principais).
  - `[RF-002]` Deve utilizar indicadores visuais, como ícones para tipos de item e badges para contagem.
  - `[RF-003]` Deve destacar visualmente o item atualmente selecionado na árvore.
  - `[RF-004]` Cada seção principal (Tools, Resources, etc.) deve ter um botão para adicionar um novo item (`➕ Novo...`).
  - `[RF-005]` Um menu de contexto (acessado via clique com o botão direito) deve estar disponível nos itens para ações como "Renomear", "Duplicar" e "Excluir".
  - `[RF-006]` (Futuro) Deve suportar arrastar e soltar (drag & drop) para reordenar itens dentro de uma mesma seção.
  - `[RF-007]` Deve incluir um campo de busca no topo para filtrar os itens da árvore em tempo real.
  - `[RF-008]` Os cabeçalhos de seção devem exibir um badge com a contagem de itens (ex: "Tools (3)").

- **Pronto quando:** O componente `Sidebar` estiver funcional, exibindo os dados do projeto e permitindo navegação, busca e adição de itens.

---

## 3. Requisitos Técnicos

- **Componentes:** Construído com os componentes do Design System (`Input`, `Icon`, etc.).
- **Gerenciamento de Estado:** Consumirá os dados do projeto (tools, resources) de um store global do Zustand. O estado da UI da sidebar (texto do filtro, nós expandidos) será gerenciado localmente ou em um slice do Zustand com persistência.
- **Debounce:** Utilizar uma função de debounce (ex: de `lodash.debounce`) para o campo de busca, com um tempo de 300ms.

---

## 4. Comportamento e Interação

-   **Expansão/Colapso:**
    -   O clique no ícone de seta (`▼`/`▶`) ao lado de uma seção alterna seu estado entre expandido e colapsado.
    -   O estado de expansão de cada nó deve ser persistido (ex: no `localStorage`) para ser restaurado entre sessões.

-   **Seleção de Item:**
    -   Um clique simples em um item (ex: `tool1`) o seleciona.
    -   O item selecionado recebe um destaque visual (ex: cor de fundo diferente).
    -   A seleção de um item dispara a navegação para a sua respectiva tela de edição na área de conteúdo principal.

-   **Busca/Filtro:**
    -   A digitação no campo de busca filtra a árvore em tempo real (com debounce de 300ms).
    -   Apenas os itens que correspondem ao texto do filtro são exibidos.
    -   Os nós pais que contêm resultados de busca são automaticamente expandidos.

---

## 5. Detalhes da Interface

### Estrutura Visual

```
┌─────────────────────┐
│ 🔍 [Buscar...]     │
├─────────────────────┤
│ ▼ 📄 Projeto        │
│   └─ Info           │
│   └─ Config         │
│ ▼ ⚡ Tools (2)      │
│   └─ ✓ tool1        │
│   └─ ✓ tool2        │
│   └─ ➕ Novo Tool   │
│ ▼ 📦 Resources (1)  │
│   └─ ✓ resource1    │
│   └─ ➕ Novo Res    │
│ ▶ 📝 Prompts (0)    │
│ ▶ 🧪 Tests          │
├─────────────────────┤
│ ⚙️ Settings         │
└─────────────────────┘
```

---

## 6. Dados e Estado

- **Estado Consumido (do store global):**
  - `project.tools: Tool[]`
  - `project.resources: Resource[]`
  - `project.prompts: Prompt[]`
  - `activeItemId: string | null`

- **Estado Local (ou em slice persistido do Zustand):**
  - `filterQuery: string`
  - `expandedNodes: Set<string>` (Um conjunto de IDs dos nós expandidos)

---

## 7. Dependências

- **Internas:** Componentes do Design System.
- **Externas:** `zustand`, `lucide-react`, `lodash.debounce`.
- **Potencial:** Uma biblioteca de árvore virtualizada como `react-arborist` pode ser considerada no futuro para performance e para a implementação do drag & drop.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Construir um componente de árvore performático do zero, com filtro, D&D e virtualização, é complexo. | Iniciar com uma implementação simples. Se a performance se tornar um problema com muitos itens, ou se o D&D for priorizado, avaliar a integração de uma biblioteca de terceiros especializada. |
| O gerenciamento de estado da árvore (seleção, expansão, filtro) pode se tornar complicado. | Isolar claramente o estado global (dados do projeto) do estado local da UI (filtro, nós expandidos). Usar Zustand para o estado global e `useState` ou um slice separado do Zustand para o estado da UI que precisa de persistência. |

---

## 9. Timeline

- **Fase 1:** Implementar a exibição estática da árvore com os dados do projeto.
- **Fase 2:** Implementar a funcionalidade de expandir/colapsar com persistência de estado e a seleção de itens.
- **Fase 3:** Implementar a funcionalidade de busca e filtro com debounce.
- **Fase 4:** Implementar os botões de "Adicionar Novo" e o menu de contexto.
- **Fase 5 (Futuro):** Implementar o drag & drop para reordenação.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Tree View | Um componente de UI que exibe dados hierárquicos em um formato de árvore. |
| Debounce | Técnica para limitar a frequência com que uma função é executada, útil para campos de busca para evitar execuções a cada tecla pressionada. |
| Virtualização | Técnica de renderização que renderiza apenas os itens visíveis em uma lista longa, melhorando a performance. |

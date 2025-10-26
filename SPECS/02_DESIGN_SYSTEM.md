# Specifications de Software: 02 - Design System

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica a criação e implementação do Design System para a aplicação MCP Server Builder RAD. O objetivo é estabelecer um conjunto de padrões visuais, componentes reutilizáveis e diretrizes de interface para garantir consistência e qualidade em toda a experiência do usuário.

**Por quê?**  
Para garantir uma interface de usuário coesa, acessível e profissional. Um Design System centralizado acelera o desenvolvimento, promove a reutilização de código, reduz a dívida técnica de design e simplifica a manutenção futura.

**Público-alvo:**  
Equipe de desenvolvimento e design.

---

## 2. Componentes do Design System

### Fase 1: Fundações (Tokens e Átomos)

#### 1.1. Definição de Design Tokens
- **Descrição:** Estabelecer as variáveis fundamentais e primitivas do estilo visual. Serão a base para todos os outros componentes.
- **Como funciona:**
  1.  **Paleta de Cores:** Definir cores primárias (ação), secundárias (suporte), neutras (texto, fundos), e semânticas (sucesso, erro, aviso).
  2.  **Escala Tipográfica:** Definir tamanhos de fonte, pesos e alturas de linha para títulos, corpo de texto e legendas.
  3.  **Unidades de Espaçamento:** Definir uma escala para margens, paddings e gaps (ex: 4px, 8px, 12px, 16px, ...).
  4.  **Outros Tokens:** Definir raios de borda (arredondamento) e sombras (box-shadows).
  5.  **Implementação:** Configurar todos os tokens no arquivo `tailwind.config.js` para uso global via classes do Tailwind CSS.
- **Pronto quando:** O arquivo `tailwind.config.js` estiver configurado com todos os design tokens do projeto.

#### 1.2. Componentes de Base (Átomos)
- **Descrição:** Criar os componentes de UI mais básicos e indivisíveis, que servirão como blocos de construção.
- **Como funciona:**
  1.  **`Button`:** Componente de botão com variantes (primário, secundário, fantasma), tamanhos e estados (padrão, hover, focado, desabilitado).
  2.  **`Input`:** Componente de campo de texto com estados e variantes (ex: com ícone).
  3.  **`Label`:** Componente de rótulo, associado a inputs para acessibilidade.
  4.  **`Icon`:** Componente wrapper para `lucide-react` para padronizar tamanhos e estilos.
  5.  **`Card`:** Componente de contêiner de conteúdo básico com padding e sombra definidos.
- **Pronto quando:** Cada componente de base for um componente React reutilizável, estilizado com Tailwind e com props bem definidas.

### Fase 2: Componentes Compostos e Layouts

#### 2.1. Componentes Compostos (Moléculas)
- **Descrição:** Combinar componentes de base para formar unidades funcionais mais complexas.
- **Como funciona:**
  1.  **`FormField`:** Agrupa `Label`, `Input` e espaço para mensagens de erro.
  2.  **`Select` / `Dropdown`:** Componente de seleção de opções.
  3.  **`Modal`:** Componente para diálogos, confirmações e pop-ups.
  4.  **`Sidebar`:** Componente de navegação lateral.
  5.  **`Header`:** Componente de cabeçalho da aplicação.
- **Pronto quando:** Cada componente composto for criado pela combinação de átomos e estiver pronto para uso nas páginas.

#### 2.2. Estrutura e Layouts (Organismos)
- **Descrição:** Definir as principais estruturas de layout da aplicação.
- **Como funciona:**
  1.  **`MainLayout`:** Componente principal que organiza a `Sidebar` e a área de conteúdo principal.
  2.  **`PageLayout`:** Componente para padronizar o layout de uma página, incluindo título e área de ações.
  3.  **`TwoColumnLayout`:** Layout que divide a área de conteúdo em duas colunas (ex: para lista e detalhe).
- **Pronto quando:** Os principais layouts da aplicação estiverem definidos como componentes React, prontos para receber o conteúdo das páginas.

---

## 3. Requisitos Técnicos

- **UI Framework:** React 18+ com TypeScript.
- **Estilização:** Tailwind CSS.
- **Ícones:** `lucide-react`.
- **Documentação (Recomendado):** Considerar o uso do Storybook para documentar e visualizar os componentes de forma isolada.

---

## 4. Fluxo de Uso

**Cenário: Desenvolvedor cria um novo formulário.**

1. O desenvolvedor importa os componentes `FormField`, `Input` e `Button` da biblioteca do Design System.
2. Ele compõe o formulário usando esses componentes, passando props para customizar rótulos, variantes e comportamentos.
3. O formulário resultante é automaticamente estilizado com os tokens (cores, espaçamentos) do projeto, sem a necessidade de CSS customizado.
4. O resultado é um formulário visualmente consistente com o restante da aplicação.

---

## 5. Interface

Este documento define os blocos de construção que serão usados para criar todas as telas da aplicação, como:
- Tela de Listagem de Projetos
- Tela do Dashboard do Projeto
- Tela de Edição de Tool/Resource/Prompt

---

## 6. Dados

- N/A. O Design System lida com a apresentação e não com a persistência de dados.

---

## 7. Dependências Externas

- `tailwindcss`: Framework de CSS utility-first.
- `lucide-react`: Biblioteca de ícones.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Componentes muito rígidos, não permitindo customizações necessárias. | Projetar componentes com uma API flexível, permitindo a passagem de props para overrides (ex: `className`) enquanto se mantêm padrões sensatos. |
| O Design System fica desatualizado ou os desenvolvedores criam componentes "one-off", gerando inconsistência. | Manter os componentes fáceis de encontrar e usar. Uma boa documentação (Storybook) e organização de arquivos são essenciais. Reforçar o uso através de code reviews. |

---

## 9. Timeline

- **Fase 1:** Definição dos Design Tokens e criação dos Componentes de Base (Átomos).
- **Fase 2:** Criação dos Componentes Compostos (Moléculas) e Layouts.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Design Tokens | Primitivas de design (cores, fontes, espaçamentos) armazenadas como variáveis para reutilização. |
| Átomo | O menor componente de UI indivisível (ex: Botão, Input). |
| Molécula | Uma combinação de átomos que forma uma unidade funcional (ex: um campo de formulário com rótulo e input). |

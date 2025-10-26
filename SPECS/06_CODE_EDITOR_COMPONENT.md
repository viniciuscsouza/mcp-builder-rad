# Specifications de Software: 06 - Componente Editor de Código

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica o componente `CodeEditor`, que será a interface principal para os usuários escreverem e editarem o código TypeScript para as `Tools`, `Resources` e `Prompts` de seus servidores MCP. Será um editor de código completo, baseado no Monaco Editor, o motor do VS Code.

**Por quê?**  
Para fornecer uma experiência de edição de código familiar, poderosa e amigável ao desenvolvedor diretamente na aplicação. Isso é crucial para permitir que os usuários escrevam lógicas complexas de forma eficiente, sem a necessidade de alternar para um IDE externo.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Componente `CodeEditor`
- **Descrição:** Um componente de editor de código embarcado, baseado no Monaco, otimizado para a escrita de TypeScript no contexto da aplicação.

- **Requisitos Funcionais:**
  - `[RF-001]` Deve fornecer realce de sintaxe (syntax highlighting) preciso para TypeScript/TSX.
  - `[RF-002]` Deve oferecer autocompletar no estilo IntelliSense, incluindo sugestões para o SDK do MCP e outras APIs.
  - `[RF-003]` Deve realizar validação de código em tempo real, exibindo erros de digitação e de tipo (linting & type-checking).
  - `[RF-004]` Deve suportar formatação de código automática (ao salvar ou sob demanda) usando as regras do Prettier.
  - `[RF-005]` Deve ter suporte a snippets de código para acelerar a escrita de padrões comuns.
  - `[RF-006]` Deve exibir um "minimapa" para navegação rápida em arquivos longos.
  - `[RF-007]` Deve exibir números de linha e uma calha (gutter) lateral.
  - `[RF-008]` Deve ter um modo de visualização de diferenças (diff view) para comparar alterações no código.
  - `[RF-009]` Deve suportar as ações de desfazer/refazer (`Ctrl+Z`/`Ctrl+Y`).
  - `[RF-010]` Deve suportar a funcionalidade de buscar e substituir (`Ctrl+F`/`Ctrl+H`).

- **Requisitos Não-Funcionais:**
  - `[RNF-001]` Deve ser performático, com o objetivo de renderizar um arquivo de 1000 linhas em menos de 50ms.
  - `[RNF-002]` A validação em tempo real deve usar debounce de 500ms para evitar processamento excessivo durante a digitação.
  - `[RNF-003]` Um mecanismo de auto-save deve ser acionado 2 segundos após a última alteração no código.
  - `[RNF-004]` Deve suportar ligaduras de fonte (font ligatures), como na fonte Fira Code.

- **Pronto quando:** O componente `CodeEditor` estiver integrado e com todas as funcionalidades principais implementadas e testadas.

---

## 3. Requisitos Técnicos

- **Motor Principal:** Monaco Editor.
- **Wrapper React:** Biblioteca `@monaco-editor/react` para simplificar a integração com o React.
- **Integração TypeScript:** O worker de TypeScript do Monaco será configurado com as opções do compilador e as definições de tipo (`.d.ts`) do SDK do MCP para fornecer IntelliSense preciso.
- **Formatação:** Integração com a biblioteca Prettier para formatação de código.

---

## 4. Fluxo de Interação

**Cenário: Usuário edita o handler de uma `Tool`**

1.  O usuário seleciona uma `Tool` na `Sidebar`, e o `CodeEditor` é carregado com o código do handler.
2.  O usuário começa a digitar. O realce de sintaxe é aplicado instantaneamente.
3.  Ao digitar `mcpServer.`, um pop-up de IntelliSense sugere os métodos disponíveis.
4.  O usuário escreve um código inválido. Após 500ms, um sublinhado vermelho aparece sob o erro. Ao passar o mouse, uma tooltip exibe a mensagem de erro do TypeScript.
5.  O usuário para de digitar. Após 2 segundos, o auto-save é acionado, atualizando o estado do código no store global.
6.  O usuário pressiona um atalho (ex: `Ctrl+Shift+F`) para formatar o documento, e o código é reformatado pelo Prettier.

---

## 5. Detalhes da Interface

O componente será visualmente idêntico ao editor do VS Code, incluindo:
- Área principal de edição de texto.
- Calha (gutter) à esquerda para números de linha e ícones de erro/aviso.
- Minimapa à direita para navegação rápida.
- Barras de rolagem.
- Widget de busca/substituição integrado.

---

## 6. Dados e Estado

- **Props de Entrada:**
  - `code: string`: O conteúdo de código a ser exibido.
  - `language: 'typescript'`: O modo de linguagem.
  - `onChange: (newCode: string) => void`: Callback acionado quando o conteúdo muda.
  - `isReadOnly?: boolean`: Para desabilitar a edição.

- **Estado Interno:** O Monaco gerencia seu próprio estado complexo (posição do cursor, histórico de undo/redo, etc.).

---

## 7. Dependências Externas

- `monaco-editor`: O motor do editor.
- `@monaco-editor/react`: O wrapper para React.
- `prettier`: A biblioteca para formatação de código.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Configurar o IntelliSense do Monaco com tipos customizados (para o SDK do MCP) é complexo. | Pesquisar e implementar a API `languages.typescript.typescriptDefaults.addExtraLib` do Monaco. Carregar os arquivos de definição de tipo (`.d.ts`) das dependências do projeto na instância do editor. |
| O tamanho do bundle do Monaco Editor é grande e pode impactar o tempo de carregamento da aplicação. | Utilizar um plugin de bundler (como `monaco-editor-webpack-plugin` ou equivalente para Vite) para fazer tree-shaking e incluir apenas as linguagens e funcionalidades necessárias (essencialmente, TypeScript). |
| A integração da validação em tempo real pode ser complexa e impactar a performance. | Utilizar Web Workers para rodar o processo de validação do TypeScript em uma thread separada, evitando o bloqueio da UI principal. |

---

## 9. Timeline

- **Fase 1:** Integração básica do editor com realce de sintaxe.
- **Fase 2:** Configuração do worker de TypeScript para IntelliSense completo.
- **Fase 3:** Implementação da validação em tempo real (diagnósticos).
- **Fase 4:** Integração do Prettier e implementação das demais funcionalidades (minimapa, etc.).

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Monaco Editor | O editor de código open-source que alimenta o VS Code. |
| IntelliSense | Termo da Microsoft para recursos de autocompletar código, incluindo sugestões de métodos e parâmetros. |
| Gutter (Calha) | A margem à esquerda do editor que exibe números de linha e outros glifos. |
| Ligaduras de Fonte | Caracteres especiais em uma fonte que combinam uma sequência de caracteres (como `=>`) em um único símbolo. |

# Specifications de Software: 09 - Editor de Schema

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica o `SchemaEditor`, um componente para criar e editar visualmente os JSON Schemas que definem a estrutura de entrada (`inputSchema`) das `Tools` e outras capabilities do MCP.

**Por quê?**  
Para simplificar a definição de estruturas de entrada complexas, tornando o processo acessível para usuários que não são especialistas na sintaxe JSON Schema. O editor fornece uma interface de formulário amigável que gera o código do schema correspondente, reduzindo erros e acelerando o desenvolvimento.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Componente `SchemaEditor`
- **Descrição:** Um editor com modo duplo que permite aos usuários construir um JSON Schema através de um construtor de formulários visual ou editando diretamente o código JSON.

- **Requisitos Funcionais:**
  - `[RF-001]` Deve ter um "Modo Visual" que funciona como um construtor de formulários, onde propriedades podem ser adicionadas, editadas e reordenadas.
  - `[RF-002]` Deve ter um "Modo Código" com um editor JSON (Monaco) para manipulação direta do schema.
  - `[RF-003]` Deve permitir a alternância entre os modos Visual e Código, com as alterações em um modo sendo refletidas no outro.
  - `[RF-004]` Deve permitir adicionar e remover propriedades do schema.
  - `[RF-005]` Deve suportar os tipos básicos do JSON Schema: `string`, `number`, `boolean`, `array`, e `object` (propriedades aninhadas).
  - `[RF-006]` Deve fornecer um controle (ex: checkbox) para marcar campos como `required`.
  - `[RF-007]` Deve validar o schema em tempo real em ambos os modos, destacando erros de sintaxe ou estrutura.
  - `[RF-008]` Deve exibir um preview ao vivo do JSON Schema final gerado.
  - `[RF-009]` Deve suportar a importação de um JSON Schema existente para popular o editor.
  - `[RF-010]` Deve oferecer uma seleção de templates de schemas comuns (ex: "Busca Simples", "Paginação").

- **Pronto quando:** O componente `SchemaEditor` estiver funcional, permitindo a criação e edição de schemas em ambos os modos com sincronização de estado.

---

## 3. Requisitos Técnicos

- **Componentes:** Construído com os componentes do Design System.
- **Editor de Código:** O "Modo Código" utilizará o componente `CodeEditor` (Monaco) configurado para a linguagem JSON.
- **Gerenciamento de Estado:** Gerenciará seu estado internamente. Receberá um schema inicial via props e notificará as alterações através de um callback `onChange`.
- **Drag and Drop:** Uma biblioteca como `dnd-kit` pode ser usada para a funcionalidade de reordenar propriedades no modo visual.

---

## 4. Fluxo de Interação

**Cenário: Usuário adiciona um novo campo "page" ao schema.**

1.  O usuário está no "Modo Visual" do `SchemaEditor`.
2.  Ele clica no botão "[+ Add]". Uma nova seção de propriedade em branco aparece.
3.  Ele preenche o nome como "page", seleciona o tipo "number" e adiciona uma descrição.
4.  O painel de "Preview JSON Schema" é atualizado em tempo real, mostrando a nova propriedade "page".
5.  O usuário clica no botão para alternar para o "Modo Código".
6.  A visão muda para o editor Monaco, que agora exibe o texto JSON completo, incluindo a propriedade "page" recém-adicionada.

---

## 5. Detalhes da Interface

### Estrutura Visual

```
┌─────────────────────────────────────────────┐
│ Schema Editor               [Visual][Code]  │
├─────────────────────────────────────────────┤
│                                             │
│ Propriedades                     [+ Add]    │
│                                             │
│ ┌─ query ────────────────────────────────┐ │
│ │ Nome: [query________________]          │ │
│ │ Tipo: [▼ string             ]          │ │
│ │ Descrição: [Termo de busca_______]     │ │
│ │ ☑ Required                             │ │
│ │                          [🗑️] [↑] [↓]  │ │
│ └────────────────────────────────────────┘ │
│                                             │
│ ┌─ limit ────────────────────────────────┐ │
│ │ Nome: [limit________________]          │ │
│ │ Tipo: [▼ number             ]          │ │
│ │ ☐ Required                             │ │
│ │ Default: [10_______________]           │ │
│ │ Min: [1___] Max: [100___]              │ │
│ │                          [🗑️] [↑] [↓]  │ │
│ └────────────────────────────────────────┘ │
│                                             │
│ ┌─ Preview JSON Schema ─────────────────┐  │
│ │ { ... }                               │  │
│ └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 6. Dados e Estado

- **Props de Entrada:**
  - `initialSchema: object`: O objeto JSON Schema inicial para carregar no editor.
  - `onChange: (newSchema: object) => void`: Callback acionado quando um schema válido é modificado.

- **Estado Interno:**
  - `mode: 'visual' | 'code'`
  - `properties: Property[]`: Um array de objetos representando as propriedades no modo visual.
  - `jsonText: string`: O conteúdo de texto para o modo de código.

---

## 7. Dependências

- **Internas:** Componentes do Design System, `CodeEditor`.
- **Externas:** `@monaco-editor/react`, `dnd-kit` (potencial).

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Manter o estado do "Modo Visual" e do "Modo Código" perfeitamente sincronizados é complexo. | Usar uma única fonte da verdade. No modo visual, as alterações atualizam uma estrutura de dados interna que gera o texto JSON. No modo código, o texto é a fonte da verdade. A troca entre os modos requer uma etapa de "parse" (código para visual) ou "generate" (visual para código), com validação. |
| O construtor de formulários visual pode se tornar muito complexo ao tentar suportar todos os recursos do JSON Schema (ex: `oneOf`, `allOf`). | Começar suportando os recursos mais comuns (tipos primitivos, `required`, `description`, objetos simples). Adicionar suporte a recursos avançados de forma iterativa, com base na necessidade. |

---

## 9. Timeline

- **Fase 1:** Implementar o modo visual para tipos primitivos e o preview de JSON.
- **Fase 2:** Implementar o modo código e a alternância entre os modos.
- **Fase 3:** Adicionar suporte a tipos complexos como `object` e `array`.
- **Fase 4:** Implementar reordenação, templates e importação.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| JSON Schema | Um padrão de vocabulário que permite anotar e validar documentos JSON. |
| Form Builder | Uma interface gráfica que permite aos usuários construir um formulário (e, neste caso, o schema subjacente) visualmente. |

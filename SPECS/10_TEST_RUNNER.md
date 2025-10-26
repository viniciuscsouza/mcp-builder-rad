# Specifications de Software: 10 - Interface de Testes

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica a `TestRunner`, uma interface dedicada para criar, editar, executar e revisar testes para as capabilities do projeto. Ela integra um fluxo de Test-Driven Development (TDD) diretamente na aplicação.

**Por quê?**  
Para permitir que os usuários validem o comportamento de suas Tools, Resources e Prompts de forma fácil e eficiente, garantindo maior qualidade e confiabilidade nos servidores MCP gerados, sem sair do ambiente de desenvolvimento.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Interface de Testes (`TestRunner`)
- **Descrição:** Uma visão completa para o gerenciamento do ciclo de vida dos testes, utilizando Vitest como motor. A interface inclui um editor de código, uma lista de casos de teste e um console para visualização dos resultados.

- **Requisitos Funcionais:**
  - `[RF-001]` Deve fornecer um editor de código (`CodeEditor`) para escrever e editar os arquivos de teste, usando a sintaxe do Vitest/Jest.
  - `[RF-002]` Deve permitir a execução de testes individualmente ou de todo o conjunto de testes de uma capability (`Run All`).
  - `[RF-003]` Deve fornecer uma representação visual clara do resultado de cada teste (passou, falhou, não executado).
  - `[RF-004]` Deve exibir logs detalhados e saídas de console da execução dos testes.
  - `[RF-005]` (Opcional) Deve ter a capacidade de gerar e exibir um relatório de cobertura de código (coverage).
  - `[RF-006]` Deve oferecer templates para casos de teste comuns (ex: "entrada válida", "parâmetro ausente", "tratamento de erro").
  - `[RF-007]` Deve fornecer um mecanismo para "mockar" dependências externas (ex: chamadas de API, acesso a banco de dados) no ambiente de teste.
  - `[RF-008]` (Opcional) Deve suportar "asserções visuais", permitindo que usuários construam `expects` através da UI.

- **Pronto quando:** A interface de testes estiver funcional, permitindo ao usuário criar, executar e ver o resultado dos testes para uma capability.

---

## 3. Requisitos Técnicos

- **Framework de Teste:** Vitest (conforme definido no `README.md` do projeto).
- **Execução de Testes:** Os testes serão executados em um processo filho através de um comando de shell (ex: `npx vitest --run ...`).
- **Análise de Saída:** A saída do processo do Vitest será analisada para exibir os resultados na UI. O uso do reporter JSON do Vitest (`--reporter=json`) é preferível para obter uma saída estruturada e estável.
- **Componentes:** A interface será construída com os componentes do Design System, incluindo o `CodeEditor`.

---

## 4. Fluxo de Interação

**Cenário: Usuário executa um teste individual.**

1.  O usuário navega para a aba "Testes" de uma `Tool`.
2.  A lista de testes existentes para essa `Tool` é exibida.
3.  O usuário clica no botão "▶" (Executar) ao lado de um caso de teste.
4.  A aplicação gera o arquivo de teste correspondente no disco.
5.  Um comando de shell é executado para rodar o teste específico (ex: `npx vitest myTool.test.ts -t "nome do teste"`).
6.  A UI exibe um indicador de "executando" ao lado do teste.
7.  Ao final da execução, a saída do Vitest é capturada e analisada.
8.  A UI é atualizada para mostrar o resultado (ex: "✓ Passou"), o tempo de execução e os logs no painel do console.

---

## 5. Detalhes da Interface

### Estrutura Visual

```
┌─────────────────────────────────────────────┐
│ Testes - searchDatabase        [▶ Run All]  │
├─────────────────────────────────────────────┤
│ Tests (3)                      [+ New Test] │
├─────────────────────────────────────────────┤
│ ✓ Deve retornar resultados      [▶] [✎] [🗑] │
│   Última execução: 2s atrás (45ms)          │
├─────────────────────────────────────────────┤
│ ✗ Deve validar parâmetros       [▶] [✎] [🗑] │
│   Error: Expected string, got number        │
│   Última execução: 1min atrás (23ms)        │
├─────────────────────────────────────────────┤
│ ○ Deve tratar erros de DB       [▶] [✎] [🗑] │
│   Não executado                             │
├─────────────────────────────────────────────┤
│ ┌─ Editor de Teste ──────────────────────┐ │
│ │ it('deve retornar...', async () => {   │ │
│ │   ...                                 │ │
│ │ });                                   │ │
│ └───────────────────────────────────────┘ │
│ ┌─ Console / Logs ───────────────────────┐ │
│ │ [INFO] Running test...                 │ │
│ │ [SUCCESS] Test passed in 45ms          │ │
│ └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 6. Dados e Estado

- **Props de Entrada:**
  - `capability: Tool | Resource | Prompt`: A capability que está sendo testada.
- **Estado Interno:**
  - `tests: Test[]`: Um array de objetos representando os casos de teste, incluindo seu código, status e último resultado.
  - `selectedTest: Test | null`: O teste atualmente carregado no editor.
  - `consoleOutput: string`: Os logs da última execução de teste.

---

## 7. Dependências

- **Internas:** Componentes do Design System, `CodeEditor`.
- **Externas:** `vitest`.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Analisar a saída de texto (stdout) do Vitest é frágil e pode quebrar se o formato mudar. | Utilizar o reporter JSON do Vitest (`--reporter=json`). Isso fornece uma saída de dados estruturada e estável, que é muito mais robusta para ser analisada do que texto puro. |
| Configurar um ambiente de mocking (RF-007) que seja fácil para o usuário pode ser desafiador. | Alavancar as funcionalidades de mocking nativas do Vitest (`vi.mock`). Fornecer templates de teste que já incluam exemplos de mocks para cenários comuns (ex: mock de `fetch` para chamadas de API). |

---

## 9. Timeline

- **Fase 1:** Implementar o layout da UI com a lista de testes, editor e console.
- **Fase 2:** Implementar a lógica para executar um único teste e exibir o resultado e os logs.
- **Fase 3:** Implementar a funcionalidade "Run All" e a criação/deleção de testes.
- **Fase 4:** Implementar os templates de teste e o suporte a mocking.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Test Runner | Uma ferramenta de software que executa testes automatizados e relata seus resultados. |
| Assertion | Uma declaração em um teste que verifica se uma determinada condição é verdadeira (ex: `expect(valor).toBe(true)`). |
| Mocking | O ato de substituir dependências reais (como APIs) por objetos falsos que simulam seu comportamento, a fim de isolar o código sob teste. |

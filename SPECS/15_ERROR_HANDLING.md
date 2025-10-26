# Specifications de Software: 15 - Validação e Tratamento de Erros

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica a estratégia geral da aplicação para validação de dados, tratamento de exceções, reporte de erros e feedback ao usuário.

**Por quê?**  
Para garantir a estabilidade da aplicação, a integridade dos dados e uma experiência de usuário previsível e amigável. Um sistema robusto de tratamento de erros previne crashes, ajuda os usuários a corrigirem seus próprios erros e fornece aos desenvolvedores informações claras para depuração.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Estratégias e Camadas

### Estratégia 1: Validação de Formulários (Client-Side)
- **Descrição:** Validação em tempo real de todos os inputs do usuário em formulários (modais, painéis de propriedades, etc.).
- **Implementação:**
  1.  **Schemas Zod:** Para cada formulário, será definido um schema Zod que descreve a forma e as regras dos dados.
  2.  **Integração:** A biblioteca `react-hook-form` será usada em conjunto com `@hookform/resolvers/zod` para automatizar o processo de validação.
  3.  **Feedback Visual:** Erros serão exibidos por campo, com mensagens claras e destaque visual (ex: borda vermelha) nos campos inválidos. O botão de submissão ficará desabilitado enquanto o formulário for inválido.

### Estratégia 2: Validação de Código (Editor)
- **Descrição:** Validação do código TypeScript escrito pelo usuário no `CodeEditor`.
- **Implementação:**
  1.  **Análise Sintática e de Tipos:** O Monaco Editor, com seu worker de TypeScript configurado, fornecerá análise em tempo real, identificando erros de sintaxe e de tipo.
  2.  **Feedback Visual:** Erros e avisos serão exibidos como sublinhados ondulados (squiggles) diretamente no editor, com mensagens detalhadas disponíveis ao passar o mouse.

### Estratégia 3: Tratamento de Erros de Ações (Exceptions)
- **Descrição:** Uma estratégia para capturar, tratar e reportar erros que ocorrem durante a execução de ações da aplicação (ex: salvar projeto, rodar testes).
- **Implementação:**
  1.  **Blocos `try/catch`:** Todas as operações assíncronas (acesso a banco de dados, sistema de arquivos) serão envolvidas em blocos `try/catch`.
  2.  **Notificações ao Usuário:** Em caso de erro, o bloco `catch` irá disparar uma notificação (toast) do tipo `error` com uma mensagem amigável (ex: "Falha ao salvar o projeto").
  3.  **Logging para Desenvolvedores:** O objeto de erro completo, com seu stack trace, será logado no console (`console.error`) para facilitar a depuração.

### Estratégia 4: Limites de Erro (Error Boundaries)
- **Descrição:** Um mecanismo de segurança para impedir que uma árvore de componentes inteira seja desmontada em caso de um erro inesperado de renderização.
- **Implementação:**
  1.  Um componente genérico `ErrorBoundary` será criado.
  2.  Este componente usará `getDerivedStateFromError` para capturar o erro e renderizar uma UI de fallback.
  3.  As seções principais da aplicação (`Sidebar`, `MainContent`, etc.) serão envolvidas por este `ErrorBoundary`.

---

## 3. Requisitos Técnicos

- **Validação de Dados:** Zod.
- **Validação de Formulários:** `react-hook-form` e `@hookform/resolvers/zod`.
- **Validação de Código:** Monaco Editor.
- **Feedback de Erro:** Sistema de Notificações (Toasts) especificado em `SPECS/11`.
- **Error Boundaries:** API nativa do React para Error Boundaries.

---

## 4. Fluxo de Erro

**Cenário: Usuário insere um nome inválido para uma `Tool`.**

1.  No modal de criação de `Tool`, o usuário digita "minha tool" (com espaço) no campo "Nome".
2.  O schema Zod do formulário, que exige um nome sem espaços, falha na validação.
3.  Uma mensagem de erro "Nome inválido. Use apenas letras, números e _" aparece abaixo do campo.
4.  A borda do campo "Nome" fica vermelha e o botão "Criar" permanece desabilitado.

**Cenário: Uma operação de acesso ao sistema de arquivos falha.**

1.  O usuário clica em "Exportar Projeto".
2.  A ação `exportProject` é chamada e tenta escrever um arquivo no disco.
3.  A operação de escrita, dentro de um bloco `try`, falha (ex: permissão negada).
4.  O bloco `catch` é executado.
5.  Ele chama `console.error('File system error:', errorObject)`.
6.  Ele chama `notifier.error('Não foi possível exportar o projeto. Verifique as permissões do diretório.')`.

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| Erros não capturados (uncaught exceptions) ainda podem ocorrer e travar a aplicação. | Implementar um handler global de erros (`window.onerror`) no nível mais alto da aplicação. Este handler deve logar o erro e exibir uma mensagem genérica para o usuário, sugerindo recarregar a aplicação. |
| Mensagens de erro muito técnicas podem confundir o usuário final. | Mapear erros técnicos conhecidos para mensagens amigáveis. A mensagem para o usuário deve explicar o problema em termos simples e sugerir uma ação. O erro técnico completo deve ser logado no console para o desenvolvedor. |

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Zod | Uma biblioteca de declaração e validação de schemas para TypeScript, usada para garantir a integridade dos dados. |
| Error Boundary | Um componente React que captura erros de JavaScript em sua árvore de componentes filhos, registra os erros e exibe uma UI de fallback em vez de travar a aplicação. |

# Specifications de Software: 11 - Sistema de Notificações (Toasts)

**Projeto:** MCP Server Builder RAD  
**Versão:** 1.0  
**Data:** 26/10/2025  
**Autor:** Gemini

---

## 1. Visão Geral

**O que é?**  
Este documento especifica a implementação de um sistema de notificações global, comumente conhecido como "toasts". Este sistema fornecerá feedback visual não-intrusivo ao usuário em resposta a eventos e ações na aplicação.

**Por quê?**  
Para informar os usuários sobre o resultado de suas ações (ex: "Projeto salvo com sucesso", "Falha na exportação") sem interromper seu fluxo de trabalho com diálogos bloqueantes. É uma parte crucial de uma experiência de usuário moderna e responsiva.

**Público-alvo:**  
Equipe de desenvolvimento.

---

## 2. Funcionalidades e Requisitos

### Funcionalidade: Sistema de Notificações
- **Descrição:** Um sistema para exibir mensagens temporárias e não-bloqueantes (toasts) para fornecer feedback sobre eventos da aplicação.

- **Requisitos Funcionais:**
  - `[RF-001]` Deve suportar múltiplos tipos de notificação, cada um com um estilo visual distinto (ícone e cor): `success`, `error`, `warning`, `info`.
  - `[RF-002]` As notificações devem desaparecer automaticamente após um tempo configurável (padrão: 5 segundos), com a opção de desabilitar o auto-dismiss.
  - `[RF-003]` Deve suportar a inclusão de botões de ação em uma notificação, como "Desfazer" após uma exclusão ou "Tentar Novamente" após uma falha.
  - `[RF-004]` Deve gerenciar uma fila, exibindo múltiplas notificações empilhadas verticalmente se forem acionadas em rápida sucessão.
  - `[RF-005]` A posição do contêiner de notificações na tela deve ser configurável (padrão: canto superior direito).
  - `[RF-006]` Notificações importantes (ex: erros críticos) devem persistir na tela até serem dispensadas manualmente pelo usuário.

- **Pronto quando:** O sistema de notificações estiver integrado e for capaz de exibir todos os tipos de toasts, incluindo aqueles com ações.

---

## 3. Requisitos Técnicos

- **Biblioteca:** Recomenda-se o uso de uma biblioteca "headless" como `react-hot-toast`. Ela gerencia a lógica de enfileiramento, estado e animações, permitindo a estilização completa dos toasts com os componentes do nosso Design System.
- **Componentes:** A aparência de cada toast será um componente React customizado, construído com os elementos do Design System.
- **API de Disparo:** Um serviço ou hook global (ex: `useNotifier`) será criado para permitir que qualquer componente na aplicação possa disparar uma notificação de forma simples.

---

## 4. Fluxo de Interação

**Cenário 1: Ação bem-sucedida**
1.  O usuário clica em "Salvar".
2.  A lógica de salvamento é executada com sucesso.
3.  A função de salvamento chama `notifier.success('Projeto salvo com sucesso!')`.
4.  Um toast de sucesso aparece no canto superior direito, com ícone e cor verde.
5.  Após 5 segundos, o toast desaparece com uma animação suave.

**Cenário 2: Ação com opção de desfazer**
1.  O usuário clica em "Deletar" em um item.
2.  A função de deleção chama `notifier.info('Item deletado.', { action: { label: 'Desfazer', onClick: () => undo() } })`.
3.  Um toast aparece com um botão "Desfazer".
4.  Se o usuário clicar no botão, a função `undo()` é executada, revertendo a exclusão.
5.  Se o usuário não fizer nada, o toast desaparece e a exclusão é confirmada.

---

## 5. Detalhes da Interface

- **Estrutura Visual de um Toast:**
  ```
  ┌───────────────────────────────────────────┐
  │ [Ícone]  [Título - Opcional]              │
  │          [Conteúdo da mensagem]           │
  │          [Botão de Ação 1] [Botão de Ação 2] │
  └───────────────────────────────────────────┘
  ```

- **Tipos e Estilos:**
  - **Success:** Cor de destaque verde, ícone `CheckCircle`.
  - **Error:** Cor de destaque vermelha, ícone `XCircle`.
  - **Warning:** Cor de destaque amarela/âmbar, ícone `AlertTriangle`.
  - **Info:** Cor de destaque azul, ícone `Info`.

- **Posicionamento:** Um contêiner `div` com `position: fixed` será colocado em um canto da viewport (padrão: `top-right`) para empilhar as notificações.

---

## 6. Dados e Estado

- **API de Notificação (Exemplo):**
  ```typescript
  interface NotificationOptions {
    duration?: number; // em ms
    isPersistent?: boolean;
    action?: {
      label: string;
      onClick: () => void;
    };
  }

  const notifier = {
    success: (message: string, options?: NotificationOptions) => void,
    error: (message: string, options?: NotificationOptions) => void,
    warn: (message: string, options?: NotificationOptions) => void,
    info: (message: string, options?: NotificationOptions) => void,
  }
  ```
- O estado da fila de notificações será gerenciado internamente pela biblioteca escolhida.

---

## 7. Dependências Externas

- `react-hot-toast` (ou uma biblioteca similar como `notistack` ou `react-toastify`).

---

## 8. Riscos

| Risco | Solução |
|-------|---------|
| O uso excessivo de notificações pode sobrecarregar e irritar o usuário. | Estabelecer diretrizes claras de UX sobre quando usar uma notificação. Usá-las para feedback não-bloqueante. Para informações críticas que exigem ação, um `Modal` é mais apropriado. |
| A lógica para ações como "Desfazer" pode ser complexa. | A notificação deve iniciar o processo de exclusão, mas a remoção real dos dados deve ser atrasada ou reversível. O `onClick` do botão "Desfazer" cancelaria essa ação atrasada. |

---

## 9. Timeline

- **Fase 1:** Integrar a biblioteca e criar um componente de toast estilizado para cada tipo.
- **Fase 2:** Implementar o serviço/hook `notifier` global.
- **Fase 3:** Adicionar suporte para botões de ação dentro das notificações.

---

## 10. Glossário

| Termo | Significado |
|-------|-------------|
| Toast | Um pequeno pop-up não-bloqueante que fornece feedback sobre uma ação ou evento. |
| Headless Library | Uma biblioteca que fornece lógica e funcionalidade, mas não impõe um estilo visual, permitindo total customização da UI. |

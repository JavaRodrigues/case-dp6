# Case Técnico de Digital Analytics - DP6

## Sobre o Projeto

Este repositório contém a resolução de um desafio técnico proposto pela DP6, focado na implementação de um plano de tagueamento para coleta de dados em um website de exemplo. O objetivo é demonstrar habilidades em Digital Analytics, desde a configuração da ferramenta até o rastreamento de interações específicas do usuário.

O site é composto por 3 páginas principais:
*   `index.html`: A página inicial.
*   `analise.html`: Uma página com conteúdo de análise e cards interativos.
*   `sobre.html`: Página com informações institucionais e um formulário de contato.

## O Desafio

A tarefa central consiste em implementar o rastreamento de eventos e visualizações de página utilizando o **Google Analytics 4 (GA4)**. A biblioteca jQuery já está disponível no projeto para facilitar a manipulação do DOM e a captura de eventos.

Toda a lógica de tagueamento foi centralizada no arquivo `js/tagueamento.js` para manter o código organizado e o HTML limpo.

## Implementação Realizada

1.  **Configuração do GA4:**
    *   O snippet de configuração do GA4 (`gtag.js`) foi adicionado dinamicamente ao `<head>` de todas as páginas através do arquivo `js/tagueamento.js`. Isso garante que a tag seja carregada de forma assíncrona sem poluir o HTML.
    *   O evento padrão de `page_view` é disparado automaticamente em cada carregamento de página. (Como proposto pelo desafio)

2.  **Rastreamento de Eventos:**
    *   **Envio de Formulário de Contato:** Foi implementado o rastreamento do evento `generate_lead` sempre que o formulário na página `sobre.html` é enviado com sucesso.
    *   **Cliques no Menu:** O evento `menu_click` é disparado para rastrear a interação do usuário com os itens do menu de navegação.
    *   **Download de Arquivo:** O evento `download_pdf` captura cliques no link de download do PDF.
    *   **Visualização de Card:** O evento `view_card` é acionado quando um usuário clica em um dos cards de montadoras na página de análise.

## Como Executar e Verificar

### Executando o Projeto
Para visualizar o site, basta abrir o arquivo `index.html` (ou qualquer outro `.html`) em um navegador, preferencialmente a partir de um servidor local para evitar problemas com políticas de CORS.

### Verificando os Disparos
Para confirmar que os eventos estão sendo enviados corretamente para o Google Analytics, você pode usar as seguintes ferramentas:

1.  **Console do Navegador:** Pressione `F12` e acesse a aba "Console". Mensagens de log confirmam a inicialização do GA4 e o disparo de eventos.
2.  **Extensão "Google Analytics Debugger":** Instale a extensão no Chrome, ative-a e abra o Console. Ela exibirá um log detalhado de todos os dados enviados para o GA4.
3.  **Aba "Network" (Rede):** Filtre por `collect=v2` para visualizar as requisições exatas que são enviadas aos servidores do Google a cada interação.

---
*Este case faz parte de um processo seletivo da DP6, demonstrando a aplicação prática de conceitos de Web Analytics.*

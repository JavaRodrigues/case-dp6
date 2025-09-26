// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// Adiciona a tag do Google Analytics 4 (GA4) dinamicamente
const ga4Id = 'UA-3635138-62'; // Substitua pelo seu ID de métricas do GA4

const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
document.head.appendChild(gtagScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', ga4Id);

console.log(`GA4 com ID ${ga4Id} configurado.`);

// Garante que o código será executado após o DOM ser totalmente carregado, usando JavaScript moderno.
document.addEventListener('DOMContentLoaded', function() {

  // --- Tagueamento do Formulário de Contato ---

  const form = document.querySelector('.contato');

  if (form) {
    // Evento: form_start (Disparado na primeira interação com o formulário)
    // A opção { once: true } garante que o evento será disparado apenas uma vez.
    form.addEventListener('input', function() {
      gtag('event', 'form_start', {
        'form_id': this.id,
        'form_name': this.name,
        'form_destination': this.action || window.location.href,
        'page_location': window.location.href
      });
      console.log("Evento GA: form_start enviado.");
    }, { once: true });

    // Evento: form_submit (Disparado no envio do formulário)
    form.addEventListener('submit', function() {
      const submitButton = this.querySelector('button[type="submit"]');
      gtag('event', 'form_submit', {
        'form_id': this.id,
        'form_name': this.name,
        'form_destination': this.action || window.location.href,
        'form_submit_text': submitButton.textContent,
        'page_location': window.location.href
      });
      console.log("Evento GA: form_submit enviado.");
    });
  }

  // Evento: view_form_success (Disparado quando o popup de sucesso é exibido)
  // Usa um MutationObserver para detectar a adição da classe 'lightbox-open' no body,
  // que indica a exibição do popup.
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === "class" && mutation.target.classList.contains('lightbox-open')) {
        const formElement = document.querySelector('.contato');
        const lightboxTitle = document.querySelector('.lightbox-title');
        // Verifica se o popup é o de sucesso do formulário
        if (formElement && lightboxTitle && lightboxTitle.textContent === 'Contato enviado') {
          gtag('event', 'view_form_success', {
            'form_id': formElement.id,
            'form_name': formElement.name,
            'page_location': window.location.href
          });
          console.log("Evento GA: view_form_success enviado.");
        }
      }
    });
  });
  observer.observe(document.body, { attributes: true });

  // Evento: menu_click (Clique nos itens do menu, exceto contato e download)
  document.querySelectorAll('.menu-lista-link:not(.menu-lista-contato, .menu-lista-download)').forEach(function(link) {
    link.addEventListener('click', function() {
      const menuItemName = this.textContent.trim();
      gtag('event', 'menu_click', {
        'event_category': 'navegacao',
        'event_label': menuItemName,
        'page_location': window.location.href
      });
      console.log(`Evento GA: menu_click - ${menuItemName}`);
    });
  });

  // Evento: click (Clique no link 'Entre em Contato' do menu)
  const contatoLink = document.querySelector('.menu-lista-contato');
  if (contatoLink) {
    contatoLink.addEventListener('click', function() {
      gtag('event', 'click', {
        'element_name': 'entre_em_contato',
        'element_group': 'menu',
        'page_location': window.location.href
      });
      console.log("Evento GA: click - entre_em_contato");
    });
  }

  // Evento: file_download (Clique no link de download do PDF)
  const downloadLink = document.querySelector('.menu-lista-download');
  if (downloadLink) {
    downloadLink.addEventListener('click', function() {
      gtag('event', 'file_download', {
        'element_name': 'download_pdf',
        'element_group': 'menu',
        'page_location': window.location.href
      });
      console.log("Evento GA: file_download - download_pdf");
    });
  }

  // Evento: click (Clique nos cards 'Ver Mais' de montadoras na página de análise - Evento Delegado)
  const cardsContainer = document.querySelector('.cards-montadoras');
  if (cardsContainer) {
    cardsContainer.addEventListener('click', function(event) {
      const card = event.target.closest('.card-montadoras');
      if (card) {
        const elementName = card.dataset.id;
        gtag('event', 'click', {
          'element_name': elementName,
          'element_group': 'ver_mais',
          'page_location': window.location.href
        });
        console.log(`Evento GA: click - element_name: ${elementName}, element_group: ver_mais`);
      }
    });
  }
});
// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// Adiciona a tag do Google Analytics 4 (GA4) dinamicamente
const ga4Id = 'G-XXXXXXXXXX'; // Substitua pelo seu ID de métricas do GA4

const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
document.head.appendChild(gtagScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', ga4Id);

console.log(`GA4 com ID ${ga4Id} configurado.`);

// Exemplo: Rastrear o envio do formulário de contato
jQuery(document).ready(function($) {
  $('.contato').on('submit', function() {
    console.log('Formulário de contato enviado. Disparando evento para o GA4...');
    gtag('event', 'generate_lead', {
      'event_category': 'contato',
      'event_label': 'envio_formulario'
    });
    console.log('Evento "generate_lead" enviado!');
  });
});
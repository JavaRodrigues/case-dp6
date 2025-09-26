(function() {
  // Espera o DOM carregar para garantir que todos os elementos existam.
  document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const main = document.querySelector('main');
    const lb = document.querySelector('.lightbox');
    const lbContent = lb.querySelector('.lightbox-content');
    const lbIcon = lb.querySelector('.lightbox-icon');
    const lbTitle = lb.querySelector('.lightbox-title');

    // Adiciona classe 'scrolled' ao lightbox quando o conteúdo rola
    lbContent.addEventListener('scroll', function() {
      lb.classList.toggle('scrolled', lbContent.scrollTop > 10);
    });

    body.classList.add('domready');

    // Lógica para abrir o lightbox ao clicar nos cards
    const cardsContainer = document.querySelector('.cards-montadoras');
    if (cardsContainer) {
      cardsContainer.addEventListener('click', function(event) {
        const card = event.target.closest('.card-montadoras');
        if (card) {
          const cardId = card.dataset.id;
          const cardName = card.dataset.name;
          const content = document.querySelector(`.info-montadora[data-id="${cardId}"]`).innerHTML;

          lbIcon.setAttribute('src', `img/montadoras/${cardId}.png`);
          lbIcon.setAttribute('alt', cardName);
          lbTitle.textContent = cardName;
          lbContent.innerHTML = content;
          lbContent.scrollTop = 0;

          setTimeout(() => body.classList.add('lightbox-open'), 200);
        }
      });
    }

    // Lógica para fechar o lightbox
    document.querySelectorAll('.lightbox-backdrop, .lightbox-fechar').forEach(el => {
      el.addEventListener('click', () => body.classList.remove('lightbox-open'));
    });

    // Lógica para abrir e fechar o menu
    document.querySelectorAll('.cabecalho-menu, .menu-fechar').forEach(el => {
      el.addEventListener('click', () => {
        body.classList.toggle('menu-open', el.classList.contains('cabecalho-menu'));
      });
    });

    document.querySelector('.menu-backdrop').addEventListener('click', () => body.classList.remove('menu-open'));

    // Lógica de interação com os submenus
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.addEventListener('click', function(e) {
        // Abrir/fechar sublistas
        const sublistLink = e.target.closest('.menu-lista-sublista > a');
        if (sublistLink) {
          e.preventDefault();
          const parentLi = sublistLink.parentElement;
          parentLi.classList.toggle('fechado');
          // Fecha outros submenus abertos
          document.querySelectorAll('.menu-lista-sublista').forEach(li => {
            if (li !== parentLi) {
              li.classList.add('fechado');
            }
          });
        }

        // Fechar menu ao clicar em um link da sublista
        const sublistLinkClick = e.target.closest('.menu-sublista-link');
        if (sublistLinkClick && sublistLinkClick.pathname === location.pathname) {
          body.classList.remove('menu-open');
          if (!sublistLinkClick.hash) {
            e.preventDefault();
            main.scrollTop = 0;
          }
        }
      });
    }

    // Lógica de envio do formulário de contato
    const contatoForm = document.querySelector('.contato');
    if (contatoForm) {
      const submitButton = contatoForm.querySelector('button[type="submit"]');
      contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitButton.disabled = true;

        setTimeout(() => {
          console.log('enviado');
          lbIcon.setAttribute('src', 'img/logo-dp6-square.png');
          lbIcon.setAttribute('alt', 'Logo DP6');
          lbTitle.textContent = 'Contato enviado';
          lbContent.innerHTML = 'Obrigado pelo seu contato!';
          lbContent.scrollTop = 0;

          setTimeout(() => {
            body.classList.add('lightbox-open');
            submitButton.disabled = false;
          }, 200);
        }, Math.random() * 2000);
      });
    }

    // Abre o submenu correspondente à página atual
    const currentPageClass = '.menu-lista-' + location.pathname.split('/').pop().replace('.html', '');
    const activeMenuItem = document.querySelector(currentPageClass);
    if (activeMenuItem && activeMenuItem.parentElement.classList.contains('menu-lista-sublista')) {
      activeMenuItem.parentElement.classList.remove('fechado');
    }
  });
})();

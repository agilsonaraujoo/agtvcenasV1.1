// Menu mobile toggle
const menuMobile = document.getElementById('menu-mobile');
const navLinks = document.querySelector('.nav-links');
menuMobile.onclick = () => {
  navLinks.classList.toggle('mostrar');
};
// Fechar menu após clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.onclick = () => {
    navLinks.classList.remove('mostrar');
  };
});

// Suave scroll para âncoras
const linksAnchor = document.querySelectorAll('a[href^="#"]');
linksAnchor.forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-pergunta');
  btn.onclick = () => {
    item.classList.toggle('ativo');
    // fecha os outros
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove('ativo');
    });
  };
});

// Botões dos planos redirecionam para API de pagamento
const botoesAssinar = document.querySelectorAll('.btn-assinar');
botoesAssinar.forEach(botao => {
  botao.onclick = () => {
    const url = botao.getAttribute('data-link');
    if (url && url !== 'SUA_API_MENSAL' && url !== 'SUA_API_4MESES' && url !== 'SUA_API_6MESES' && url !== 'SUA_API_12MESES') {
      window.open(url, '_blank');
    } else {
      alert('Informe o link correto da API de pagamento no atributo data-link.');
    }
  };
});

// Carrossel infinito contínuo de filmes
const carousel = document.querySelector('.filmes-carousel');
if (carousel) {
  // Duplique os filmes para efeito visual sem cortes
  const filmesOriginais = Array.from(carousel.children);
  // Só duplica se não tiver sido duplicado ainda
  if (filmesOriginais.length && !carousel.classList.contains('loop-ready')) {
    filmesOriginais.forEach(card => carousel.appendChild(card.cloneNode(true)));
    carousel.classList.add('loop-ready');
  }

  let scrollSpeed = 0.2; // px por frame (ajustado para mais suave)
  let reqId;
  let lastScroll = 0;

  function animateLoop() {
    carousel.scrollLeft += scrollSpeed;
  
    if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
      carousel.scrollLeft = 0;
    }
  
    reqId = requestAnimationFrame(animateLoop);
  }

  // Não pausa mais ao passar mouse, inicia sempre
  function startInfiniteCarousel() {
    if (!reqId) reqId = requestAnimationFrame(animateLoop);
  }
  function stopInfiniteCarousel() {
    if (reqId) cancelAnimationFrame(reqId);
    reqId = null;
  }

  window.addEventListener('blur', stopInfiniteCarousel);
  window.addEventListener('focus', startInfiniteCarousel);

  // Reseta rolagem se tela for redimensionada
  window.addEventListener('resize', () => {
    carousel.scrollLeft = 0;
  });

  startInfiniteCarousel();
}

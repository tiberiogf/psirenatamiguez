/* ============================================
   RENATA MIGUEZ — LANDING PAGE
   JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initServiceModal();
});

/* ---------- Navbar scroll effect ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 60;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  handleScroll();
}

/* ---------- Mobile menu toggle ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when clicking a link
  menu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  // Add reveal classes to sections
  const revealTargets = [
    { selector: '.sobre__text', delay: 0 },
    { selector: '.sobre__photo', delay: 1 },
    { selector: '.servicos__header', delay: 0 },
    { selector: '.contato__content', delay: 0 },
  ];

  revealTargets.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('reveal');
      if (delay > 0) el.classList.add(`reveal--delay-${delay}`);
    }
  });

  // Add reveal to each service card with stagger
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.classList.add('reveal');
    if (i > 0) card.classList.add(`reveal--delay-${i}`);
  });

  // IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---------- Smooth scroll for anchors ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close modal if open before scrolling
      const modal = document.getElementById('service-modal');
      if (modal && modal.classList.contains('open')) {
        closeServiceModal();
      }

      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}

/* ---------- Service Modal ---------- */
const SERVICE_DATA = {
  atendimento: {
    title: 'Atendimento Terapêutico',
    image: 'resources/img/1 at.jpg',
    text: `<p>O Acompanhamento Terapêutico é uma clínica nômade que acompanha o movimento do cliente na vida cotidiana. Caminhamos lado a lado para que a autonomia seja desenvolvida.</p>
<p>O processo terapêutico não é apenas dentro de um consultório, ele circula em diferentes espaços que fazem sentido em cada contexto clínico a partir das necessidades terapêuticas e de suporte para cada cliente.</p>`,
  },
  psicoterapia: {
    title: 'Psicoterapia',
    image: 'resources/img/2 psico.jpg',
    text: `<p>Processo terapêutico fundamentado na Gestalt Terapia e na Abordagem Biocêntrica, com foco na sua experiência presente e no resgate da sua potência de vida.</p>
<p>A psicoterapia oferece um espaço seguro e acolhedor onde você pode explorar suas questões internas, padrões emocionais e relacionais, ampliando sua consciência e encontrando novos caminhos para lidar com os desafios da vida.</p>`,
  },
  biodanza: {
    title: 'Biodanza',
    image: 'resources/img/3 bio.jpg',
    text: `<p>A Biodanza é um potente processo de desenvolvimento em grupo, onde as relações, o corpo, o movimento e a dança são protagonistas. Criamos um ambiente seguro e nutridor para que possamos fazer nosso caminho de desenvolvimento, nos expressar e ampliar nossa consciência. A prática da Biodanza tem efeitos terapêuticos e auxiliam (e aceleram) nas transformações existenciais para um estilo de vida para maior conexão consigo, com os outros e com a natureza/ambientes.</p>
<p>Melhora o sono, amplia a nossa sensibilidade e percepção corporal, aumenta a vitalidade, diminui a ansiedade, entre outros benefícios.</p>
<p>As aulas são semanais. Entre em contato para agendar uma aula experimental.</p>`,
  },
};

function initServiceModal() {
  const modal = document.getElementById('service-modal');
  if (!modal) return;

  const backdrop = modal.querySelector('.service-modal__backdrop');
  const closeBtn = modal.querySelector('.service-modal__close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');

  // Open modal from "Saiba mais" buttons
  document.querySelectorAll('[data-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      const data = SERVICE_DATA[serviceKey];
      if (!data) return;

      // Populate modal
      modalTitle.textContent = data.title;
      modalText.innerHTML = data.text;

      // Image
      if (data.image) {
        modalImg.innerHTML = `<img src="${data.image}" alt="${data.title}" loading="lazy">`;
      } else {
        modalImg.innerHTML = `<div class="modal-img-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
      }

      openServiceModal();
    });
  });

  // Close events
  closeBtn.addEventListener('click', closeServiceModal);
  backdrop.addEventListener('click', closeServiceModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeServiceModal();
    }
  });
}

function openServiceModal() {
  const modal = document.getElementById('service-modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  const modal = document.getElementById('service-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

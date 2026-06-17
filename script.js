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
  initCarousel();
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
  psicoterapia: {
    title: 'Psicoterapia',
    image: 'resources/img/2 psico d.jpg',
    text: `<p>A psicoterapia é um espaço seguro de escuta e cuidado, um tempo dedicado à sua saúde e à construção de uma qualidade de vida.</p>
<p>O processo terapêutico acontece por meio de encontros regulares, que propõem a ampliação da consciência sobre si, sobre os próprios desejos, formas de se relacionar e caminhos possíveis para uma vida mais integrada, autêntica e plena de sentido.</p>
<p>Desde o primeiro encontro, busco oferecer um ambiente acolhedor, sensível e de profundo respeito, favorecendo o desenvolvimento de maior clareza sobre si, a mobilização dos próprios recursos e a construção de formas mais significativas de viver.</p>
<p>Ao longo desse processo, trabalhamos questões emocionais, relacionais e existenciais, buscando compreender e transformar fatores que possam estar gerando ansiedade, angústia, medo, insegurança ou outros sentimentos e padrões de comportamento que impactam negativamente a sua vida cotidiana e as suas relações.</p>
<p>Cada processo é construído de forma singular, respeitando o tempo, a história e as necessidades de cada pessoa.</p>
<p>Meu trabalho é fundamentado na Gestalt-terapia e na Psicoterapia de Abordagem Biocêntrica, duas perspectivas clínicas centradas na presença e na conexão com a sua potência de vida.</p>
<p>Os atendimentos são realizados de forma individual para jovens e adultos. As modalidades de atendimento são online ou presencial no endereço: <strong><a href="https://maps.app.goo.gl/mKM9ETDVXbFeKbLU6" target="_blank" rel="noopener noreferrer">Praça XV de Novembro, 153, Sala 702, Centro, Florianópolis.</a></strong></p>`,
  },
  atendimento: {
    title: 'AT com suporte Clínico (Acompanhamento Terapêutico)',
    image: 'resources/img/1 at d.jpg',
    text: `<p>Nesta forma clínica, caminhamos lado a lado, construindo possibilidades para que a autonomia e a participação na vida sejam ampliadas. O foco está em sustentar processos que, muitas vezes, não se dão apenas no consultório, mas nas relações, nos territórios e nas experiências do dia a dia.</p>
          <p> O trabalho tem como foco sustentar e ampliar a autonomia, a circulação social e a construção de novos modos de estar no mundo, enquanto circulamos pelo mundo.</p>
          <p>A clínica se desloca para a rua, em casa, em espaços públicos ou onde fizer sentido dentro do contexto de cada pessoa. Cada acompanhamento é singular, construído a partir das necessidades, do momento de vida e dos objetivos terapêuticos do cliente.</p>
          <p>O trabalho é construído de forma individualizada, a partir de um plano terapêutico, considerando as demandas específicas de cada caso.</p>`,
  },
  biodanza: {
    title: 'Biodanza - SRT',
    image: 'resources/img/3 bio d.jpg',
    text: `<p>A Biodanza é um potente processo de desenvolvimento em grupo, onde as relações, o corpo, o movimento e a dança são protagonistas. Criamos um ambiente seguro e nutridor para que possamos fazer nosso caminho de desenvolvimento, nos expressar e ampliar nossa consciência. A prática da Biodanza tem efeitos terapêuticos e auxiliam (e aceleram) nas transformações existenciais para um estilo de vida para maior conexão consigo, com os outros e com a natureza/ambientes.</p>
<p>Melhora o sono, amplia a nossa sensibilidade e percepção corporal, aumenta a vitalidade, diminui a ansiedade, entre outros benefícios.</p>
<p>As aulas são semanais. Entre em contato para agendar uma aula experimental.</p>
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-top: 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <iframe src="https://www.youtube.com/embed/1egnVjlT2lA" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>`,
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

  // Open modal from "Saiba mais" buttons / clickable cards
  document.querySelectorAll('[data-service]').forEach(btn => {
    const triggerModal = (e) => {
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
    };

    btn.addEventListener('click', triggerModal);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        triggerModal(e);
      }
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

/* ---------- Carousel Depoimentos ---------- */
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const indicators = Array.from(document.querySelectorAll('#carousel-indicators .indicator'));
  const progressBar = document.getElementById('carousel-progress-bar');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideDuration = 13000; // 13 seconds
  let startTime;
  let animationFrame;
  let isTransitioning = false;
  let isPaused = false;
  let elapsedBeforePause = 0;

  function updateCarousel(index, smooth = true) {
    if (smooth) {
      track.style.transition = 'transform 0.5s ease-in-out';
      slides.forEach(s => s.style.transition = 'opacity 0.5s ease-in-out');
    } else {
      track.style.transition = 'none';
      slides.forEach(s => s.style.transition = 'none');
    }

    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    currentIndex = index;

    if (smooth) {
      isTransitioning = true;
    }
  }

  function nextSlide() {
    if (isTransitioning) return;
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    updateCarousel(nextIndex);
    resetProgress();
  }

  function prevSlide() {
    if (isTransitioning) return;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    updateCarousel(prevIndex);
    resetProgress();
  }

  function startProgress() {
    cancelAnimationFrame(animationFrame);
    startTime = performance.now() - elapsedBeforePause;

    function animateProgress(time) {
      if (isPaused) return;

      const elapsed = time - startTime;
      let progress = (elapsed / slideDuration) * 100;

      if (progress >= 100) {
        progress = 100;
        progressBar.style.width = `${progress}%`;
        elapsedBeforePause = 0;
        nextSlide();
        return;
      }

      progressBar.style.width = `${progress}%`;
      animationFrame = requestAnimationFrame(animateProgress);
    }

    animationFrame = requestAnimationFrame(animateProgress);
  }

  function pauseProgress() {
    if (isPaused) return;
    isPaused = true;
    cancelAnimationFrame(animationFrame);
    elapsedBeforePause = performance.now() - startTime;
    if (elapsedBeforePause < 0) elapsedBeforePause = 0;
    if (elapsedBeforePause > slideDuration) elapsedBeforePause = slideDuration;
  }

  function resumeProgress() {
    if (!isPaused) return;
    isPaused = false;
    startProgress();
  }

  function resetProgress() {
    cancelAnimationFrame(animationFrame);
    elapsedBeforePause = 0;
    progressBar.style.width = '0%';
    if (!isPaused) {
      startProgress();
    }
  }

  // Attach pause/resume events on testimonials cards
  const testimonialCards = document.querySelectorAll('.depoimento-card');
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', pauseProgress);
    card.addEventListener('mouseleave', resumeProgress);
    card.addEventListener('touchstart', pauseProgress, { passive: true });
    card.addEventListener('touchend', resumeProgress, { passive: true });
    card.addEventListener('touchcancel', resumeProgress, { passive: true });
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      if (isTransitioning) return;
      updateCarousel(index);
      resetProgress();
    });
  });

  // Chevron navigation buttons
  const prevBtn = document.querySelector('.carousel-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-btn.next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  // Swipe support for touch devices (tablet/mobile only <= 960px)
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  const swipeThreshold = 50;

  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('touchstart', (e) => {
      if (window.innerWidth > 960) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (window.innerWidth > 960) return;
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  }

  window.addEventListener('resize', () => {
    updateCarousel(currentIndex, false);
  });

  track.addEventListener('transitionend', () => {
    isTransitioning = false;
  });

  setTimeout(() => {
    updateCarousel(0, false);
    startProgress();
  }, 100);
}

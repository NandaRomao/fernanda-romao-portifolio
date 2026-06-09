// ============================================
// === MANDARIM · MOKSHYAA ===
// Busca, filtros, toggle de detalhe, scroll reveal,
// navbar e scroll-to-top.
// ============================================

// === NAVBAR SCROLL ===
(function() {
  const nav = document.getElementById('mNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// === SCROLL REVEAL ===
(function() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = (index % 6) * 0.05;
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
})();

// === BUSCA + FILTRO ===
(function() {
  const searchInput = document.getElementById('vocabSearch');
  const filterButtons = document.querySelectorAll('.m-filter-btn');
  const cards = document.querySelectorAll('.m-vocab-card');
  const countEl = document.getElementById('vocabCount');
  const emptyEl = document.getElementById('vocabEmpty');

  if (!searchInput || cards.length === 0) return;

  const total = cards.length;
  let activeFilter = 'all';
  let searchQuery = '';
  let searchTimeout;

  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function applyFilters() {
    let visibleCount = 0;
    const q = normalize(searchQuery);
    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const pt = normalize(card.getAttribute('data-pt') || '');
      const zh = normalize(card.getAttribute('data-zh') || '');
      const pinyin = normalize(card.getAttribute('data-pinyin') || '');
      const en = normalize(card.getAttribute('data-en') || '');
      const categoryMatch = activeFilter === 'all' || category === activeFilter;
      const searchMatch = !q || pt.includes(q) || zh.includes(q) || pinyin.includes(q) || en.includes(q);
      if (categoryMatch && searchMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    if (visibleCount === 0) {
      if (countEl) countEl.hidden = true;
      if (emptyEl) emptyEl.hidden = false;
    } else {
      if (countEl) { countEl.hidden = false; countEl.textContent = `Exibindo ${visibleCount} de ${total} termos`; }
      if (emptyEl) emptyEl.hidden = true;
    }
  }

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => { searchQuery = e.target.value; applyFilters(); }, 200);
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilters();
    });
  });
})();

// === TOGGLE DE DETALHE (a setinha) ===
(function() {
  const toggles = document.querySelectorAll('.m-card-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const detail = toggle.nextElementSibling;
      const isOpen = detail.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      const label = toggle.querySelector('.label');
      if (label) label.textContent = isOpen ? 'menos' : 'mais';
    });
  });
})();

// === SCROLL TO TOP ===
(function() {
  const btn = document.getElementById('mScrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
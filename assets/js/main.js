
    // ==========================================
    // === HERO CANVAS — Partículas de caracteres
    // ==========================================
    (function() {
      const canvas = document.getElementById('hero-canvas');
      const ctx = canvas.getContext('2d');
      
      // Caracteres japoneses/chineses para as partículas
      const chars = ['木', '花', '光', '雨', '山', '水', '学', '道', '风', '月'];
      
      let particles = [];
      let animationId;
      
      // Configurações das partículas
      const PARTICLE_COUNT = 50; // Entre 40-60
      const MIN_SPEED = 0.3;
      const MAX_SPEED = 0.8;
      const MIN_SIZE = 12;
      const MAX_SIZE = 28;
      const MIN_OPACITY = 0.02;
      const MAX_OPACITY = 0.06;
      
      // Classe Particle
      class Particle {
        constructor() {
          this.reset();
          // Posiciona aleatoriamente na tela inicialmente
          this.y = Math.random() * canvas.height;
        }
        
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = -50;
          this.speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
          this.size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
          this.opacity = MIN_OPACITY + Math.random() * (MAX_OPACITY - MIN_OPACITY);
          this.char = chars[Math.floor(Math.random() * chars.length)];
        }
        
        update() {
          this.y += this.speed;
          
          // Reseta quando sai da tela
          if (this.y > canvas.height + 50) {
            this.reset();
          }
        }
        
        draw() {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          ctx.font = `${this.size}px 'Cormorant Garamond', serif`;
          ctx.fillStyle = '#C9A84C';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.char, this.x, this.y);
          ctx.restore();
        }
      }
      
      // Redimensiona o canvas
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      // Inicializa as partículas
      function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push(new Particle());
        }
      }
      
      // Loop de animação
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
      }
      
      // Evento de redimensionamento
      window.addEventListener('resize', () => {
        resizeCanvas();
      });
      
      // Inicialização
      resizeCanvas();
      initParticles();
      animate();
    })();

    // ==========================================
    // === NAVEGAÇÃO
    // ==========================================
    (function() {
      const navbar = document.getElementById('navbar');
      const hamburger = document.querySelector('.hamburger');
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileLinks = document.querySelectorAll('.mobile-link');
      const navLinks = document.querySelectorAll('.nav-link');
      
      // Scroll: adiciona/remove classe .navbar-scrolled
      function handleScroll() {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      }
      
      window.addEventListener('scroll', handleScroll);
      
      // Toggle do menu hambúrguer
      hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        mobileMenu.setAttribute('aria-hidden', !isActive);
        
        // Previne scroll do body quando menu está aberto
        document.body.style.overflow = isActive ? 'hidden' : '';
      });
      
      // Fecha menu ao clicar em um link
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        });
      });
      
      // Fecha menu ao clicar fora
      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
      
      // Smooth scroll para âncoras
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
      
      // Highlight do link ativo conforme seção visível
      const sections = document.querySelectorAll('section[id]');
      
      const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      };
      
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            // Remove active de todos
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Adiciona active no correspondente
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      }, observerOptions);
      
      sections.forEach(section => sectionObserver.observe(section));
    })();

    // ==========================================
    // === SCROLL REVEAL
    // ==========================================
    (function() {
      const revealElements = document.querySelectorAll('.reveal');
      
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: para de observar após revelar
            // revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });
      
      revealElements.forEach(el => revealObserver.observe(el));
    })();

    // ==========================================
    // === CURSOR CUSTOMIZADO
    // ==========================================
    (function() {
      // Verifica se é dispositivo com hover (não-touch)
      const isHoverDevice = window.matchMedia('(hover: hover)').matches;
      
      if (!isHoverDevice) return;
      
      const cursor = document.getElementById('custom-cursor');
      let mouseX = 0;
      let mouseY = 0;
      let cursorX = 0;
      let cursorY = 0;
      
      // Atualiza posição do mouse
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      
      // Animação suave do cursor
      function animateCursor() {
        // Interpolação linear para suavizar o movimento
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
      }
      
      animateCursor();
      
      // Efeito hover em elementos interativos
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], .btn-primary, .btn-outline');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover');
        });
      });
    })();
    
  // ==========================================
  // === LANGUAGE TOGGLE — Sobre ===
  // ==========================================
  (function() {
    // Seleciona todos os blocos de texto da seção Sobre
    const aboutBlocks = document.querySelectorAll('.about-block');
    
    aboutBlocks.forEach(block => {
      // Seleciona o texto e os botões deste bloco
      const textEl = block.querySelector('.about-block-text');
      const langButtons = block.querySelectorAll('.lang-btn');
      
      // Adiciona evento de clique em cada botão de idioma
      langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          const selectedLang = this.getAttribute('data-lang');
          
          // Se já está ativo, não faz nada
          if (this.classList.contains('active')) return;
          
          // Atualiza estado visual dos botões
          langButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          // Pega o novo texto do atributo data
          const newText = textEl.getAttribute('data-' + selectedLang);
          
          if (!newText) return;
          
          // Animação de fade: out → troca → in
          textEl.classList.add('is-fading');
          
          setTimeout(() => {
            textEl.textContent = newText;
            textEl.classList.remove('is-fading');
          }, 150); // Tempo igual ao da transição CSS
        });
      });
    });
  })();
   // ==========================================
  // === PROJECT FILTER — Filtro de Projetos ===
  // ==========================================
  (function() {
    // Seleciona todos os botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Seleciona todos os cards de projeto
    const projectCards = document.querySelectorAll('.project-card');

    // Adiciona evento de clique em cada botão
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');

        // Atualiza estado visual dos botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filtra os cards com transição suave
        projectCards.forEach(card => {
          const cardTags = card.getAttribute('data-tags') || '';
          const tagsArray = cardTags.split(' ');

          // Verifica se o card deve ser exibido
          const shouldShow = filterValue === 'all' || tagsArray.includes(filterValue);

          if (shouldShow) {
            // Remove hidden e adiciona classe de transição
            card.classList.remove('hidden');
            // Pequeno delay para permitir a transição CSS
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            // Aplica transição de saída
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            
            // Aguarda a transição para esconder o elemento
            setTimeout(() => {
              card.classList.add('hidden');
            }, 300); // Tempo igual à transição CSS
          }
        });
      });
    });
  })();

  // ==========================================
  // === SKILLS STAGGER — Animação sequencial das tags
  // ==========================================
  (function() {
    // Seleciona todas as colunas de skills
    const skillsColumns = document.querySelectorAll('.skills-column');

    // Configuração do IntersectionObserver
    const skillsObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    // Observer para detectar quando a coluna entra na viewport
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const column = entry.target;
          const tags = column.querySelectorAll('.skill-tag');

          // Aplica animação escalonada em cada tag
          tags.forEach((tag, index) => {
            // Define delay escalonado (0.05s por tag)
            tag.style.animationDelay = (index * 0.05) + 's';
            // Adiciona classe que dispara a animação
            tag.classList.add('animate');
          });

          // Para de observar esta coluna (animação ocorre apenas uma vez)
          skillsObserver.unobserve(column);
        }
      });
    }, skillsObserverOptions);

    // Observa cada coluna de skills
    skillsColumns.forEach(column => {
      skillsObserver.observe(column);
    });
  })();
   // ==========================================
  // === FORM VALIDATION — Validação do Contato
  // ==========================================
  (function() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('contactSuccess');
    const submitBtn = form.querySelector('.contact-submit');

    // Regex para validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Mapeamento de campos e mensagens de erro
    const fields = {
      nome: {
        el: document.getElementById('nome'),
        group: document.getElementById('group-nome'),
        error: document.getElementById('error-nome'),
        validate: (val) => {
          if (!val.trim()) return 'Nome é obrigatório';
          return null;
        }
      },
      email: {
        el: document.getElementById('email'),
        group: document.getElementById('group-email'),
        error: document.getElementById('error-email'),
        validate: (val) => {
          if (!val.trim()) return 'E-mail é obrigatório';
          if (!emailRegex.test(val.trim())) return 'E-mail inválido';
          return null;
        }
      },
      mensagem: {
        el: document.getElementById('mensagem'),
        group: document.getElementById('group-mensagem'),
        error: document.getElementById('error-mensagem'),
        validate: (val) => {
          if (!val.trim()) return 'Mensagem é obrigatória';
          if (val.trim().length < 10) return 'Mensagem muito curta';
          return null;
        }
      }
    };

    // Limpa erro ao digitar
    Object.values(fields).forEach(field => {
      field.el.addEventListener('input', () => {
        field.group.classList.remove('error');
      });
    });

    // Submissão do formulário
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let isValid = true;

      // Valida cada campo
      Object.values(fields).forEach(field => {
        const value = field.el.value;
        const error = field.validate(value);

        if (error) {
          field.group.classList.add('error');
          field.error.textContent = error;
          isValid = false;
        } else {
          field.group.classList.remove('error');
        }
      });

      // Se válido, simula envio
      if (isValid) {
        // Desabilita botão e muda texto
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';

        // Simula delay de envio (1.5s)
        setTimeout(() => {
          // Fade out do formulário
          form.style.opacity = '0';
          form.style.transition = 'opacity 400ms ease';
          form.style.pointerEvents = 'none';

          setTimeout(() => {
            form.style.display = 'none';
            
            // Mostra mensagem de sucesso
            successMsg.hidden = false;
            // Força reflow para ativar transição
            requestAnimationFrame(() => {
              successMsg.classList.add('is-visible');
            });
          }, 400);
        }, 1500);
      }
    });
  })();

  // ==========================================
  // === SCROLL TO TOP — Botão flutuante
  // ==========================================
  (function() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    const SCROLL_THRESHOLD = 400;

    // Mostra/esconde botão conforme scroll
    function toggleScrollBtn() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        scrollBtn.classList.add('is-visible');
      } else {
        scrollBtn.classList.remove('is-visible');
      }
    }

    // Evento de scroll
    window.addEventListener('scroll', toggleScrollBtn);

    // Click: volta ao topo suavemente
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Verifica estado inicial
    toggleScrollBtn();
  })();

  // ==========================================
  // === EASTER EGG — Chuva de pétalas "moksha"
  // ==========================================
  (function() {
    let typedKeys = '';
    const TRIGGER = 'moksha';
    const PETAL_COUNT = 60;
    const MIN_DURATION = 2500;
    const MAX_DURATION = 4000;

    // Listener global de keydown
    document.addEventListener('keydown', function(e) {
      // Ignora se foco está em input/textarea
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      // Acumula teclas
      typedKeys += e.key.toLowerCase();

      // Mantém apenas o tamanho necessário
      if (typedKeys.length > TRIGGER.length) {
        typedKeys = typedKeys.slice(-TRIGGER.length);
      }

      // Verifica se a sequência foi digitada
      if (typedKeys === TRIGGER) {
        triggerPetalRain();
        typedKeys = ''; // Reseta após disparo
      }
    });

    // Cria e anima as pétalas
    function triggerPetalRain() {
      for (let i = 0; i < PETAL_COUNT; i++) {
        createPetal(i);
      }
    }

    // Cria uma pétala individual
    function createPetal(index) {
      const petal = document.createElement('div');
      petal.className = 'petal';

      // Tamanho aleatório entre 6-10px
      const size = 6 + Math.random() * 4;
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';

      // Posição horizontal aleatória
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.top = '-20px';

      // Duração aleatória da queda
      const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
      petal.style.animation = `petalFall ${duration}ms ease-in forwards`;

      // Delay escalonado para efeito cascata
      const delay = index * 50;
      petal.style.animationDelay = delay + 'ms';

      // Adiciona ao DOM
      document.body.appendChild(petal);

      // Remove do DOM após animação
      setTimeout(() => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
        }
      }, duration + delay + 100);
    }
  })();
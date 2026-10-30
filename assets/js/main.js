/**
 * Agnaldo Marinho — SRE & Platform Engineer
 * Brittany Chiang v4 + GitHub Theme Toggle (Dark & Light)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initJobTabs();
  initMobileNav();
  initNavbarScroll();
  initLanguage();
});

/* ==========================================================================
   1. Theme Management (GitHub Dark / Light)
   ========================================================================== */
function initTheme() {
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  const themeToggle = document.getElementById('theme-toggle');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');

  function getSystemScheme() {
    return systemPrefersDark.matches ? 'dark' : 'light';
  }

  function renderThemeIcon(theme) {
    if (!themeToggle) return;
    const iconContainer = themeToggle.querySelector('.theme-icon');
    if (!iconContainer) return;

    if (theme === 'dark') {
      // Show Sun icon (click to switch to light)
      themeToggle.setAttribute('title', 'Mudar para tema claro');
      themeToggle.setAttribute('aria-label', 'Mudar para tema claro');
      iconContainer.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      // Show Moon icon (click to switch to dark)
      themeToggle.setAttribute('title', 'Mudar para tema escuro');
      themeToggle.setAttribute('aria-label', 'Mudar para tema escuro');
      iconContainer.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  function applyTheme(theme, isUserAction = false) {
    const resolvedTheme = (theme === 'system' || !theme) ? getSystemScheme() : theme;

    document.documentElement.setAttribute('data-theme', resolvedTheme);
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', resolvedTheme);
    }

    renderThemeIcon(resolvedTheme);

    if (isUserAction) {
      localStorage.setItem('theme', resolvedTheme);
    }
  }

  // Initial theme application
  const initialTheme = storedTheme || getSystemScheme() || 'dark';
  applyTheme(initialTheme);

  // System preference change listener
  systemPrefersDark.addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      applyTheme(getSystemScheme());
    }
  });

  // Toggle button click listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const target = current === 'dark' ? 'light' : 'dark';
      applyTheme(target, true);
    });
  }
}

/* ==========================================================================
   2. Job Experience Tabs (Brittany Chiang v4 style)
   ========================================================================== */
function initJobTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel active state
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   3. Mobile Hamburger Menu
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   4. Navbar Scroll Shadow Effect
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.height = 'var(--nav-scroll-height)';
      header.style.borderBottomColor = 'var(--color-border-default)';
      header.style.boxShadow = '0 10px 30px -10px var(--card-shadow)';
    } else {
      header.style.height = 'var(--nav-height)';
      header.style.borderBottomColor = 'transparent';
      header.style.boxShadow = 'none';
    }
  });
}

/* ==========================================================================
   5. Internationalization (PT / EN)
   ========================================================================== */
const translations = {
  pt: {
    navAbout: 'Sobre',
    navExperience: 'Experiência',
    navProjects: 'Projetos',
    navContact: 'Contato',
    btnResume: 'Currículo',

    heroIntro: 'Olá, meu nome é',
    heroHeadline: 'Eu construo plataformas resilientes de produção.',
    heroBio: 'Sou Especialista DevOps / SRE com <strong>16 anos de carreira em TI</strong>, sendo 8 dedicados a plataformas de produção em ambientes de alta criticidade — meios de pagamento (<strong>Elo, Redecard</strong>), saúde (<strong>Albert Einstein</strong>) e energia (<strong>Raízen</strong>). Especializado em Kubernetes multi-cloud, Terraform, Datadog e engenharia de confiabilidade (SLIs/SLOs).',
    heroBtn: 'Conheça meus projetos!',

    aboutHeading: 'Sobre Mim',
    aboutP1: 'Olá! Sou o Agnaldo e trabalho com infraestrutura de tecnologia desde 2010. Minha jornada começou administrando redes, servidores físicos e datacenters na <strong>Universidade Federal do Pará (UFPA)</strong> e na <strong>FADESP</strong>, acumulando 8 anos de base sólida em Linux, DNS, roteamento TCP/IP e monitoramento antes de migrar para a nuvem.',
    aboutP2: 'Hoje meu foco é projetar e operar plataformas escaláveis e resilientes em ambientes onde qualquer minuto de indisponibilidade tem custo financeiro direto. Atuo no cliente <strong>Elo (Projeto RISE)</strong> operando Kubernetes em quatro nuvens (AWS, Azure, GCP e Huawei Cloud), com <strong>Istio Service Mesh</strong>, borda com Azure Front Door e entrega contínua GitOps com <strong>ArgoCD</strong>.',
    aboutP3: 'Minha filosofia central é: <em>confiabilidade que vive só no time de infraestrutura é confiabilidade que não escala</em>. Trabalho lado a lado com os desenvolvedores, definindo SLIs, SLOs e orçamentos de erro que sustentam a operação quando a produção discorda do plano.',
    aboutTechIntro: 'Aqui estão algumas das tecnologias com as quais tenho trabalhado recentemente:',

    jobsHeading: 'Onde Trabalhei',

    projectsHeading: 'Projetos em Destaque',
    featTag: 'Projeto em Destaque',
    crosswatcText: 'Plataforma de Developer Experience (DevX) e gerenciamento de ciclo de vida sobre GitOps (<strong>GitHub → Argo CD → Crossplane → Cloud</strong>). Fornece abstrações de autosserviço para desenvolvedores provisionarem recursos de nuvem sem expor manifests Kubernetes brutos.',
    mcpText: 'Servidor Model Context Protocol (MCP) em Go <strong>estritamente read-only</strong> que entrega fatos determinísticos e auditáveis de clusters Kubernetes para agentes de IA. Elimina a ambiguidade do <code>--event-ttl</code> declarando explicitamente a janela temporal coberta, com checagem de permissões via <code>SelfSubjectAccessReview</code>.',
    sreiaText: 'Livro vivo open-source e laboratório executável para times de SRE e DevOps implementarem IA operacional com código real. Inclui ambiente local em Kind cluster com Prometheus, Grafana, Loki e busca vetorial com Qdrant para incident playbooks.',

    contactPre: '04. O Que Vem a Seguir?',
    contactTitle: 'Fale Comigo',
    contactBody: 'Minha caixa de entrada está sempre aberta. Seja para conversar sobre arquitetura de plataformas Kubernetes, GitOps com ArgoCD, observabilidade ou desafios de engenharia de confiabilidade em produção, ficarei feliz em responder!',
    contactBtn: 'Diga Olá!'
  },

  en: {
    navAbout: 'About',
    navExperience: 'Experience',
    navProjects: 'Work',
    navContact: 'Contact',
    btnResume: 'Resume',

    heroIntro: 'Hi, my name is',
    heroHeadline: 'I build resilient production platforms.',
    heroBio: 'I\'m a DevOps & SRE Specialist with <strong>16 years in IT</strong>, 8 of them building and running production platforms for high-throughput payments (<strong>Elo, Redecard</strong>), critical healthcare (<strong>Albert Einstein Hospital</strong>), and energy (<strong>Raízen</strong>). Specialized in multi-cloud Kubernetes, Terraform, Datadog, and reliability engineering (SLIs/SLOs).',
    heroBtn: 'Check out my projects!',

    aboutHeading: 'About Me',
    aboutP1: 'Hello! I\'m Agnaldo and I\'ve been building and operating tech infrastructure since 2010. My journey began running networks, bare-metal servers, and datacenters at the <strong>Federal University of Pará (UFPA)</strong> and <strong>FADESP</strong>, establishing 8 years of solid foundations in Linux, DNS, TCP/IP routing, and monitoring before moving to the cloud.',
    aboutP2: 'Today, my focus is architecting and running resilient production platforms in environments where every minute of downtime carries a direct financial cost. I work with <strong>Elo (Project RISE)</strong> operating Kubernetes across four clouds (AWS, Azure, GCP, and Huawei Cloud), with <strong>Istio Service Mesh</strong>, edge routing via Azure Front Door, and continuous GitOps delivery using <strong>ArgoCD</strong>.',
    aboutP3: 'My core philosophy is: <em>reliability that lives only in the infrastructure team is reliability that doesn\'t scale</em>. I partner closely with engineering teams to define SLIs, SLOs, and error budgets that hold up when production disagrees with the plan.',
    aboutTechIntro: 'Here are a few technologies I\'ve been working with recently:',

    jobsHeading: 'Where I\'ve Worked',

    projectsHeading: 'Some Things I\'ve Built',
    featTag: 'Featured Project',
    crosswatcText: 'Developer Experience (DevX) and Infrastructure Lifecycle Management platform operating over GitOps (<strong>GitHub → Argo CD → Crossplane → Cloud</strong>). Delivers self-service cloud abstractions without exposing raw cluster manifests to product developers.',
    mcpText: 'A strictly read-only Model Context Protocol (MCP) server in Go that exposes deterministic, sanitised Kubernetes facts to AI agents. Eliminates <code>--event-ttl</code> silence ambiguity by declaring covered timeframes, with permission checks via <code>SelfSubjectAccessReview</code>.',
    sreiaText: 'An open-source living book and runnable laboratory suite for SREs and platform engineers implementing operational AI with executable code, local Kind clusters, Prometheus, Grafana, Loki, and Qdrant vector retrieval.',

    contactPre: '04. What\'s Next?',
    contactTitle: 'Get In Touch',
    contactBody: 'My inbox is always open. Whether you have a question or want to discuss Kubernetes platforms, GitOps with ArgoCD, telemetry, or production reliability challenges, I\'ll do my best to get back to you!',
    contactBtn: 'Say Hello'
  }
};

function initLanguage() {
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('language') || 'pt';

  function updateTexts(lang) {
    const dict = translations[lang] || translations.pt;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    if (langToggle) {
      langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';
      langToggle.setAttribute('aria-label', lang === 'pt' ? 'Switch to English' : 'Mudar para Português');
    }
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
  }

  updateTexts(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('language', currentLang);
      updateTexts(currentLang);
    });
  }
}

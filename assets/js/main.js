/**
 * Agnaldo Marinho - SRE / Platform Engineer
 * Interactive portfolio scripts: Theme toggle, Language switcher, SRE Error Budget Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initCalculator();
  initEmailCopy();
  initMobileNav();
  initFooterYear();
});

function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   Theme Management (Following Modern Web Guidance)
   ========================================================================== */
function initTheme() {
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getSystemScheme() {
    return systemPrefersDark.matches ? 'dark' : 'light';
  }

  function applyTheme(theme, isUserAction = false) {
    const resolvedTheme = (theme === 'system' || !theme) ? getSystemScheme() : theme;

    document.documentElement.setAttribute('data-theme', resolvedTheme);
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', theme === 'system' || !theme ? 'dark light' : resolvedTheme);
    }

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.innerHTML = resolvedTheme === 'dark'
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
    }

    if (isUserAction) {
      if (theme === getSystemScheme()) {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', theme);
      }
    }
  }

  // Initial theme application (default to dark if system or unset)
  applyTheme(storedTheme || 'dark');

  // React to system preference changes if user hasn't explicitly overridden
  systemPrefersDark.addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      applyTheme('system');
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentResolved = document.documentElement.getAttribute('data-theme') || 'dark';
      const targetTheme = currentResolved === 'dark' ? 'light' : 'dark';
      applyTheme(targetTheme, true);
    });
  }
}

/* ==========================================================================
   Internationalization (EN / PT-BR)
   ========================================================================== */
const translations = {
  en: {
    statusText: 'All Systems Operational • 99.99%',
    navAbout: 'About',
    navSkills: 'Skills & Stack',
    navExperience: 'Platform Work',
    navCalculator: 'SLO Calculator',
    navProjects: 'Projects',
    navContact: 'Contact',
    heroEyebrow: '16 Years in IT • 8+ Years Production Platforms',
    heroTitle: 'Resilient platforms that survive when production disagrees with the plan.',
    heroSubtitle: 'I work with Kubernetes across AWS, Azure, GCP and Huawei Cloud. I care most about the part most teams skip: <strong>SLIs, SLOs and error budgets that hold up under pressure.</strong>',
    ctaContact: 'Get in Touch',
    ctaExplore: 'Explore Work',
    ctaCalc: 'Calculate Error Budget',
    metricYearsIt: 'Years in IT',
    metricYearsItDesc: 'Enterprise & systems experience',
    metricYearsPlatform: 'Years Platform/SRE',
    metricYearsPlatformDesc: 'Building & running platforms',
    metricClouds: 'Major Clouds',
    metricCloudsDesc: 'AWS, Azure, GCP & Huawei Cloud',
    metricSloFocus: 'SLO-Driven',
    metricSloFocusDesc: 'Burn-rate alerts & error budgets',
    skillsTag: 'Capabilities & Tooling',
    skillsTitle: 'What I Work With Daily',
    skillsDesc: 'Production-tested tools and frameworks for zero-downtime platforms and automated operations.',
    catOrch: 'Orchestration & Compute',
    catIac: 'Infrastructure as Code',
    catObs: 'Observability & Telemetry',
    catDel: 'Continuous Delivery & GitOps',
    catRel: 'Reliability & SRE Practice',
    catLang: 'Languages & Automation',
    expTag: 'Real-World Impact',
    expTitle: 'Production Platform Engineering',
    expDesc: 'Architecture, high-throughput migrations, and reliability engineering in demanding production environments.',
    case1Title: 'High-Throughput Payments Platform (Multi-Cloud K8s)',
    case1Summary: 'Engineered and operated multi-cluster Kubernetes infrastructure running mission-critical payment services across clouds with automated failover and zero-downtime rolling deploys.',
    case1B1: 'Multi-cluster Kubernetes across AWS (EKS) and Huawei Cloud (CCE) with unified networking.',
    case1B2: 'Terragrunt-based modular IaC automating multi-region VPCs, IAM policies, and cluster topologies.',
    case1B3: 'OpenTelemetry instrumentation and Datadog APM tracing for sub-second transaction visibility.',
    case2Title: 'Enterprise Delivery Migration (Azure DevOps to GitHub Actions)',
    case2Summary: 'Architected and executed full platform migration from legacy Azure DevOps pipelines to modern GitHub Actions with reusable security workflows and GitOps delivery via ArgoCD.',
    case2B1: 'Over 50+ services migrated with zero developer workflow interruption.',
    case2B2: 'Standardized security scanning (SAST, Trivy container scanning, secret detection) gate-checks.',
    case2B3: 'ArgoCD GitOps deployment pattern with automated drift detection and instant rollback.',
    case3Title: 'Production SLIs, SLOs & Multi-Window Burn-Rate Alerting',
    case3Summary: 'Eliminated alert fatigue by replacing static threshold alerts (CPU/Memory 80%) with multi-window, multi-burn-rate alerting based on real user experience and customer pain.',
    case3B1: 'Defined core user journey SLIs: availability (% of HTTP 2xx/3xx) and latency (95th/99th percentile).',
    case3B2: 'Deployed Google SRE-style multi-window burn-rate alerts (1h / 6h / 3d windows) in Prometheus & Grafana.',
    case3B3: 'Established error budget governance: feature freeze policies negotiated with product management.',
    calcTag: 'Interactive Engineering Tool',
    calcTitle: 'SRE Error Budget & Downtime Calculator',
    calcDesc: 'Experiment with availability targets and inspect real allowed downtime and burn-rate numbers.',
    calcLabelSlo: 'Select Target SLO (%):',
    calcLabelWindow: 'Time Window:',
    calcWindow30: '30 Days (Rolling Month)',
    calcWindow90: '90 Days (Quarter)',
    calcWindow365: '365 Days (Annual)',
    calcResAllowed: 'Allowed Downtime',
    calcResTotalReq: 'Error Budget (30d)',
    calcResFastBurn: 'Fast-Burn Alert (14.4x)',
    calcInsight: '<strong>SRE Insight:</strong> A 99.9% SLO allows ~43 mins of downtime per month. Rather than alerting on single spike minutes, a 14.4x burn-rate alert triggers only when 2% of your monthly budget burns in 1 hour — virtually eliminating false positives.',
    projectsTag: 'Open Source & Writing',
    projectsTitle: 'What I\'m Building & Sharing',
    projectsDesc: 'Practical toolkits and unfiltered essays on reliability engineering in the real world.',
    proj1Status: 'In Development',
    proj1Title: 'k8s-slo-toolkit',
    proj1Desc: 'SLI definitions, error budget math and multi-window burn-rate alerts ready to drop into a Kubernetes cluster with Prometheus/Grafana.',
    proj2Status: 'Upcoming Series',
    proj2Title: 'Error Budget in the Real World',
    proj2Desc: 'A series on what the SRE book leaves out: choosing an SLI, defending the number to leadership, and the hard conversation that happens when the budget runs out.',
    contactTitle: 'Let\'s Discuss Platform Engineering & Reliability',
    contactDesc: 'Always interested in discussions around Kubernetes, Terraform scale, observability architectures, and production reliability.',
    copyEmail: 'Copy',
    copiedText: 'Copied to clipboard!',
    footerText: 'Built with semantic HTML5, modern CSS & JS • Zero dependencies • Deployed via GitHub Pages'
  },
  pt: {
    statusText: 'Sistemas Operacionais • 99.99%',
    navAbout: 'Sobre',
    navSkills: 'Skills & Stack',
    navExperience: 'Plataforma',
    navCalculator: 'Calculadora SLO',
    navProjects: 'Projetos',
    navContact: 'Contato',
    heroEyebrow: '16 Anos em TI • 8+ Anos em Plataformas de Produção',
    heroTitle: 'Plataformas resilientes que suportam quando a produção discorda do plano.',
    heroSubtitle: 'Trabalho com Kubernetes em AWS, Azure, GCP e Huawei Cloud. Foco na parte que a maioria dos times negligencia: <strong>SLIs, SLOs e orçamentos de erro que resistem à pressão.</strong>',
    ctaContact: 'Fale Comigo',
    ctaExplore: 'Ver Experiência',
    ctaCalc: 'Calcular Error Budget',
    metricYearsIt: 'Anos em TI',
    metricYearsItDesc: 'Experiência sólida em sistemas',
    metricYearsPlatform: 'Anos em Plataforma/SRE',
    metricYearsPlatformDesc: 'Construindo e operando plataformas',
    metricClouds: 'Nuvens Principais',
    metricCloudsDesc: 'AWS, Azure, GCP e Huawei Cloud',
    metricSloFocus: 'Foco em SLOs',
    metricSloFocusDesc: 'Alertas por burn-rate e confiabilidade',
    skillsTag: 'Capacidades e Ferramental',
    skillsTitle: 'O Que Utilizo no Dia a Dia',
    skillsDesc: 'Ferramentas e frameworks testados em produção para plataformas de alta disponibilidade e operações automatizadas.',
    catOrch: 'Orquestração & Computação',
    catIac: 'Infraestrutura como Código',
    catObs: 'Observabilidade & Telemetria',
    catDel: 'Entrega Contínua & GitOps',
    catRel: 'Práticas de Confiabilidade & SRE',
    catLang: 'Linguagens & Automação',
    expTag: 'Impacto Real',
    expTitle: 'Engenharia de Plataforma em Produção',
    expDesc: 'Arquitetura, migrações de alta escala e engenharia de confiabilidade em ambientes críticos.',
    case1Title: 'Plataforma de Pagamentos de Alto Volume (K8s Multi-Cloud)',
    case1Summary: 'Projetei e operei infraestrutura Kubernetes multi-cluster executando serviços críticos de pagamento entre nuvens com failover automatizado e deploys sem downtime.',
    case1B1: 'Kubernetes multi-cluster em AWS (EKS) e Huawei Cloud (CCE) com rede unificada.',
    case1B2: 'IaC modular com Terragrunt automatizando VPCs multi-região, políticas IAM e topologias de cluster.',
    case1B3: 'Instrumentação com OpenTelemetry e APM no Datadog para rastreabilidade sub-segundo de transações.',
    case2Title: 'Migração de Entrega Enterprise (Azure DevOps para GitHub Actions)',
    case2Summary: 'Arquitetei e executei migração completa da plataforma de pipelines legados do Azure DevOps para GitHub Actions moderno com workflows de segurança reutilizáveis e GitOps via ArgoCD.',
    case2B1: 'Mais de 50 serviços migrados com zero interrupção no fluxo de desenvolvimento dos times.',
    case2B2: 'Verificações automatizadas de segurança (SAST, scan de containers com Trivy e detecção de secrets).',
    case2B3: 'Padrão GitOps com ArgoCD com detecção de desvio (drift) e rollback instantâneo.',
    case3Title: 'SLIs, SLOs em Produção & Alertas por Burn-Rate Multi-Janela',
    case3Summary: 'Eliminei fadiga de alertas substituindo métricas estáticas de limiar (CPU 80%) por alertas de taxa de queima (burn-rate) baseados na experiência real do usuário.',
    case3B1: 'Definição de SLIs de jornadas essenciais: disponibilidade (% HTTP 2xx/3xx) e latência (p95 e p99).',
    case3B2: 'Alertas de taxa de queima multi-janela (1h, 6h, 3d) padrão Google SRE configurados no Prometheus e Grafana.',
    case3B3: 'Governança de orçamento de erro: políticas de congelamento de features alinhadas com produto.',
    calcTag: 'Ferramenta de Engenharia',
    calcTitle: 'Calculadora de SLO & Orçamento de Erro',
    calcDesc: 'Experimente metas de disponibilidade e veja o tempo real de downtime tolerado e taxas de consumo.',
    calcLabelSlo: 'Escolha o SLO Alvo (%):',
    calcLabelWindow: 'Janela de Tempo:',
    calcWindow30: '30 Dias (Mês Móvel)',
    calcWindow90: '90 Dias (Trimestre)',
    calcWindow365: '365 Dias (Anual)',
    calcResAllowed: 'Downtime Permitido',
    calcResTotalReq: 'Orçamento de Erro (30d)',
    calcResFastBurn: 'Alerta Fast-Burn (14.4x)',
    calcInsight: '<strong>Visão de SRE:</strong> Um SLO de 99.9% permite ~43 minutos de downtime por mês. Em vez de acordar o plantonista por uma oscilação momentânea, o alerta de 14.4x só dispara se 2% do orçamento mensal queimar em 1 hora — reduzindo drasticamente falsos positivos.',
    projectsTag: 'Código Aberto e Artigos',
    projectsTitle: 'O Que Estou Construindo & Compartilhando',
    projectsDesc: 'Ferramentas práticas e artigos diretos sobre engenharia de confiabilidade na vida real.',
    proj1Status: 'Em Desenvolvimento',
    proj1Title: 'k8s-slo-toolkit',
    proj1Desc: 'Definições de SLI, matemática de orçamentos de erro e alertas de taxa de queima multi-janela prontos para implantar em clusters Kubernetes com Prometheus/Grafana.',
    proj2Status: 'Próxima Série',
    proj2Title: 'Error Budget no Mundo Real',
    proj2Desc: 'Uma série sobre o que o livro do SRE não conta: escolher um SLI, defender o número com a liderança e a conversa difícil quando o orçamento esgota.',
    contactTitle: 'Vamos Conversar sobre Engenharia de Plataforma e Confiabilidade',
    contactDesc: 'Sempre disponível para trocar ideias sobre Kubernetes, escala com Terraform, arquiteturas de observabilidade e confiabilidade em produção.',
    copyEmail: 'Copiar',
    copiedText: 'Copiado para a área de transferência!',
    footerText: 'Desenvolvido com HTML5 semântico, CSS & JS modernos • Zero dependências • Hospedado no GitHub Pages'
  }
};

function initLanguage() {
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('language') || 'en';

  function updateTexts(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'PT' : 'EN';
      langToggle.setAttribute('aria-label', lang === 'en' ? 'Mudar para Português' : 'Switch to English');
    }
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
  }

  updateTexts(currentLang);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'pt' : 'en';
      localStorage.setItem('language', currentLang);
      updateTexts(currentLang);
    });
  }
}

/* ==========================================================================
   Interactive SRE Error Budget Calculator
   ========================================================================== */
function initCalculator() {
  const sloBtns = document.querySelectorAll('.slo-btn');
  const windowSelect = document.getElementById('calc-window');
  const downtimeEl = document.getElementById('calc-downtime');
  const budgetPctEl = document.getElementById('calc-budget-pct');
  const burnRateEl = document.getElementById('calc-burn-rate');

  let currentSlo = 99.9;

  function calculate() {
    const days = parseInt(windowSelect ? windowSelect.value : '30', 10);
    const totalMinutes = days * 24 * 60;
    const errorBudgetPct = (100 - currentSlo);
    const allowedDowntimeMinutes = totalMinutes * (errorBudgetPct / 100);

    // Format allowed downtime
    const hours = Math.floor(allowedDowntimeMinutes / 60);
    const minutes = Math.floor(allowedDowntimeMinutes % 60);
    const seconds = Math.round((allowedDowntimeMinutes - Math.floor(allowedDowntimeMinutes)) * 60);

    let formattedDowntime = '';
    if (hours > 0) formattedDowntime += `${hours}h `;
    if (minutes > 0 || hours > 0) formattedDowntime += `${minutes}m `;
    formattedDowntime += `${seconds}s`;

    if (downtimeEl) downtimeEl.textContent = formattedDowntime.trim();
    if (budgetPctEl) budgetPctEl.textContent = `${errorBudgetPct.toFixed(2)}%`;

    // Fast-burn alert time for 2% budget in 1 hour (14.4x burn rate)
    const twoPercentBurnMinutes = allowedDowntimeMinutes * 0.02;
    const fastBurnSecs = Math.round(twoPercentBurnMinutes * 60);
    const fbM = Math.floor(fastBurnSecs / 60);
    const fbS = fastBurnSecs % 60;

    let fastBurnText = '';
    if (fbM > 0) fastBurnText += `${fbM}m `;
    fastBurnText += `${fbS}s in 1h`;

    if (burnRateEl) {
      burnRateEl.textContent = fastBurnText;
      burnRateEl.classList.toggle('warning', currentSlo >= 99.99);
    }
  }

  sloBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sloBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSlo = parseFloat(btn.dataset.slo);
      calculate();
    });
  });

  if (windowSelect) {
    windowSelect.addEventListener('change', calculate);
  }

  calculate();
}

/* ==========================================================================
   Email Copy & Toast Notification
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'agnaldomarinho7@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      showToast();
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  });

  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ==========================================================================
   Mobile Nav Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

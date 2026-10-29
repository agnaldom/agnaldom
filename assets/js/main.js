/**
 * Agnaldo Marinho — SRE & Platform Engineer
 * Brittany Chiang style interactions: Mouse spotlight, scroll observer, theme & i18n
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlight();
  initScrollNav();
  initTheme();
  initLanguage();
  initEmailCopy();
});

/* ==========================================================================
   1. Mouse Spotlight Tracker (Brittany Chiang Signature Effect)
   ========================================================================== */
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  // Track pointer movements across the viewport
  window.addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/* ==========================================================================
   2. Scroll Nav Indicator (IntersectionObserver)
   ========================================================================== */
function initScrollNav() {
  const navLinks = document.querySelectorAll('.nav-item-link');
  const sections = document.querySelectorAll('.content-section');

  if (!navLinks.length || !sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('data-target') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Smooth scroll click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   3. Theme Management (W3C standard with color-scheme)
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
          ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
          : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
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

  applyTheme(storedTheme || 'dark');

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
   4. Internationalization (PT / EN)
   ========================================================================== */
const translations = {
  pt: {
    authorRole: 'Especialista DevOps / SRE • Cloud • Plataforma',
    authorLead: 'Construo plataformas resilientes em Kubernetes multi-cloud e observabilidade de alta disponibilidade onde indisponibilidade custa caro.',
    navAbout: 'Sobre',
    navExperience: 'Experiência',
    navProjects: 'Projetos',
    navPostmortem: 'Postmortem',
    navSkills: 'Competências',
    navEducation: 'Formação',

    aboutP1: 'Sou especialista em DevOps e SRE com <strong>16 anos de carreira em TI</strong>, sendo 8 dedicados a plataformas de produção em ambientes onde cada minuto de indisponibilidade tem custo financeiro direto — meios de pagamento (<strong>Elo</strong>), adquirência (<strong>Redecard</strong>), saúde de missão crítica (<strong>Hospital Albert Einstein</strong>), energia (<strong>Raízen</strong>) e indústria (<strong>Gerdau</strong>).',
    aboutP2: 'Minha base técnica é <strong>observabilidade e resolução metódica de incidentes</strong>. Opero monitoramento desde 2017 e hoje projeto arquiteturas de telemetria com <strong>Datadog, Prometheus, Grafana, Loki e OpenTelemetry</strong> — métricas, logs, traces distribuídos, Synthetic Monitoring e alertas de baixa taxa de falso-positivo, sustentando <strong>SLIs, SLOs e orçamentos de erro</strong> que resistem à realidade da produção.',
    aboutP3: 'Antes da nuvem, acumulei <strong>8 anos de administração de Linux, redes e datacenters</strong> na UFPA e FADESP. Automatizo com <strong>Terraform</strong> (meu padrão de IaC desde 2018), <strong>Kubernetes</strong> (EKS, AKS, GKE, CCE), entrega contínua com <strong>GitOps (ArgoCD)</strong> e desenvolvo ferramentas em <strong>Go, Python e Shell</strong>. Assumo a confiabilidade da infraestrutura colado aos times de desenvolvimento: <em>confiabilidade que vive só no time de infraestrutura é confiabilidade que não escala</em>.',

    exp1Title: 'Site Reliability Engineer — Especialista • 200dev (Elo)',
    exp1Desc: 'Responsável pela disponibilidade, resiliência e escala de microsserviços em meios de pagamento. Conduzi a migração do ingress-nginx para <strong>Istio Service Mesh</strong> (Gateway, HTTPRoute, DestinationRule). Opero a camada de borda: <strong>Azure Front Door</strong> (WAF, roteamento global), <strong>Azure APIM</strong> e CDN. Conduzi a migração dos pipelines de infraestrutura para <strong>GitHub Actions</strong> e evoluí a observabilidade com Datadog, Prometheus, Loki e OpenTelemetry.',

    exp2Title: 'Site Reliability Engineer — Especialista • Provider IT (Elo)',
    exp2Desc: 'Responsabilidade ponta a ponta pela infraestrutura em <strong>quatro nuvens</strong>: AWS (EKS), Azure (AKS), Google Cloud (GKE) e Huawei Cloud (CCE) provisionadas com Terraform. Implantei entrega contínua GitOps com <strong>ArgoCD</strong>. Operei mensageria com <strong>Apache Kafka</strong>, Amazon SQS e Azure Service Bus. Elevei a maturidade de monitoramento com Datadog e OpenTelemetry, definindo SLI, SLO e error budgets em produção.',

    exp3Title: 'Site Reliability Engineer — Especialista • Cortex',
    exp3Desc: 'Projetei e implementei clusters Amazon ECS para orquestração de containers com foco em escalabilidade e resiliência. Construí pipelines padronizados de CI/CD para deploy automatizado e conduzi PoCs de automação orientando a adoção do Amazon EKS na empresa.',

    exp4Title: 'DevOps Engineer • Raízen',
    exp4Desc: 'Revisei e evoluí a arquitetura AWS, provisionando novos ambientes com Terraform e pipelines de IaC. Gerenciei containers com Kubernetes (deploy, auto-scaling, segurança e observabilidade) e integrei SonarQube definindo quality gates para barrar código antes da produção.',

    exp5Title: 'Senior DevOps Engineer • Hospital Israelita Albert Einstein',
    exp5Desc: 'Operação de infraestrutura AWS de missão crítica em saúde onde indisponibilidade afeta procedimentos clínicos e financeiros. Automatizei provisionamento com Terraform, implantei <strong>Teleport</strong> para acesso privilegiado auditável e conduzi redução de custos com rightsizing e Trusted Advisor.',

    exp6Title: 'SysAdmin de Datacenter & Redes • CTIC/UFPA & FADESP',
    exp6Desc: 'Administração de servidores físicos, hypervisors Xen e virtualização por containers Docker. Diagnóstico de DNS, roteamento TCP/IP, switching, proxies reversos (Nginx/Apache), bancos de dados (MySQL, PostgreSQL, Oracle) e projeto de monitoramento com Zabbix e Grafana.',

    crosswatcDesc: 'Plataforma de Developer Experience (DevX) e gerenciamento de ciclo de vida sobre GitOps (<strong>GitHub → Argo CD → Crossplane → Cloud</strong>). Fornece abstrações de autosserviço para times de produto sem expor a complexidade de manifests Kubernetes brutos. Construído com API em Go (Gin), workers de reconciliação em Go, migrations PostgreSQL e frontend em Next.js.',
    mcpDesc: 'Servidor Model Context Protocol (MCP) em Go <strong>estritamente read-only</strong> que entrega fatos estruturados e auditáveis de Kubernetes para agentes de IA. Elimina a ambiguidade do <code>--event-ttl</code> declarando explicitamente a janela temporal coberta, e substitui palpites subjetivos por regras determinísticas declaradas. Zero mutações acidentais via <code>SelfSubjectAccessReview</code>.',
    sreiaDesc: 'Livro vivo open-source e laboratório executável para times de SRE e DevOps implementarem IA operacional com código real. Inclui ambiente local reproduzível em Kind cluster equipado com Prometheus, Grafana, Loki e cenários de caos, além de busca vetorial com Qdrant para runbooks operacionais.',
    sloDesc: 'Definições de SLIs, matemática de error budgets e regras de taxa de queima multi-janela para Prometheus, prontas para implantar em clusters Kubernetes e erradicar alertas de limiar ruidosos.',

    pmTitle: 'Caso de Causa Raiz: Handshake TCP 443 sem ACK',
    pmBadge: 'MTTR: 45 min • Severidade Crítica',
    pmSymptomHead: 'Sintoma em Produção',
    pmSymptomBody: 'Num deploy de microsserviço, os pods entraram imediatamente em CrashLoopBackOff. A hipótese preliminar da equipe recaía sobre o Redis, dependência compartilhada crítica.',
    pmMethodHead: 'Método de Isolamento',
    pmMethodBody: 'Testes isolados descartaram o Redis (saudável). Testando as dependências externas individualmente, descobriu-se que o DNS resolvia o endpoint de autenticação, mas o handshake TCP SYN na porta 443 travava sem fechar.',
    pmRootHead: 'Causa Raiz Real',
    pmRootBody: 'A aplicação havia sido alocada numa nova subnet e node pool da nuvem que ainda não possuíam as regras de segurança de saída (egress) liberadas na rede.',
    pmPreventionHead: 'Prevenção e Alarmística',
    pmPreventionBody: 'Regras de rede liberadas com MTTR de 45 minutos. Implantação imediata de monitoramento sintético (Synthetic Monitoring) das dependências críticas e alarmes preventivos de Pods NotReady.',

    skillsCatObs: 'Observabilidade & Monitoramento',
    skillsCatOrch: 'Kubernetes & Infraestrutura Cloud',
    skillsCatIac: 'Infraestrutura como Código & GitOps',
    skillsCatRel: 'SRE, Redes & Sistemas',
    skillsCatLang: 'Linguagens & Automação',

    eduArch: 'Especialização em Arquitetura de Software',
    eduIfam: 'Técnico em Informática',

    footerNote: 'Desenvolvido com foco em tipografia limpa e sem dependências pesadas. Construído em HTML5, CSS moderno e JavaScript puro. Hospedado no GitHub Pages. Design inspirado na estética de Brittany Chiang.',
    toastCopied: 'E-mail copiado para a área de transferência'
  },

  en: {
    authorRole: 'DevOps / SRE Specialist • Cloud • Platform',
    authorLead: 'I build resilient multi-cloud Kubernetes platforms and high-availability observability where downtime carries a direct financial cost.',
    navAbout: 'About',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navPostmortem: 'Postmortem',
    navSkills: 'Skills',
    navEducation: 'Education',

    aboutP1: 'DevOps & SRE Specialist with <strong>16 years in IT</strong>, dedicating the last 8 years to building and running production platforms in environments where downtime translates directly to financial loss — payments (<strong>Elo</strong>), acquiring (<strong>Redecard</strong>), critical healthcare (<strong>Albert Einstein Hospital</strong>), energy (<strong>Raízen</strong>), and manufacturing (<strong>Gerdau</strong>).',
    aboutP2: 'My core foundation is <strong>observability and methodical root cause analysis</strong>. Running monitoring systems since 2017, I now architect telemetry systems using <strong>Datadog, Prometheus, Grafana, Loki, and OpenTelemetry</strong> — metrics, logs, distributed tracing, Synthetic Monitoring, and low-noise alerting, sustaining <strong>SLIs, SLOs, and error budgets</strong> that withstand real-world production incidents.',
    aboutP3: 'Before cloud computing, I spent <strong>8 years in Linux administration, datacenter operations, and networking</strong> at UFPA and FADESP. I automate with <strong>Terraform</strong> (my IaC standard since 2018), <strong>Kubernetes</strong> (EKS, AKS, GKE, CCE), continuous GitOps delivery with <strong>ArgoCD</strong>, and write automation tools in <strong>Go, Python, and Shell</strong>. I partner closely with product development teams: <em>reliability that lives only in the infrastructure team is reliability that doesn\'t scale</em>.',

    exp1Title: 'Site Reliability Engineer — Specialist • 200dev (Elo)',
    exp1Desc: 'Responsible for availability, resilience, and scale of high-throughput payment microservices. Migrated ingress-nginx to <strong>Istio Service Mesh</strong> (Gateway, HTTPRoute, DestinationRule). Operates edge architecture: <strong>Azure Front Door</strong> (WAF, global routing), <strong>Azure APIM</strong>, and CDN. Migrated infrastructure delivery to <strong>GitHub Actions</strong> and evolved telemetry with Datadog, Prometheus, Loki, and OpenTelemetry.',

    exp2Title: 'Site Reliability Engineer — Specialist • Provider IT (Elo)',
    exp2Desc: 'End-to-end platform infrastructure responsibility across <strong>four clouds</strong>: AWS (EKS), Azure (AKS), Google Cloud (GKE), and Huawei Cloud (CCE) provisioned with Terraform. Deployed continuous GitOps delivery with <strong>ArgoCD</strong>. Managed asynchronous messaging using <strong>Apache Kafka</strong>, Amazon SQS, and Azure Service Bus. Defined production SLIs, SLOs, and error budgets.',

    exp3Title: 'Site Reliability Engineer — Specialist • Cortex',
    exp3Desc: 'Designed and deployed Amazon ECS clusters for scalable container orchestration and application resilience. Standardized automated CI/CD deployment pipelines across product teams and conducted automation PoCs leading to Amazon EKS adoption.',

    exp4Title: 'DevOps Engineer • Raízen',
    exp4Desc: 'Architected and provisioned AWS environments through modular Terraform and IaC pipelines. Managed Kubernetes workloads (deployments, autoscaling, security, and telemetry) and integrated SonarQube quality gates to block defective code before production.',

    exp5Title: 'Senior DevOps Engineer • Hospital Israelita Albert Einstein',
    exp5Desc: 'Operated mission-critical healthcare AWS infrastructure where downtime impacts clinical procedures and financial flows. Automated provisioning with Terraform, implemented <strong>Teleport</strong> for auditable privileged session access, and drove cost optimization via rightsizing and Trusted Advisor.',

    exp6Title: 'Datacenter & Network SysAdmin • CTIC/UFPA & FADESP',
    exp6Desc: 'Administered bare-metal servers, Xen hypervisors, and container virtualization with Docker. Troubleshot DNS, TCP/IP routing, switching, reverse proxies (Nginx/Apache), relational databases (MySQL, PostgreSQL, Oracle), and designed network monitoring with Zabbix and Grafana.',

    crosswatcDesc: 'Developer Experience (DevX) and Infrastructure Lifecycle Management platform operating over GitOps (<strong>GitHub → Argo CD → Crossplane → Cloud</strong>). Delivers self-service cloud abstractions without exposing raw cluster manifests to product developers. Engineered with a Go Gin API, Go reconciliation workers, PostgreSQL, and Next.js.',
    mcpDesc: 'Strictly read-only Model Context Protocol (MCP) server in Go exposing deterministic, sanitised Kubernetes facts to AI agents. Eliminates <code>--event-ttl</code> silence ambiguity by explicitly declaring covered timeframes and substitutes subjective opinions with declared rules. Zero accidental mutations via <code>SelfSubjectAccessReview</code>.',
    sreiaDesc: 'Open-source living book and runnable laboratory suite for SREs and platform engineers implementing operational AI with executable code. Features an automated local testing lab (Kind cluster with Prometheus, Grafana, Loki, and chaos scenarios) plus Qdrant vector retrieval for incident playbooks.',
    sloDesc: 'Production-ready SLI definitions, error budget mathematical formulas, and multi-window burn-rate Prometheus alerting rules ready to deploy into Kubernetes clusters to eliminate threshold alert fatigue.',

    pmTitle: 'Root Cause Case: TCP 443 Handshake Stall without ACK',
    pmBadge: 'MTTR: 45 min • Critical Severity',
    pmSymptomHead: 'Production Symptom',
    pmSymptomBody: 'Following a microservice deployment, pods immediately entered a CrashLoopBackOff restart loop. Preliminary team assumption pointed to Redis failure, a shared critical dependency.',
    pmMethodHead: 'Isolation Method',
    pmMethodBody: 'Isolated health tests proved Redis was fully operational. Testing outbound dependencies individually revealed DNS resolved the auth endpoint, but TCP SYN on port 443 stalled with zero ACK response.',
    pmRootHead: 'True Root Cause',
    pmRootBody: 'The service had been scheduled onto a new cloud subnet and node pool where security group egress rules had not yet been provisioned in the network infrastructure.',
    pmPreventionHead: 'Prevention & Safeguards',
    pmPreventionBody: 'Egress rules applied within 45 minutes MTTR. Deployed immediate synthetic dependency monitoring, Pod NotReady alarms, and container restart rate tripwires.',

    skillsCatObs: 'Observability & Monitoring',
    skillsCatOrch: 'Kubernetes & Cloud Infrastructure',
    skillsCatIac: 'Infrastructure as Code & GitOps',
    skillsCatRel: 'SRE, Networking & Systems',
    skillsCatLang: 'Languages & Automation',

    eduArch: 'Software Architecture Specialization',
    eduIfam: 'Computer Science Diploma',

    footerNote: 'Engineered with clean typography and zero heavy dependencies. Built with semantic HTML5, modern CSS, and vanilla JS. Hosted on GitHub Pages. Design inspired by Brittany Chiang.',
    toastCopied: 'Email copied to clipboard'
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

/* ==========================================================================
   5. Email Copy & Toast
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async (e) => {
    // If user clicked mailto link, let mail client open or copy to clipboard
    const email = 'agnaldomarinho7@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      }
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  });
}

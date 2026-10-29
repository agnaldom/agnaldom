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
   Internationalization (EN / PT-BR)
   ========================================================================== */
const translations = {
  en: {
    statusText: 'All Systems Operational • 99.99%',
    navAbout: 'About',
    navProjects: 'Projects & OSS',
    navCaseStudy: 'Root Cause Case',
    navSkills: 'Skills & Stack',
    navExperience: 'Platform Work',
    navCalculator: 'SLO Calculator',
    navCerts: 'Certifications',
    navContact: 'Contact',

    heroEyebrow: '16 Years in IT • 8+ Years SRE & Cloud Platforms',
    heroRemote: '100% Remote (Brazil) • English & Spanish Working Proficiency',
    heroTitle: 'Resilient platforms that survive when production disagrees with the plan.',
    heroSubtitle: 'SRE & DevOps Specialist operating Kubernetes across AWS, Azure, GCP and Huawei Cloud. My core foundation is observability, troubleshooting, and production-tested <strong>SLIs, SLOs and error budgets that hold up under pressure.</strong>',
    sectorsLabel: 'Production experience in environments where downtime has direct financial & clinical cost:',
    sectorPay: 'Payments & Acquiring: <strong>Elo & Redecard</strong>',
    sectorHealth: 'Critical Healthcare: <strong>Albert Einstein Hospital</strong>',
    sectorEnergy: 'Energy & Commodities: <strong>Raízen</strong>',
    sectorInd: 'Manufacturing & Steel: <strong>Gerdau</strong>',

    ctaContact: 'Get in Touch',
    ctaProjects: 'View Autonomous Projects',
    ctaCalc: 'Calculate Error Budget',

    metricYearsIt: 'Years in IT',
    metricYearsItDesc: '8y Datacenter/Linux + 8y SRE',
    metricYearsPlatform: 'Years Platform/SRE',
    metricYearsPlatformDesc: 'Fintechs, health & multicloud',
    metricClouds: 'Major Clouds',
    metricCloudsDesc: 'AWS, Azure, GCP & Huawei Cloud',
    metricSloFocus: 'SLO-Driven SRE',
    metricSloFocusDesc: 'Burn-rate alerts & error budgets',

    // Featured Projects
    ossTag: 'Engineering & Open Source',
    ossTitle: 'Autonomous Platforms & AI Tools',
    ossDesc: 'Production-ready architectures, Developer Platforms (IDP), and AI systems for Kubernetes operations.',
    
    // crosswatc
    crosswatcType: 'DevX & GitOps Platform',
    crosswatcTitle: 'crosswatc',
    crosswatcTagline: 'Developer Experience & Lifecycle Management over GitOps (GitHub → Argo CD → Crossplane → Cloud)',
    crosswatcDesc: 'An internal developer platform (IDP) providing self-service cloud infrastructure abstractions. Built with a Go Gin API and reconciliation workers communicating with Crossplane and ArgoCD, paired with a modern Next.js UI.',
    crosswatcH1: 'Multi-service architecture: Next.js UI, Go Gin API, and autonomous Go reconciler workers.',
    crosswatcH2: 'Direct integration with Argo CD and Crossplane for GitOps-driven cloud resource provisioning.',
    crosswatcH3: 'PostgreSQL migrations and Helm manifests ready for zero-downtime cluster rollouts.',

    // mcp-k8s
    mcpType: 'AI Ops / Kubernetes Tooling',
    mcpTitle: 'mcp-k8s',
    mcpTagline: 'Deterministic, Read-Only Model Context Protocol (MCP) Server in Go for Kubernetes Facts',
    mcpDesc: 'Empowers AI coding assistants and autonomous agents with clean, sanitised, structured Kubernetes cluster facts without hallucinations or ambiguous assumptions.',
    mcpH1: 'Eliminates ambiguity: explicitly declares covered time window vs kube-apiserver --event-ttl.',
    mcpH2: 'Replaces subjective judgment with raw observed data and declared deterministic rules.',
    mcpH3: 'Strictly read-only with explicit SelfSubjectAccessReview permission checking; zero mutation risks.',

    // sre-ia-ops
    sreiaType: 'Living Book & Operational Labs',
    sreiaTitle: 'sre-ia-ops (SRE AI Revolution)',
    sreiaTagline: 'Living Book & Runnable Laboratories for Operational AI in Platform Engineering',
    sreiaDesc: 'An open-source living book and hands-on laboratory environment for SREs and DevOps teams implementing operational AI with real code, runnable labs in Python, and GitHub Actions workflows.',
    sreiaH1: 'Automated local testing lab: Kind cluster equipped with Prometheus, Grafana, Loki, and chaos scenarios.',
    sreiaH2: 'Semantic vector search integration with Qdrant for incident runbooks and operational troubleshooting.',
    sreiaH3: 'Executes repeatable automation recipes for day-one operational readiness and incident response.',

    // Incident Troubleshooting
    tsTag: 'Root Cause Analysis Case Study',
    tsTitle: 'The 45-Minute MTTR Case: TCP 443 Handshake Isolation',
    tsDesc: 'A representative production postmortem demonstrating methodical troubleshooting and blameless prevention.',
    tsBadge: 'Real Production Incident • 45m MTTR',
    tsStep1Title: 'The Symptom',
    tsStep1Desc: 'Following a production rollout, multiple microservice pods entered an immediate CrashLoopBackOff. The obvious culprit was Redis, a shared critical dependency.',
    tsStep2Title: 'The Investigation',
    tsStep2Desc: 'Redis health checks were completely green. Isolating dependencies one by one revealed DNS resolved the auth endpoint, but TCP SYN on port 443 stalled with no ACK.',
    tsStep3Title: 'The Root Cause',
    tsStep3Desc: 'The service had been scheduled on a brand new node pool and subnet where cloud network security egress rules had not yet been provisioned.',
    tsStep4Title: 'Prevention & Alarms',
    tsStep4Desc: 'Egress rules applied within 45 minutes MTTR. Deployed immediate synthetic dependency monitors, Pods NotReady alerts, and container restart rate tripwires to prevent regression.',

    // Skills Matrix
    skillsTag: 'Capabilities & Tooling',
    skillsTitle: 'What I Work With Daily',
    skillsDesc: 'Production-tested tools and frameworks for zero-downtime platforms and automated operations.',
    catOrch: 'Orchestration & Compute',
    catIac: 'Infrastructure as Code',
    catObs: 'Observability & Telemetry',
    catDel: 'Continuous Delivery & GitOps',
    catRel: 'Reliability & SRE Practice',
    catLang: 'Languages & Automation',

    // Platform Work Experience
    expTag: 'Real-World Impact',
    expTitle: 'Production Platform Engineering',
    expDesc: 'Architecture, high-throughput migrations, and reliability engineering in demanding production environments.',
    case1Title: 'High-Throughput Payments Platform (Multi-Cloud K8s @ Elo)',
    case1Summary: 'Engineered and operated multi-cluster Kubernetes infrastructure running mission-critical payment services across clouds with automated failover, Istio Service Mesh, and zero-downtime rolling deploys.',
    case1B1: 'Multi-cluster Kubernetes across AWS (EKS), Azure (AKS), GCP (GKE), and Huawei Cloud (CCE).',
    case1B2: 'Migrated ingress-nginx to Istio Service Mesh (Gateway, HTTPRoute, DestinationRule) for fine-grained L7 traffic control.',
    case1B3: 'Managed border routing & security via Azure Front Door (WAF, global routing), Azure APIM, and Azure CDN.',

    case2Title: 'Enterprise Delivery Migration (Azure DevOps to GitHub Actions)',
    case2Summary: 'Architected and executed full platform migration from legacy Azure DevOps pipelines to modern GitHub Actions with reusable security workflows and GitOps delivery via ArgoCD.',
    case2B1: 'Over 50+ services migrated with zero developer workflow interruption.',
    case2B2: 'Standardized security scanning (SAST, Trivy container scanning, secret detection) and AWS OIDC integration.',
    case2B3: 'ArgoCD GitOps deployment pattern with automated drift detection and instant rollback.',

    case3Title: 'Mission-Critical Healthcare AWS Infrastructure (@ Albert Einstein)',
    case3Summary: 'Operated critical AWS infrastructure where downtime has direct clinical and financial implications, automating compliance and security access.',
    case3B1: 'Deployed Teleport for privileged, auditable session access to production servers, replacing direct bastions.',
    case3B2: 'Automated multicloud provisioning with Terraform modules and implemented rightsizing with AWS Trusted Advisor.',
    case3B3: 'Built internal automation CLI tooling in Python, Go, and Shell for operational tasks.',

    case4Title: '8 Years of Linux & Datacenter Foundations (UFPA & FADESP)',
    case4Summary: 'Deep foundational background in systems engineering, virtualization, and networking before cloud computing.',
    case4B1: 'Managed bare-metal hypervisors (Xen), container virtualization with Docker, and enterprise storage.',
    case4B2: 'Configured core networking: DNS, TCP/IP, BGP/switching, TLS handshakes, and reverse proxies (Nginx, Apache).',
    case4B3: 'Built custom network and server monitoring systems using Zabbix, Grafana, and Shell automation.',

    // SRE Calculator
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

    // Certifications & Education
    certsTag: 'Credentials & Continuous Learning',
    certsTitle: 'Certifications & Architecture Education',
    certsDesc: 'Formal training in distributed software architecture, cloud platforms, and GitOps practices.',
    certGitOps: 'GitOps Certified',
    certGitOpsDesc: 'Codefresh / Argo Project standards & declarative delivery',
    certAwsWell: 'AWS Well-Architected Proficient',
    certAwsWellDesc: 'Reliability, Security, Performance & Cost Optimization',
    certEcs: 'Amazon ECS & Docker on AWS',
    certEcsDesc: 'Container orchestration, networking & task management',
    certApiGw: 'Amazon API Gateway Architecture',
    certApiGwDesc: 'REST & HTTP API management, throttling & security',
    certArch: 'Software Architecture Specialization',
    certArchDesc: 'Full Cycle (DDD, Clean Arch, Hexagonal, Event-Driven & Microservices)',
    certTech: 'Computer Science Diploma (IFAM)',
    certTechDesc: 'Instituto Federal de Educação, Ciência e Tecnologia do Amazonas',

    contactTitle: 'Let\'s Discuss Platform Engineering & Reliability',
    contactDesc: 'Always interested in discussions around Kubernetes, Terraform scale, observability architectures, and production reliability.',
    copyEmail: 'Copy',
    copiedText: 'Copied to clipboard!',
    footerText: 'Built with semantic HTML5, modern CSS & JS • Zero dependencies • Deployed via GitHub Pages'
  },
  pt: {
    statusText: 'Sistemas Operacionais • 99.99%',
    navAbout: 'Sobre',
    navProjects: 'Projetos & OSS',
    navCaseStudy: 'Caso de Causa Raiz',
    navSkills: 'Skills & Stack',
    navExperience: 'Plataforma',
    navCalculator: 'Calculadora SLO',
    navCerts: 'Certificações',
    navContact: 'Contato',

    heroEyebrow: '16 Anos em TI • 8+ Anos em Plataformas SRE & Cloud',
    heroRemote: '100% Remoto (Navegantes/SC) • Inglês e Espanhol Profissional',
    heroTitle: 'Plataformas resilientes que suportam quando a produção discorda do plano.',
    heroSubtitle: 'Especialista DevOps / SRE operando Kubernetes em AWS, Azure, GCP e Huawei Cloud. Minha base é observabilidade, troubleshooting de causa raiz e <strong>SLIs, SLOs e orçamentos de erro que resistem à pressão em produção.</strong>',
    sectorsLabel: 'Experiência em ambientes onde indisponibilidade tem custo financeiro e clínico direto:',
    sectorPay: 'Meios de Pagamento & Adquirência: <strong>Elo & Redecard</strong>',
    sectorHealth: 'Saúde de Missão Crítica: <strong>Hospital Albert Einstein</strong>',
    sectorEnergy: 'Energia & Commodities: <strong>Raízen</strong>',
    sectorInd: 'Indústria & Siderurgia: <strong>Gerdau</strong>',

    ctaContact: 'Fale Comigo',
    ctaProjects: 'Ver Projetos Autorais',
    ctaCalc: 'Calcular Error Budget',

    metricYearsIt: 'Anos em TI',
    metricYearsItDesc: '8a Datacenter/Linux + 8a SRE',
    metricYearsPlatform: 'Anos em Plataforma/SRE',
    metricYearsPlatformDesc: 'Fintechs, saúde e multicloud',
    metricClouds: 'Nuvens Principais',
    metricCloudsDesc: 'AWS, Azure, GCP e Huawei Cloud',
    metricSloFocus: 'SRE Guiado por SLO',
    metricSloFocusDesc: 'Alertas por burn-rate e error budgets',

    // Featured Projects
    ossTag: 'Engenharia & Código Aberto',
    ossTitle: 'Plataformas Autorais & Ferramental de IA',
    ossDesc: 'Arquiteturas prontas para produção, plataformas internas de desenvolvedor (IDP) e sistemas de IA para operações de Kubernetes.',

    // crosswatc
    crosswatcType: 'Plataforma DevX & GitOps',
    crosswatcTitle: 'crosswatc',
    crosswatcTagline: 'Developer Experience e Gestão de Ciclo de Vida sobre GitOps (GitHub → Argo CD → Crossplane → Cloud)',
    crosswatcDesc: 'Uma plataforma interna de desenvolvimento (IDP) que oferece abstrações de infraestrutura como autosserviço. Construída com API em Go (Gin), workers de reconciliação orquestrando Crossplane e ArgoCD, e frontend moderno em Next.js.',
    crosswatcH1: 'Arquitetura multi-serviço: UI Next.js, API Go Gin e workers autônomos de reconciliação em Go.',
    crosswatcH2: 'Integração direta com Argo CD e Crossplane para provisionamento GitOps em nuvens públicas.',
    crosswatcH3: 'Migrations PostgreSQL e manifests Helm preparados para ambientes corporativos resilientes.',

    // mcp-k8s
    mcpType: 'IA Ops / Ferramental Kubernetes',
    mcpTitle: 'mcp-k8s',
    mcpTagline: 'Servidor Model Context Protocol (MCP) em Go Read-Only para Fatos de Kubernetes sem Alucinação',
    mcpDesc: 'Alimenta assistentes e agentes autônomos de IA com dados estruturados, higienizados e auditáveis do cluster Kubernetes, prevenindo conclusões falsas em investigações operacionais.',
    mcpH1: 'Elimina ambiguidade: declara a janela temporal real coberta vs expiração do --event-ttl do k8s.',
    mcpH2: 'Substitui opiniões vagas ("restart alto") por dados brutos e regras determinísticas declaradas.',
    mcpH3: 'Estritamente read-only com validação via SelfSubjectAccessReview; zero risco de mutação acidental.',

    // sre-ia-ops
    sreiaType: 'Living Book & Labs Práticos',
    sreiaTitle: 'sre-ia-ops (SRE AI Revolution)',
    sreiaTagline: 'Livro Vivo e Laboratórios Executáveis para IA Operacional em Engenharia de Plataforma',
    sreiaDesc: 'Um livro aberto e laboratório prático para times de SRE e DevOps implementarem IA operacional com código real, laboratórios executáveis em Python e fluxos de automação nativos do GitHub Actions.',
    sreiaH1: 'Ambiente local completo: cluster Kind com Prometheus, Grafana, Loki e cenários de caos aplicados.',
    sreiaH2: 'Busca vetorial com Qdrant para runbooks operacionais e troubleshooting automatizado.',
    sreiaH3: 'Receitas de automação para acelerar o onboarding operacional e a resposta a incidentes críticos.',

    // Incident Troubleshooting
    tsTag: 'Estudo de Caso de Causa Raiz',
    tsTitle: 'O Caso do TCP 443: Troubleshooting com MTTR de 45 minutos',
    tsDesc: 'Um postmortem representativo de produção demonstrando método de investigação rigoroso e prevenção blameless.',
    tsBadge: 'Incidente Real em Produção • 45m MTTR',
    tsStep1Title: 'O Sintoma',
    tsStep1Desc: 'Num deploy em produção, múltiplos pods entraram em loop de reinício (CrashLoopBackOff). A suspeita imediata e óbvia foi o Redis, dependência crítica do serviço.',
    tsStep2Title: 'A Investigação',
    tsStep2Desc: 'O Redis foi testado e estava saudável. Testando as dependências de ponta a ponta, isolou-se que o DNS resolvia o serviço de autenticação, mas o handshake TCP na porta 443 travava sem fechar.',
    tsStep3Title: 'A Causa Raiz',
    tsStep3Desc: 'A aplicação tinha sido alocada em um node pool e subnet novos de nuvem que ainda não possuíam as regras de segurança de saída (egress) liberadas na rede.',
    tsStep4Title: 'Prevenção & Alarmística',
    tsStep4Desc: 'Rede liberada em 45 min de MTTR. Implantação imediata de monitoramento sintético (Synthetic Monitoring) das dependências críticas, alertas de pods NotReady e contagem de restarts.',

    // Skills Matrix
    skillsTag: 'Capacidades e Ferramental',
    skillsTitle: 'O Que Utilizo no Dia a Dia',
    skillsDesc: 'Ferramentas e frameworks testados em produção para plataformas de alta disponibilidade e operações automatizadas.',
    catOrch: 'Orquestração & Computação',
    catIac: 'Infraestrutura como Código',
    catObs: 'Observabilidade & Telemetria',
    catDel: 'Entrega Contínua & GitOps',
    catRel: 'Práticas de Confiabilidade & SRE',
    catLang: 'Linguagens & Automação',

    // Platform Work Experience
    expTag: 'Impacto Real',
    expTitle: 'Engenharia de Plataforma em Produção',
    expDesc: 'Arquitetura, migrações de alta escala e engenharia de confiabilidade em ambientes críticos.',
    case1Title: 'Plataforma de Pagamentos de Alto Volume (K8s Multi-Cloud @ Elo)',
    case1Summary: 'Projetei e operei infraestrutura Kubernetes multi-cluster executando serviços críticos de pagamento entre nuvens com Istio Service Mesh, failover automatizado e deploys sem downtime.',
    case1B1: 'Kubernetes multi-cluster em AWS (EKS), Azure (AKS), Google Cloud (GKE) e Huawei Cloud (CCE).',
    case1B2: 'Migração de ingress-nginx para Istio Service Mesh (Gateway, HTTPRoute, DestinationRule) para controle granular L7.',
    case1B3: 'Operação da camada de borda e APIs: Azure Front Door (WAF, roteamento global), Azure APIM e Azure CDN.',

    case2Title: 'Migração de Entrega Enterprise (Azure DevOps para GitHub Actions)',
    case2Summary: 'Arquitetei e executei migração completa da plataforma de pipelines legados do Azure DevOps para GitHub Actions moderno com workflows de segurança reutilizáveis e GitOps via ArgoCD.',
    case2B1: 'Mais de 50 serviços migrados com zero interrupção no fluxo de desenvolvimento dos times.',
    case2B2: 'Verificações automatizadas de segurança (SAST, scan de containers com Trivy e autenticação OIDC com AWS).',
    case2B3: 'Padrão GitOps com ArgoCD com detecção de desvio (drift) e rollback instantâneo.',

    case3Title: 'Infraestrutura AWS de Missão Crítica em Saúde (@ Albert Einstein)',
    case3Summary: 'Operação de ambiente AWS onde indisponibilidade tem custo clínico e financeiro direto, automatizando governança de acesso e eficiência financeira.',
    case3B1: 'Implantação de Teleport para acesso privilegiado auditável à infraestrutura, substituindo conexões diretas.',
    case3B2: 'Provisionamento automatizado com Terraform e otimização contínua de custos via Trusted Advisor e rightsizing.',
    case3B3: 'Desenvolvimento de ferramentas internas de automação em Python, Go e Shell para tarefas operacionais.',

    case4Title: '8 Anos de Fundamentos em Datacenter & Redes Linux (UFPA & FADESP)',
    case4Summary: 'Sólida bagagem em engenharia de sistemas, redes e virtualização construída antes da era da nuvem pública.',
    case4B1: 'Administração de servidores físicos, hypervisors Xen e virtualização por containers Docker.',
    case4B2: 'Fundamentos profundos de redes: DNS, roteamento TCP/IP, TLS/HTTPS, proxies reversos (Nginx/Apache) e LDAP.',
    case4B3: 'Projeto e implantação de soluções completas de monitoramento de rede e servidores com Zabbix e Grafana.',

    // SRE Calculator
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

    // Certifications & Education
    certsTag: 'Credenciais & Formação',
    certsTitle: 'Certificações & Especialização em Arquitetura',
    certsDesc: 'Qualificação formal em arquitetura de software distribuído, plataformas de nuvem e práticas de GitOps.',
    certGitOps: 'GitOps Certified',
    certGitOpsDesc: 'Padrões Codefresh / Argo Project e entrega declarativa contínua',
    certAwsWell: 'AWS Well-Architected Proficient',
    certAwsWellDesc: 'Confiabilidade, Segurança, Performance e Otimização de Custos',
    certEcs: 'Amazon ECS & Docker na AWS',
    certEcsDesc: 'Orquestração de containers, networking e dimensionamento de tarefas',
    certApiGw: 'Arquitetura de Amazon API Gateway',
    certApiGwDesc: 'Gestão de APIs REST/HTTP, políticas de throttling e segurança',
    certArch: 'Especialização em Arquitetura de Software',
    certArchDesc: 'Full Cycle (DDD, Clean Architecture, Arquitetura Hexagonal, Event-Driven e Microserviços)',
    certTech: 'Técnico em Informática (IFAM)',
    certTechDesc: 'Instituto Federal de Educação, Ciência e Tecnologia do Amazonas',

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

    const hours = Math.floor(allowedDowntimeMinutes / 60);
    const minutes = Math.floor(allowedDowntimeMinutes % 60);
    const seconds = Math.round((allowedDowntimeMinutes - Math.floor(allowedDowntimeMinutes)) * 60);

    let formattedDowntime = '';
    if (hours > 0) formattedDowntime += `${hours}h `;
    if (minutes > 0 || hours > 0) formattedDowntime += `${minutes}m `;
    formattedDowntime += `${seconds}s`;

    if (downtimeEl) downtimeEl.textContent = formattedDowntime.trim();
    if (budgetPctEl) budgetPctEl.textContent = `${errorBudgetPct.toFixed(2)}%`;

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

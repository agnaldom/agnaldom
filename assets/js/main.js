/**
 * Agnaldo Marinho — SRE & Platform Engineer
 * Minimalist, resilient portfolio logic (Theme toggle, Language switcher, Clipboard)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initEmailCopy();
  initFooterYear();
});

function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) {
    el.textContent = `© ${new Date().getFullYear()}`;
  }
}

/* ==========================================================================
   Theme Management (Following W3C & Modern Web Standards)
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
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
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
    navProjects: 'Projects',
    navIncident: 'Postmortem',
    navExperience: 'Experience',
    navSkills: 'Stack',
    navEducation: 'Education',
    navContact: 'Contact',

    heroLocation: 'Navegantes, SC — Brazil • 100% Remote • English (B2) & Spanish',
    heroRoleTitle: 'DevOps & SRE Specialist • Observability • Root Cause Analysis • Kubernetes • Multi-Cloud',
    heroBio1: '16 years in IT, with 8 years building and operating production platforms where downtime has direct financial and clinical cost — payments (<strong>Elo, Redecard</strong>), critical healthcare (<strong>Albert Einstein Hospital</strong>), energy (<strong>Raízen</strong>), and manufacturing (<strong>Gerdau</strong>).',
    heroBio2: 'My foundation is observability and deep troubleshooting: running Datadog, Prometheus, Grafana, Loki, and OpenTelemetry to catch degradation before users notice, defending <strong>SLIs, SLOs, and error budgets</strong> that hold up when production disagrees with the plan. Before the cloud, I spent 8 years in Linux administration, datacenters, and networking.',
    actionContact: 'Get in Touch',

    headingProjects: 'Selected Projects',
    subheadingProjects: 'Open-source platform tooling, Kubernetes facts for AI agents, and SRE frameworks.',

    crosswatcCategory: 'Developer Platform • GitOps Lifecycle',
    crosswatcSummary: 'Developer Experience and Infrastructure Lifecycle Management platform operating over GitOps (GitHub → Argo CD → Crossplane → Cloud). Provides self-service cloud abstractions without exposing raw cluster manifests to product developers.',
    crosswatcPoint1: 'Engineered in Go (Gin REST API + background reconciler/discovery workers) with a Next.js web application.',
    crosswatcPoint2: 'Orchestrates multi-cloud resource provisioning through Crossplane compositions and Argo CD sync cycles.',
    crosswatcPoint3: 'Built with PostgreSQL schema migrations, health adapters, and production Helm manifests.',

    mcpCategory: 'Model Context Protocol • AI Ops',
    mcpSummary: 'A strictly read-only Model Context Protocol (MCP) server in Go that exposes deterministic, sanitised Kubernetes facts to AI agents. Designed specifically to remove common failure modes of raw kubectl queries in autonomous investigations.',
    mcpPoint1: 'Eliminates the "ambiguity of silence": explicitly declares the time window it provably covers vs kube-apiserver --event-ttl.',
    mcpPoint2: 'Delivers rule-based observations with transparent thresholds rather than subjective opinions.',
    mcpPoint3: 'Guaranteed read-only architecture using SelfSubjectAccessReview authorization checks; zero mutable state.',

    sreiaCategory: 'Living Book • Hands-on Operational Labs',
    sreiaSummary: 'An open-source living book and runnable laboratory suite for SREs and platform engineers implementing operational AI with executable code, local runtime clusters, and GitHub Actions pipelines.',
    sreiaPoint1: 'Includes an automated local development lab (Kind cluster, Prometheus, Grafana, Loki, and controlled chaos apps).',
    sreiaPoint2: 'Vector indexing with Qdrant for semantic runbook retrieval and incident response playbooks.',
    sreiaPoint3: 'Focuses on critical verification of AI-generated IaC and pipelines before production deployment.',

    sloCategory: 'Reliability • SRE Tooling',
    sloSummary: 'SLI definitions, error budget formulas, and multi-window burn-rate Prometheus rules ready to drop into a Kubernetes cluster to eliminate threshold alert fatigue.',

    headingIncident: 'Root Cause Analysis Case Study',
    subheadingIncident: 'Documented production incident resolution showing methodical isolation and MTTR reduction.',
    pmHeaderTitle: 'Postmortem: Resolving TCP 443 Handshake Stall in Kubernetes',
    pmHeaderBadge: 'MTTR: 45 min • Severity: Critical',
    pmSymptomTitle: 'Incident Symptom',
    pmSymptomText: 'Following a production microservice release, pods immediately fell into a CrashLoopBackOff restart cycle. The default team assumption was Redis failure, a shared critical dependency.',
    pmInvestigationTitle: 'Isolation Method',
    pmInvestigationText: 'Tested Redis independently: connection pool and latencies were completely green. Isolated outbound external dependencies: DNS resolved the authentication endpoint, but the TCP SYN on port 443 stalled with zero ACK response.',
    pmRootCauseTitle: 'True Root Cause',
    pmRootCauseText: 'Workload was scheduled onto a newly provisioned node pool and subnet where cloud security group egress rules had not yet been applied, silently blackholing outbound HTTPS traffic.',
    pmPreventionTitle: 'Resolution & Safeguards',
    pmPreventionText: 'Network rules were applied, recovering service in 45 minutes MTTR. Deployed immediate synthetic dependency monitoring, Pod NotReady alarms, and automated container restart rate tripwires.',

    headingExperience: 'Work Experience',
    subheadingExperience: 'Career track in platform engineering, multicloud orchestration, and production SRE.',
    exp1D1: 'Responsible for infrastructure availability, resilience, and scale of a high-throughput microservices payments platform where downtime carries immediate financial impact.',
    exp1D2: 'Conducted ingress-nginx to Istio Service Mesh migration (Gateway, HTTPRoute, DestinationRule) for fine-grained L7 traffic control and routing policies.',
    exp1D3: 'Operated edge architecture and API management: Azure Front Door (global routing, WAF, load balancing), Azure APIM, and Azure CDN.',
    exp1D4: 'Led infrastructure pipeline migration from Azure DevOps to GitHub Actions using reusable workflows and eliminating repository duplication.',
    exp1D5: 'Evolved observability with Datadog APM, Prometheus, Grafana, Loki, and OpenTelemetry, establishing synthetic dependency monitoring and production SLOs.',

    exp2D1: 'End-to-end responsibility for infrastructure reliability, provisioning, and platform operations across four clouds: AWS (EKS), Azure (AKS), Google Cloud (GKE), and Huawei Cloud (CCE).',
    exp2D2: 'Provisioned multi-cloud infrastructure with Terraform and established GitOps delivery via ArgoCD, making cluster state auditable, reproducible, and reversible.',
    exp2D3: 'Operated production message streaming platforms: Apache Kafka, Amazon SQS, and Azure Service Bus.',
    exp2D4: 'Advanced observability maturity with OpenTelemetry and Datadog, moving engineering from reactive monitoring to proactive degradation detection.',

    exp3D1: 'Designed and implemented Amazon ECS clusters for scalable container orchestration and application resilience.',
    exp3D2: 'Built automated CI/CD deployment pipelines, standardizing delivery practices across software engineering teams.',
    exp3D3: 'Executed automation and DevOps proofs-of-concept, including evaluation and adoption of Amazon EKS.',

    exp4D1: 'Evolved AWS infrastructure architecture, provisioning environments through Terraform modules and IaC pipelines.',
    exp4D2: 'Managed Kubernetes workloads: deployments, autoscaling policies, security, and telemetry.',
    exp4D3: 'Integrated SonarQube quality gates into delivery pipelines to block non-compliant code before production deployment.',

    exp5D1: 'Operated mission-critical healthcare AWS infrastructure where downtime carries direct clinical and financial impact.',
    exp5D2: 'Automated provisioning with Terraform and built continuous deployment pipelines in Azure DevOps and Jenkins.',
    exp5D3: 'Implemented Teleport for auditable privileged infrastructure access, replacing direct bastion access with session recording.',
    exp5D4: 'Executed AWS cost reduction initiatives through resource rightsizing and AWS Trusted Advisor recommendations.',

    exp6D1: 'Administered bare-metal servers, hypervisors (Xen), and early containerization with Docker.',
    exp6D2: 'Configured and diagnosed core internet services: DNS, TCP/IP routing, HTTP/HTTPS reverse proxies (Nginx, Apache), and LDAP directories.',
    exp6D3: 'Designed and maintained monitoring systems for network and server infrastructure with Zabbix and Grafana.',

    headingSkills: 'Technical Capabilities',
    subheadingSkills: 'Production-tested tools, frameworks, and system engineering disciplines.',
    catObs: 'Observability & Telemetry',
    catOrch: 'Kubernetes & Cloud',
    catIac: 'Infrastructure as Code',
    catGitOps: 'Delivery & GitOps',
    catRel: 'SRE & Systems',
    catLang: 'Languages & Automation',

    headingEducation: 'Education & Credentials',
    subheadingEducation: 'Formal engineering training and recognized cloud credentials.',
    certArchTitle: 'Software Architecture Specialization',
    certIfamTitle: 'Computer Science Diploma',

    contactHeading: "Let's connect",
    contactSub: 'Open to discussions on Kubernetes, platform engineering, GitOps, and SRE reliability.',
    toastCopied: 'Copied to clipboard'
  },

  pt: {
    navProjects: 'Projetos',
    navIncident: 'Postmortem',
    navExperience: 'Experiência',
    navSkills: 'Stack',
    navEducation: 'Formação',
    navContact: 'Contato',

    heroLocation: 'Navegantes, SC — Brasil • 100% Remoto • Inglês (B2) e Espanhol',
    heroRoleTitle: 'Especialista DevOps & SRE • Observabilidade • Causa Raiz • Kubernetes • Multi-Cloud',
    heroBio1: '16 anos em TI, sendo 8 anos dedicados a SRE, DevOps e Cloud em ambientes onde indisponibilidade tem custo financeiro e clínico direto — meios de pagamento (<strong>Elo, Redecard</strong>), saúde de missão crítica (<strong>Hospital Israelita Albert Einstein</strong>), energia (<strong>Raízen</strong>) e indústria (<strong>Gerdau</strong>).',
    heroBio2: 'Minha base é observabilidade e troubleshooting profundo: operando Datadog, Prometheus, Grafana, Loki e OpenTelemetry para identificar degradação antes que o usuário perceba, sustentando <strong>SLIs, SLOs e error budgets</strong> que resistem à pressão em produção. Antes da nuvem, foram 8 anos de administração de Linux, redes e datacenter.',
    actionContact: 'Entrar em Contato',

    headingProjects: 'Projetos Autorais & Open Source',
    subheadingProjects: 'Ferramental de plataforma interna, fatos de Kubernetes para IA e frameworks de SRE.',

    crosswatcCategory: 'Plataforma DevX • Ciclo de Vida GitOps',
    crosswatcSummary: 'Plataforma de Developer Experience e Gestão de Ciclo de Vida de Infraestrutura sobre GitOps (GitHub → Argo CD → Crossplane → Cloud). Disponibiliza abstrações em autosserviço sem expor manifests brutos para times de produto.',
    crosswatcPoint1: 'Construído em Go (API REST em Gin + workers de reconciliação e descoberta em background) e interface em Next.js.',
    crosswatcPoint2: 'Orquestra provisionamento multi-cloud via composições do Crossplane e sincronização contínua com Argo CD.',
    crosswatcPoint3: 'Inclui migrations PostgreSQL, adaptadores de health check e manifests Helm prontos para produção.',

    mcpCategory: 'Model Context Protocol • AIOps',
    mcpSummary: 'Servidor Model Context Protocol (MCP) em Go estritamente read-only que expõe fatos estruturados e higienizados de Kubernetes para agentes de IA, eliminando as falhas clássicas de consultas cegas via kubectl.',
    mcpPoint1: 'Elimina a "ambiguidade do silêncio": declara explicitamente a janela temporal coberta vs a expiração de eventos (--event-ttl).',
    mcpPoint2: 'Entrega observações baseadas em regras com limites transparentes, no lugar de opiniões subjetivas.',
    mcpPoint3: 'Arquitetura 100% read-only com checagem de permissões via SelfSubjectAccessReview; zero mutação acidental.',

    sreiaCategory: 'Livro Vivo • Labs Operacionais',
    sreiaSummary: 'Livro vivo em código aberto e suíte de laboratórios práticos para SREs e times de plataforma implementarem IA operacional com código real, clusters locais e pipelines no GitHub Actions.',
    sreiaPoint1: 'Contém laboratório de desenvolvimento local reproduzível (cluster Kind com Prometheus, Grafana, Loki e apps para teste de caos).',
    sreiaPoint2: 'Indexação vetorial com Qdrant para busca semântica em runbooks operacionais e playbooks de incidentes.',
    sreiaPoint3: 'Foco na verificação e validação crítica de IaC e pipelines gerados por IA antes de aplicar em produção.',

    sloCategory: 'Confiabilidade • Ferramental SRE',
    sloSummary: 'Definições de SLIs, matemática de error budgets e regras de taxa de queima multi-janela para Prometheus, prontas para eliminar fadiga de alertas em clusters Kubernetes.',

    headingIncident: 'Estudo de Caso de Causa Raiz',
    subheadingIncident: 'Resolução documentada de incidente em produção demonstrando isolamento metódico e redução de MTTR.',
    pmHeaderTitle: 'Postmortem: Isolando o Travamento de Handshake TCP 443 no Kubernetes',
    pmHeaderBadge: 'MTTR: 45 min • Severidade: Crítica',
    pmSymptomTitle: 'O Sintoma',
    pmSymptomText: 'Num deploy de microsserviço em produção, os pods entraram imediatamente em loop de restart (CrashLoopBackOff). A hipótese preliminar da equipe apontava falha no Redis, dependência crítica compartilhada.',
    pmInvestigationTitle: 'Método de Isolamento',
    pmInvestigationText: 'Redis testado individualmente: pool de conexões e latências normais. Isolando as dependências externas uma a uma: o DNS resolvia o serviço de autenticação, mas o TCP SYN na porta 443 travava sem receber ACK.',
    pmRootCauseTitle: 'Causa Raiz Real',
    pmRootCauseText: 'A aplicação havia sido alocada em um node pool e subnet novos onde as regras de segurança de saída (egress) da nuvem não haviam sido liberadas na infraestrutura de rede.',
    pmPreventionTitle: 'Resolução & Salvaguardas',
    pmPreventionText: 'Regras de rede aplicadas em 45 minutos de MTTR. Implantação imediata de monitoramento sintético (Synthetic Monitoring) das dependências críticas, alarmes de Pods NotReady e métricas de taxa de reinício.',

    headingExperience: 'Trajetória Profissional',
    subheadingExperience: 'Histórico de atuação em engenharia de plataforma, orquestração multi-cloud e SRE em produção.',
    exp1D1: 'Responsável pela disponibilidade, resiliência e escala da infraestrutura de microsserviços em meios de pagamento onde qualquer parada tem impacto financeiro imediato.',
    exp1D2: 'Conduziu a migração de ingress-nginx para Istio Service Mesh (Gateway, HTTPRoute, DestinationRule) para controle fino de tráfego L7 e políticas de destino.',
    exp1D3: 'Operação da camada de borda e gestão de APIs: Azure Front Door (roteamento global, WAF, balanceamento), Azure APIM e Azure CDN.',
    exp1D4: 'Liderou a migração de pipelines de infraestrutura de Azure DevOps para GitHub Actions com workflows reutilizáveis.',
    exp1D5: 'Evoluiu a observabilidade com Datadog APM, Prometheus, Grafana, Loki e OpenTelemetry, estabelecendo monitoramento sintético e SLOs em produção.',

    exp2D1: 'Responsabilidade ponta a ponta pela confiabilidade e provisionamento de infraestrutura em quatro nuvens: AWS (EKS), Azure (AKS), Google Cloud (GKE) e Huawei Cloud (CCE).',
    exp2D2: 'Provisionamento de infraestrutura multi-cloud com Terraform e implantação de GitOps com ArgoCD, tornando os clusters auditáveis, reprodutíveis e reversíveis.',
    exp2D3: 'Operação de plataformas de mensageria em produção: Apache Kafka, Amazon SQS e Azure Service Bus.',
    exp2D4: 'Elevou a maturidade de observabilidade com OpenTelemetry e Datadog, migrando o monitoramento de reativo para detecção proativa de degradação.',

    exp3D1: 'Projetou e implementou clusters Amazon ECS para orquestração de containers com foco em escalabilidade e resiliência.',
    exp3D2: 'Construiu pipelines automatizados de CI/CD para deploy padronizado nos clusters ECS entre times de produto.',
    exp3D3: 'Conduziu provas de conceito de automação e DevOps, orientando a avaliação e adoção do Amazon EKS.',

    exp4D1: 'Evolução da arquitetura AWS da empresa, provisionando ambientes através de módulos Terraform e pipelines de IaC.',
    exp4D2: 'Gerenciou workloads em Kubernetes: deploys, políticas de auto-scaling, segurança e observabilidade.',
    exp4D3: 'Integrou quality gates no SonarQube para barrar código fora do padrão antes da entrada em produção.',

    exp5D1: 'Operação de infraestrutura AWS de missão crítica em saúde onde a indisponibilidade tem custo clínico e financeiro direto.',
    exp5D2: 'Automação de provisionamento com Terraform e construção de pipelines de CI/CD em Azure DevOps e Jenkins.',
    exp5D3: 'Implantação do Teleport para acesso privilegiado auditável, substituindo bastions diretos por sessões com rastreabilidade completa.',
    exp5D4: 'Conduziu iniciativas de redução de custo na AWS via Trusted Advisor e rightsizing de recursos ociosos.',

    exp6D1: 'Administração de servidores físicos, hypervisors Xen e virtualização de containers com Docker.',
    exp6D2: 'Configuração e diagnóstico de serviços essenciais de rede: DNS, roteamento TCP/IP, proxies reversos HTTP/HTTPS (Nginx, Apache) e LDAP.',
    exp6D3: 'Projeto e implantação de sistemas de monitoramento de rede e servidores com Zabbix, Grafana e automação em Shell.',

    headingSkills: 'Competências Técnicas',
    subheadingSkills: 'Ferramentas, frameworks e disciplinas de engenharia comprovadas em produção.',
    catObs: 'Observabilidade & Monitoramento',
    catOrch: 'Kubernetes & Cloud',
    catIac: 'Infraestrutura como Código',
    catGitOps: 'Entrega Contínua & GitOps',
    catRel: 'SRE & Confiabilidade',
    catLang: 'Linguagens & Automação',

    headingEducation: 'Formação & Credenciais',
    subheadingEducation: 'Qualificação formal em arquitetura de sistemas e certificações de nuvem.',
    certArchTitle: 'Especialização em Arquitetura de Software',
    certIfamTitle: 'Técnico em Informática',

    contactHeading: 'Vamos conversar',
    contactSub: 'Disponível para discutir desafios de Kubernetes, engenharia de plataforma, GitOps e confiabilidade de produção.',
    toastCopied: 'Copiado para a área de transferência'
  }
};

function initLanguage() {
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('language') || 'pt'; // Default to PT for local context or EN

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
   Email Copy & Toast
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

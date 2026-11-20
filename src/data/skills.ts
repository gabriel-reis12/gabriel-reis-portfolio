import type { SkillGroup, WorkflowToolGroup } from './types';

export interface CoreCapability {
  id: string;
  index: string;
  title: string;
  summary: string;
  tools: string[];
}

/**
 * Four capability pillars ordered to match AI Solutions & Automation positioning.
 */
export const CORE_CAPABILITIES: CoreCapability[] = [
  {
    id: 'cap-ai',
    index: '01',
    title: 'AI Solutions & Agents',
    summary:
      'Production LLM integrations, semantic RAG pipelines, MCP tool workflows, and multi-agent orchestration.',
    tools: ['LLM APIs', 'RAG', 'MCP', 'Claude Code', 'Codex'],
  },
  {
    id: 'cap-automation',
    index: '02',
    title: 'Automation & API Integrations',
    summary:
      'End-to-end operational workflows bridging ERPs, marketplaces, spreadsheets, and automated reporting.',
    tools: ['n8n', 'Python', 'REST APIs', 'Tiny ERP', 'Google OAuth2'],
  },
  {
    id: 'cap-systems',
    index: '03',
    title: 'Digital Products & Systems',
    summary:
      'Full-stack web applications, multi-tenant platforms, mobile MVPs, and self-hosted infrastructure.',
    tools: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'cap-data',
    index: '04',
    title: 'Data & Analytics',
    summary:
      'Commercial KPI modeling, ETL pipelines, outlier-robust pricing models, and executive BI.',
    tools: ['Power BI', 'DAX', 'SQL', 'Pandas', 'ETL'],
  },
];

/**
 * Detailed production stack revealed on interaction ("Explore Full Technical Stack").
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'skill-applied-ai',
    domain: 'Applied AI, RAG & Orchestration',
    summary:
      'Multi-agent pipelines, MCP integrations, semantic vector search, and LLM API workflows.',
    skills: [
      'LLM API Integrations',
      'Multi-Agent Orchestration',
      'MCP Integrations (Notion MCP)',
      'RAG & Semantic Retrieval',
      'SentenceTransformers & FAISS',
      'Claude / GPT / Gemini / LLaMA',
      'Prompt Engineering',
    ],
  },
  {
    id: 'skill-automation-apis',
    domain: 'Automation & API Integrations',
    summary:
      'Production orchestration bridging ERPs, marketplaces, email, and batch engineering tools.',
    skills: [
      'n8n Automation',
      'REST API Integrations',
      'Tiny ERP API',
      'Mercado Livre API',
      'Google Cloud OAuth2',
      'Google Apps Script',
      'PyInstaller',
      'CAD / DXF & PDF Pipelines',
    ],
  },
  {
    id: 'skill-frontend-mobile',
    domain: 'Digital Products (Web & Mobile)',
    summary: 'Web platforms and cross-platform mobile apps built with strict TypeScript.',
    skills: [
      'React 19',
      'TypeScript',
      'Next.js 16',
      'Vite',
      'Astro 5',
      'React Native / Expo',
      'Zustand',
      'GSAP & ScrollTrigger',
      'Vercel',
    ],
  },
  {
    id: 'skill-backend-systems',
    domain: 'Databases, Security & Infra',
    summary: 'Relational modeling, multi-tenant RLS security, transactional RPCs, and Docker.',
    skills: [
      'PostgreSQL',
      'Supabase (Cloud & Self-Hosted)',
      'Row-Level Security (RLS)',
      'Transactional RPCs',
      'SQL Migrations',
      'Docker',
      'Ubuntu Linux',
      'Vitest & pgTAP',
    ],
  },
  {
    id: 'skill-data-bi',
    domain: 'Data Analytics & BI',
    summary: 'Commercial KPI modeling, ETL workflows, statistical modeling, and dashboards.',
    skills: [
      'Python',
      'Pandas & NumPy',
      'SQL & T-SQL',
      'Power BI / DAX',
      'Scikit-learn',
      'Streamlit',
      'Excel / VBA',
      'ETL Pipelines',
    ],
  },
  {
    id: 'skill-product-ops',
    domain: 'Business Operations & Delivery',
    summary: 'Translating industrial and commercial constraints into reliable software.',
    skills: [
      'Requirements Discovery',
      'Manufacturing PCP',
      'Commercial & Pricing KPIs',
      'Auth & Private Storage',
      'Secrets & GitGuardian',
      'QA & Homologation',
    ],
  },
];

export const AI_ENGINEERING_WORKFLOW: WorkflowToolGroup = {
  eyebrow: 'AI-ASSISTED ENGINEERING WORKFLOW',
  title: 'Development Tooling',
  description:
    'Used for architecture exploration, implementation velocity, refactoring, and test generation — always paired with human specification, strict TypeScript checks, and manual verification.',
  tools: [
    'Claude Code',
    'OpenAI Codex',
    'Google Antigravity',
    'Vitest / pgTAP Verification',
  ],
};

export const ACTIVE_STUDY_TOPICS = {
  eyebrow: 'ONGOING STUDIES',
  description:
    'Advancing production AI engineering across multi-agent state orchestration, retrieval evaluation, observability, and cloud deployment.',
  topics: [
    'LangGraph & Agent Orchestration',
    'RAG Retrieval Evaluation',
    'LLMOps & Observability',
    'Production Guardrails & Evals',
  ],
};

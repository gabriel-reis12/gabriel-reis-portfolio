export type ProjectCategory =
  | 'systems-platforms'
  | 'ai-ml'
  | 'automation-data'
  | 'web-mobile';

export type ProjectStatus =
  | 'production'
  | 'completed'
  | 'operational-infra'
  | 'staging'
  | 'in-development';

export interface ArchitectureNode {
  label: string;
  detail: string;
  accent?: boolean;
}

export interface ArchitectureSpec {
  caption: string;
  diagramType: 'pipeline' | 'layered' | 'hub';
  nodes: ArchitectureNode[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repo' | 'docs';
}

export interface Project {
  id: string;
  slug: string;
  index?: string;
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: ProjectStatus;
  statusLabel: string;
  year: string | null;
  role: string;
  scope: string[];
  stack: string[];
  integrations: string[];
  problem: string;
  solution: string;
  impact: string[];
  headlineMetric: string | null;
  scale: string | null;
  images: ProjectImage[];
  imageLayout?: 'desktop' | 'mobile-showcase';
  architecture?: ArchitectureSpec;
  links: ProjectLink[];
  featured: boolean;
  confidentialityNote?: string;
  sourceNotes?: string;
}

export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  context: string;
  qualifier?: string;
  projectSlug: string;
}

export interface SkillGroup {
  id: string;
  domain: string;
  summary: string;
  skills: string[];
}

export interface WorkflowToolGroup {
  eyebrow: string;
  title: string;
  description: string;
  tools: string[];
}

export interface Credential {
  id: string;
  kind: 'degree' | 'postgrad' | 'extension' | 'certification' | 'track';
  title: string;
  institution: string;
  date: string | null;
  workload: string | null;
  validity: string | null;
  details: string;
}

export interface SocialChannel {
  label: string;
  handle: string;
  href: string;
  kind: 'email' | 'linkedin' | 'github' | 'website';
}

export interface PortraitAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProfileConfig {
  name: string;
  monogram: string;
  eyebrow: string;
  headlineLines: [string, string, string];
  subheadline: string;
  location: string;
  availability: string;
  bioParagraphs: string[];
  brandNote: string;
  portrait: PortraitAsset;
  email: string | null;
  resumeUrl: string | null;
  siteUrl: string | null;
  socials: SocialChannel[];
  targetRoles: string[];
}

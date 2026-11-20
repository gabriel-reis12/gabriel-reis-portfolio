import type { Credential } from './types';

/**
 * Verified formal education and certifications sourced from the master
 * workbook and confirmed LinkedIn Anthropic credentials.
 */
export const FORMAL_EDUCATION: Credential[] = [
  {
    id: 'edu-puc',
    kind: 'postgrad',
    title: 'Postgraduate Specialization in Data Science & Big Data',
    institution: 'PUC Minas',
    date: 'Mar 2025',
    workload: '384h',
    validity: 'Permanent',
    details:
      'Lato sensu specialization covering statistical modeling, big data pipelines, analytics, and applied machine learning.',
  },
  {
    id: 'edu-unisal',
    kind: 'degree',
    title: 'B.Eng. in Automation and Control Engineering',
    institution: 'UNISAL',
    date: 'Dec 2023',
    workload: null,
    validity: 'Permanent',
    details:
      'Engineering degree grounding systems architecture, industrial process control, instrumentation, and operational optimization.',
  },
  {
    id: 'edu-usp',
    kind: 'extension',
    title: 'Prompt Engineering for Software Engineers',
    institution: 'USP / ESALQ',
    date: 'Mar 2026',
    workload: '8h',
    validity: 'Permanent',
    details: 'University extension course completed with 100% performance score.',
  },
];

export const ANTHROPIC_COURSES: string[] = [
  'Model Context Protocol: Advanced Topics',
  'Introduction to Model Context Protocol',
  'Building with the Claude API',
  'Claude 101',
  'AI Fluency: Framework & Foundations',
  'AI Capabilities and Limitations',
];

export const CERTIFICATIONS: Credential[] = [
  {
    id: 'cert-anthropic',
    kind: 'certification',
    title: `Anthropic Courses (${ANTHROPIC_COURSES.length} Completed)`,
    institution: 'Anthropic',
    date: null,
    workload: null,
    validity: 'Permanent',
    details: ANTHROPIC_COURSES.join(' · '),
  },
  {
    id: 'cert-sfpc',
    kind: 'certification',
    title: 'Scrum Foundation Professional Certification (SFPC)',
    institution: 'CertiProf',
    date: 'Sep 2024',
    workload: null,
    validity: 'Valid through Sep 2027',
    details: 'Agile delivery methodology and iterative product management fundamentals.',
  },
  {
    id: 'cert-alura',
    kind: 'track',
    title: 'Alura Technical Tracks — 28 Completed Courses',
    institution: 'Alura',
    date: 'Dec 2023 – Oct 2024',
    workload: '254h',
    validity: 'Permanent',
    details:
      'Data Science (100h) · Microsoft SQL Server 2022 (78h) · Data Engineering, Power BI DAX, Spark & AWS Glue (60h) · GPT + Python API (8h) · Git & GitHub (8h).',
  },
];

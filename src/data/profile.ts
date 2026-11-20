import portraitSrc from '../assets/media/gabriel-reis-portrait.jpg';
import type { ProfileConfig } from './types';

export const PROFILE: ProfileConfig = {
  name: 'Gabriel Reis',
  monogram: 'GR',
  eyebrow: 'GABRIEL REIS · AI SOLUTIONS & AUTOMATION ENGINEER',
  headlineLines: ['Turning complex', 'operations into', 'intelligent systems.'],
  subheadline:
    'I build AI-powered solutions, intelligent automations, API integrations, and digital products that solve real business challenges.',
  location: 'Brazil · Remote Worldwide',
  availability: 'Available for international roles & AI/automation product builds',
  bioParagraphs: [
    'Trained in Automation and Control Engineering (UNISAL), with a Postgraduate Specialization in Data Science & Big Data (PUC Minas) and University Extension in Prompt Engineering for Software Engineers (USP/ESALQ), I connect artificial intelligence, business automation, API integrations, and data analytics with end-to-end digital products.',
    'Across 35 documented projects — 23 shipped or actively running in industrial and commercial operations — I focus on turning manual bottlenecks into reliable, measurable systems.',
  ],
  brandNote:
    'Also builds under gabrielreis.ia — sharing practical AI workflows, automation architectures, and client solutions.',
  portrait: {
    src: portraitSrc,
    alt: 'Editorial black-and-white portrait of Gabriel Reis',
    width: 800,
    height: 800,
  },
  email: null,
  resumeUrl: null,
  siteUrl: null,
  socials: [
    {
      label: 'LinkedIn',
      handle: 'linkedin.com/in/gabrielreis-data',
      href: 'https://www.linkedin.com/in/gabrielreis-data/',
      kind: 'linkedin',
    },
    {
      label: 'GitHub',
      handle: 'github.com/gabriel-reis12',
      href: 'https://github.com/gabriel-reis12',
      kind: 'github',
    },
  ],
  targetRoles: [
    'AI Solutions Engineer',
    'Automation & Integrations Engineer',
    'Applied AI Engineer',
    'Product & Systems Builder',
  ],
};

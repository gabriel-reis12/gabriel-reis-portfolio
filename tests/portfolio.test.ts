import { describe, expect, it } from 'vitest';
import {
  ARCHIVE_PROJECTS,
  COLLECTION_PROJECTS,
  CONFIDENTIAL_ARCH_NOTE,
  FLAGSHIP_PROJECTS,
  HOMEPAGE_FEATURED_PROJECTS,
  PROJECTS,
} from '../src/data/projects';
import { PROFILE } from '../src/data/profile';
import { ANTHROPIC_COURSES } from '../src/data/credentials';
import { IMPACT_METRICS } from '../src/data/metrics';
import {
  ACTIVE_STUDY_TOPICS,
  AI_ENGINEERING_WORKFLOW,
  CORE_CAPABILITIES,
  SKILL_GROUPS,
} from '../src/data/skills';
import {
  countByCategory,
  filterProjectsByCategory,
  findProjectBySlug,
} from '../src/utils/projectFilters';

describe('Portfolio data integrity', () => {
  it('displays 3 featured homepage projects while preserving all 6 flagships and 24 total builds', () => {
    expect(HOMEPAGE_FEATURED_PROJECTS).toHaveLength(3);
    expect(HOMEPAGE_FEATURED_PROJECTS.map((p) => p.slug)).toEqual([
      'zion-maintenance-platform',
      'ascend-gamified-habits',
      'kalled-automation-analytics',
    ]);
    expect(FLAGSHIP_PROJECTS).toHaveLength(6);
    expect(COLLECTION_PROJECTS).toHaveLength(21);
    expect(ARCHIVE_PROJECTS).toHaveLength(18);
    expect(PROJECTS).toHaveLength(24);
  });

  it('enforces unique project ids and slugs', () => {
    const ids = new Set(PROJECTS.map((p) => p.id));
    const slugs = new Set(PROJECTS.map((p) => p.slug));
    expect(ids.size).toBe(PROJECTS.length);
    expect(slugs.size).toBe(PROJECTS.length);
  });

  it('configures confirmed LinkedIn and GitHub channels with zero placeholder links', () => {
    const hrefs = PROFILE.socials.map((s) => s.href);
    expect(hrefs).toContain('https://www.linkedin.com/in/gabrielreis-data/');
    expect(hrefs).toContain('https://github.com/gabriel-reis12');
    expect(PROFILE.email).toBeNull();
    expect(PROFILE.resumeUrl).toBeNull();

    for (const project of PROJECTS) {
      for (const link of project.links) {
        expect(link.url).not.toBe('#');
        expect(link.url.startsWith('https://')).toBe(true);
      }
    }
    for (const social of PROFILE.socials) {
      expect(social.href).not.toBe('#');
      expect(social.href.startsWith('https://')).toBe(true);
    }
  });

  it('attaches authentic screenshots to Zion, Ascend, PITAGO, and Kalled public catalog', () => {
    const zion = findProjectBySlug(PROJECTS, 'zion-maintenance-platform');
    const ascend = findProjectBySlug(PROJECTS, 'ascend-gamified-habits');
    const pitago = findProjectBySlug(PROJECTS, 'pitago-math-mobile-app');
    const kalled = findProjectBySlug(PROJECTS, 'kalled-automation-analytics');

    expect(zion?.images).toHaveLength(2);
    expect(ascend?.images).toHaveLength(1);
    expect(pitago?.images).toHaveLength(4);
    expect(kalled?.images).toHaveLength(2);

    for (const proj of [zion, ascend, pitago, kalled]) {
      expect(proj?.architecture).toBeDefined();
      for (const img of proj?.images ?? []) {
        expect(img.src.length).toBeGreaterThan(0);
        expect(img.alt.length).toBeGreaterThan(15);
        expect(img.width).toBeGreaterThan(0);
        expect(img.height).toBeGreaterThan(0);
      }
    }
  });

  it('enforces confidentiality by keeping zero screenshots on Codan and HR Náutica', () => {
    const confidentialSlugs = [
      'hr-nautica-pcp-local',
      'codan-material-management',
    ];

    for (const slug of confidentialSlugs) {
      const project = findProjectBySlug(PROJECTS, slug);
      expect(project?.images).toHaveLength(0);
      expect(project?.architecture).toBeDefined();
      expect(project?.confidentialityNote).toContain(CONFIDENTIAL_ARCH_NOTE);
    }
  });

  it('reflects AI Solutions & Automation positioning, 4 capabilities, and 6 Anthropic courses', () => {
    expect(PROFILE.eyebrow).toContain('AI SOLUTIONS & AUTOMATION ENGINEER');
    expect(CORE_CAPABILITIES).toHaveLength(4);
    expect(CORE_CAPABILITIES[0]?.title).toBe('AI Solutions & Agents');
    expect(CORE_CAPABILITIES[1]?.title).toBe('Automation & API Integrations');
    expect(ANTHROPIC_COURSES).toHaveLength(6);
    expect(IMPACT_METRICS).toHaveLength(3);
    expect(SKILL_GROUPS.length).toBeGreaterThanOrEqual(6);
    expect(AI_ENGINEERING_WORKFLOW.tools).toContain('Claude Code');
    expect(AI_ENGINEERING_WORKFLOW.tools).toContain('OpenAI Codex');
    expect(ACTIVE_STUDY_TOPICS.topics.length).toBeGreaterThan(0);
  });

  it('resolves every impact metric projectSlug to a valid project', () => {
    for (const metric of IMPACT_METRICS) {
      expect(findProjectBySlug(PROJECTS, metric.projectSlug)).toBeDefined();
    }
  });

  it('keeps Ascend accurate without removed AI or Stripe claims', () => {
    const ascend = findProjectBySlug(PROJECTS, 'ascend-gamified-habits');
    expect(ascend).toBeDefined();
    expect(ascend?.stack).not.toContain('Stripe');
    expect(ascend?.stack).not.toContain('LLMs');
  });
});

describe('Project category filtering', () => {
  it('returns all collection projects for "all" and accurate subsets per category', () => {
    const counts = countByCategory(COLLECTION_PROJECTS);
    expect(counts.all).toBe(COLLECTION_PROJECTS.length);
    expect(
      counts['systems-platforms'] +
        counts['ai-ml'] +
        counts['automation-data'] +
        counts['web-mobile'],
    ).toBe(COLLECTION_PROJECTS.length);

    expect(filterProjectsByCategory(COLLECTION_PROJECTS, 'all')).toHaveLength(
      COLLECTION_PROJECTS.length,
    );
    expect(filterProjectsByCategory(COLLECTION_PROJECTS, 'ai-ml')).toHaveLength(
      counts['ai-ml'],
    );
    expect(
      filterProjectsByCategory(COLLECTION_PROJECTS, 'automation-data'),
    ).toHaveLength(counts['automation-data']);
  });
});

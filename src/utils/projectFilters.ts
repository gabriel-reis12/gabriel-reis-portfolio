import type { Project, ProjectCategory } from '../data/types';

export function filterProjectsByCategory(
  projects: Project[],
  category: 'all' | ProjectCategory,
): Project[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function countByCategory(
  projects: Project[],
): Record<'all' | ProjectCategory, number> {
  const counts: Record<'all' | ProjectCategory, number> = {
    all: projects.length,
    'systems-platforms': 0,
    'ai-ml': 0,
    'automation-data': 0,
    'web-mobile': 0,
  };

  for (const project of projects) {
    counts[project.category] += 1;
  }

  return counts;
}

export function findProjectBySlug(
  projects: Project[],
  slug: string,
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}


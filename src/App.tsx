import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectDrawer } from './components/ProjectDrawer';
import { HeroSection } from './sections/HeroSection';
import { SelectedWorkSection } from './sections/SelectedWorkSection';
import { ImpactSection } from './sections/ImpactSection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { AboutSection } from './sections/AboutSection';
import { ArchiveSection } from './sections/ArchiveSection';
import { ContactSection } from './sections/ContactSection';
import {
  COLLECTION_PROJECTS,
  FLAGSHIP_PROJECTS,
  HOMEPAGE_FEATURED_PROJECTS,
  PROJECTS,
} from './data/projects';
import type { Project } from './data/types';
import { findProjectBySlug } from './utils/projectFilters';

const CASE_HASH_PREFIX = '#case/';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash;
    if (hash.startsWith(CASE_HASH_PREFIX)) {
      const slug = hash.slice(CASE_HASH_PREFIX.length);
      return findProjectBySlug(PROJECTS, slug) ?? null;
    }
    return null;
  });

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
    window.history.replaceState(null, '', `${CASE_HASH_PREFIX}${project.slug}`);
  }, []);

  const handleOpenProjectBySlug = useCallback(
    (slug: string) => {
      const target = findProjectBySlug(PROJECTS, slug);
      if (target) {
        handleSelectProject(target);
      }
    },
    [handleSelectProject],
  );

  const handleCloseDrawer = useCallback(() => {
    setSelectedProject(null);
    if (window.location.hash.startsWith(CASE_HASH_PREFIX)) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith(CASE_HASH_PREFIX)) {
        const slug = hash.slice(CASE_HASH_PREFIX.length);
        setSelectedProject(findProjectBySlug(PROJECTS, slug) ?? null);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <HeroSection />
        <SelectedWorkSection
          projects={HOMEPAGE_FEATURED_PROJECTS}
          totalCollectionCount={COLLECTION_PROJECTS.length}
          onSelectProject={handleSelectProject}
        />
        <ImpactSection onOpenProjectBySlug={handleOpenProjectBySlug} />
        <ExpertiseSection />
        <AboutSection />
        <ArchiveSection
          projects={COLLECTION_PROJECTS}
          onSelectProject={handleSelectProject}
        />
        <ContactSection />
      </main>

      <Footer />

      <ProjectDrawer
        project={selectedProject}
        allFlagships={FLAGSHIP_PROJECTS}
        onClose={handleCloseDrawer}
        onSelectProject={handleSelectProject}
      />
    </>
  );
}

export default App;

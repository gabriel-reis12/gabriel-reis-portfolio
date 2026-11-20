import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown, ShieldAlert } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../motion/gsapConfig';
import { MOTION } from '../motion/tokens';
import type { Project, ProjectCategory } from '../data/types';
import { CATEGORY_FILTERS } from '../data/projects';
import { countByCategory, filterProjectsByCategory } from '../utils/projectFilters';
import { StatusBadge } from '../components/StatusBadge';
import styles from './ArchiveSection.module.css';

interface ArchiveSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function ArchiveSection({ projects, onSelectProject }: ArchiveSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const counts = useMemo(() => countByCategory(projects), [projects]);
  const filteredProjects = useMemo(
    () => filterProjectsByCategory(projects, activeCategory),
    [projects, activeCategory],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-archive-header]', {
          opacity: 0,
          y: 16,
          duration: MOTION.duration.base,
          ease: MOTION.ease.editorial,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 84%',
            once: true,
            fastScrollEnd: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  const handleFilterChange = (category: 'all' | ProjectCategory) => {
    setActiveCategory(category);
    setExpandedSlug(null);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const handleToggleRow = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <section
      id="all-projects"
      ref={sectionRef}
      className="section"
      aria-labelledby="all-projects-heading"
    >
      <div className="container">
        <div className="section-header" data-archive-header>
          <div>
            <p className="section-eyebrow">
              <span className="section-eyebrow-index">05</span>
              <span>Complete Projects Collection</span>
            </p>
            <h2 id="all-projects-heading" className="section-title">
              More engineering builds across industrial systems, mobile, AI &amp; automation.
            </h2>
          </div>
          <p className="section-description">
            Browse the remaining {projects.length} verified builds—including confidential industrial systems, mobile engineering, AI pipelines, and client catalogs.
          </p>
        </div>

        <div className={styles.filterBar} role="group" aria-label="Filter projects by category">
          {CATEGORY_FILTERS.map((filter) => {
            const count = counts[filter.id];
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                onClick={() => handleFilterChange(filter.id)}
              >
                <span>{filter.label}</span>
                <span className={`${styles.filterCount} tabular`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.list}>
          {filteredProjects.map((project) => {
            const isOpen = expandedSlug === project.slug;
            const panelId = `archive-panel-${project.slug}`;
            const hasCover = project.images.length > 0 && project.images[0];

            return (
              <article
                key={project.id}
                className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`}
              >
                <div className={styles.rowHeader}>
                  <button
                    type="button"
                    className={styles.rowTrigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggleRow(project.slug)}
                  >
                    <div className={styles.colMain}>
                      <div className={styles.titleLine}>
                        <h3 className={styles.rowTitle}>{project.title}</h3>
                        {project.featured && (
                          <span className={styles.flagshipTag}>Case Study</span>
                        )}
                      </div>
                      <p className={styles.rowSubtitle}>{project.subtitle}</p>
                    </div>

                    <span className={styles.colCat}>{project.categoryLabel}</span>

                    <div className={styles.colStatus}>
                      <StatusBadge status={project.status} label={project.statusLabel} />
                      <ChevronDown
                        size={16}
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </div>

                <div
                  id={panelId}
                  className={`${styles.expandWrap} ${isOpen ? styles.expandOpen : ''}`}
                >
                  <div className={styles.expandInner}>
                    <div className={styles.detailsGrid}>
                      {hasCover && project.images[0] && (
                        <div className={styles.thumbCol}>
                          {project.imageLayout === 'mobile-showcase' ? (
                            <div className={styles.mobileThumbStrip}>
                              {project.images.slice(0, 3).map((img) => (
                                <img
                                  key={img.src}
                                  src={img.src}
                                  alt={img.alt}
                                  width={img.width}
                                  height={img.height}
                                  loading="lazy"
                                  decoding="async"
                                  className={styles.mobileThumb}
                                />
                              ))}
                            </div>
                          ) : (
                            <img
                              src={project.images[0].src}
                              alt={project.images[0].alt}
                              width={project.images[0].width}
                              height={project.images[0].height}
                              loading="lazy"
                              decoding="async"
                              className={styles.desktopThumb}
                            />
                          )}
                        </div>
                      )}

                      <div className={styles.detailCol}>
                        <span className={styles.detailLabel}>OVERVIEW</span>
                        <p className={styles.detailText}>{project.summary}</p>

                        <span className={styles.detailLabel}>OUTCOMES</span>
                        <ul className={styles.impactList}>
                          {project.impact.slice(0, 3).map((line) => (
                            <li key={line} className={styles.impactItem}>
                              <CheckCircle2
                                size={14}
                                className={styles.impactIcon}
                                aria-hidden="true"
                              />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>

                        {project.confidentialityNote && (
                          <p className={styles.confNote}>
                            <ShieldAlert size={13} aria-hidden="true" />
                            <span>{project.confidentialityNote}</span>
                          </p>
                        )}

                        <div className={styles.detailFoot}>
                          <div className={styles.stackRow}>
                            {project.stack.slice(0, 6).map((tech) => (
                              <span key={tech} className={styles.techPill}>
                                {tech}
                              </span>
                            ))}
                          </div>

                          {project.featured && (
                            <button
                              type="button"
                              className={styles.caseStudyBtn}
                              onClick={() => onSelectProject(project)}
                            >
                              <span>Open Full Case Study</span>
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

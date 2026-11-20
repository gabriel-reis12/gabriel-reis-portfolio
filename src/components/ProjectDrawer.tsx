import { useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  X,
} from 'lucide-react';
import type { Project } from '../data/types';
import { StatusBadge } from './StatusBadge';
import { ArchitecturePlate } from './ArchitecturePlate';
import styles from './ProjectDrawer.module.css';

interface ProjectDrawerProps {
  project: Project | null;
  allFlagships: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectDrawer({
  project,
  allFlagships,
  onClose,
  onSelectProject,
}: ProjectDrawerProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    panelRef.current?.scrollTo({ top: 0 });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIdx = allFlagships.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIdx > 0
      ? allFlagships[currentIdx - 1]
      : currentIdx === 0
        ? allFlagships[allFlagships.length - 1]
        : null;
  const nextProject =
    currentIdx >= 0 && currentIdx < allFlagships.length - 1
      ? allFlagships[currentIdx + 1]
      : currentIdx === allFlagships.length - 1
        ? allFlagships[0]
        : null;

  const isMobileGallery = project.imageLayout === 'mobile-showcase';

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div ref={panelRef} className={styles.panel}>
        <div className={styles.stickyTop}>
          <div className={styles.topMeta}>
            {project.index && <span className={styles.caseIndex}>CASE {project.index}</span>}
            <span className={styles.category}>{project.categoryLabel}</span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close case study details"
          >
            <span className={styles.closeHint}>ESC</span>
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className={styles.body}>
          <header className={styles.header}>
            <div className={styles.badges}>
              <StatusBadge status={project.status} label={project.statusLabel} />
              {project.year && <span className={styles.year}>{project.year}</span>}
            </div>
            <h2 id="drawer-title" className={styles.title}>
              {project.title}
            </h2>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </header>

          {project.headlineMetric && (
            <div className={styles.metricBanner}>
              <span className={styles.metricLabel}>KEY OUTCOME</span>
              <span className={styles.metricValue}>{project.headlineMetric}</span>
            </div>
          )}

          {project.images.length > 0 && (
            <section className={styles.block} aria-label="Product interface screenshots">
              <h3 className={styles.blockTitle}>Product Interfaces</h3>
              <div
                className={
                  isMobileGallery ? styles.mobileGallery : styles.desktopGallery
                }
              >
                {project.images.map((img) => (
                  <figure key={img.src} className={styles.figure}>
                    <div
                      className={
                        isMobileGallery
                          ? styles.mobileShotWrap
                          : styles.desktopShotWrap
                      }
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        className={styles.screenshot}
                      />
                    </div>
                    {img.caption && (
                      <figcaption className={styles.figcaption}>{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {project.architecture && (
            <section className={styles.block} aria-label="System architecture overview">
              <h3 className={styles.blockTitle}>
                {project.images.length > 0 ? 'Supporting Architecture' : 'Architecture Overview'}
              </h3>
              <ArchitecturePlate
                projectIndex={project.index}
                projectTitle={project.title}
                architecture={project.architecture}
                variant="detail"
              />
            </section>
          )}

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>ROLE &amp; OWNERSHIP</span>
              <p className={styles.metaVal}>{project.role}</p>
            </div>
            {project.scale && (
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>OPERATIONAL SCALE</span>
                <p className={styles.metaVal}>{project.scale}</p>
              </div>
            )}
          </div>

          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Context &amp; Problem</h3>
            <p className={styles.prose}>{project.problem}</p>
          </section>

          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Solution &amp; Architecture</h3>
            <p className={styles.prose}>{project.solution}</p>
          </section>

          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Verified Outcomes</h3>
            <ul className={styles.outcomeList}>
              {project.impact.map((item) => (
                <li key={item} className={styles.outcomeItem}>
                  <CheckCircle2 size={16} className={styles.outcomeIcon} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Engineering Scope</h3>
            <ul className={styles.scopeList}>
              {project.scope.map((item) => (
                <li key={item} className={styles.scopeItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Technology Stack &amp; Integrations</h3>
            <div className={styles.tagsWrap}>
              {project.stack.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
            {project.integrations.length > 0 && (
              <p className={styles.integrationsNote}>
                <strong>Integrations:</strong> {project.integrations.join(' · ')}
              </p>
            )}
          </section>

          {project.links.length > 0 && (
            <section className={styles.block}>
              <h3 className={styles.blockTitle}>Verified Links</h3>
              <div className={styles.linksRow}>
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.extLink}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {project.confidentialityNote && (
            <div className={styles.confidentialBox}>
              <ShieldAlert size={16} className={styles.confidentialIcon} aria-hidden="true" />
              <p>{project.confidentialityNote}</p>
            </div>
          )}

          {prevProject && nextProject && (
            <nav className={styles.caseNav} aria-label="Switch flagship case study">
              <button
                type="button"
                className={styles.caseNavBtn}
                onClick={() => onSelectProject(prevProject)}
              >
                <span className={styles.caseNavDir}>
                  <ArrowLeft size={14} aria-hidden="true" /> Previous Case
                </span>
                <span className={styles.caseNavTitle}>{prevProject.title}</span>
              </button>
              <button
                type="button"
                className={`${styles.caseNavBtn} ${styles.caseNavRight}`}
                onClick={() => onSelectProject(nextProject)}
              >
                <span className={styles.caseNavDir}>
                  Next Case <ArrowRight size={14} aria-hidden="true" />
                </span>
                <span className={styles.caseNavTitle}>{nextProject.title}</span>
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

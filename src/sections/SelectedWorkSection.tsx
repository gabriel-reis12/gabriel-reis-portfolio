import { useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../motion/gsapConfig';
import { MOTION } from '../motion/tokens';
import type { Project } from '../data/types';
import { StatusBadge } from '../components/StatusBadge';
import styles from './SelectedWorkSection.module.css';

interface SelectedWorkSectionProps {
  projects: Project[];
  totalCollectionCount: number;
  onSelectProject: (project: Project) => void;
}

const CONCISE_HIGHLIGHT: Record<string, string> = {
  'zion-maintenance-platform': '10 milestones shipped · Multi-tenant RLS & average-cost stock ledger',
  'ascend-gamified-habits': 'Web launched · Streamlined mobile HUD & persistent auth',
  'kalled-automation-analytics': '45 min → 10 sec reporting · 300+ accounts tracked in production',
};

export function SelectedWorkSection({
  projects,
  totalCollectionCount,
  onSelectProject,
}: SelectedWorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.from('[data-selected-header]', {
            opacity: 0,
            y: MOTION.offset.desktop,
            duration: MOTION.duration.base,
            ease: MOTION.ease.editorial,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 84%',
              once: true,
              fastScrollEnd: true,
            },
          });

          gsap.utils.toArray<HTMLElement>('[data-featured-row]').forEach((row) => {
            gsap.from(row, {
              opacity: 0,
              y: 24,
              duration: 0.6,
              ease: MOTION.ease.editorial,
              scrollTrigger: {
                trigger: row,
                start: 'top 86%',
                once: true,
                fastScrollEnd: true,
              },
            });
          });
        },
      );

      mm.add(
        '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.utils.toArray<HTMLElement>('[data-featured-row]').forEach((row) => {
            gsap.from(row, {
              opacity: 0,
              y: MOTION.offset.mobile,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.editorial,
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                once: true,
                fastScrollEnd: true,
              },
            });
          });
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="section"
      aria-labelledby="selected-work-heading"
    >
      <div className="container">
        <div className="section-header" data-selected-header>
          <div>
            <p className="section-eyebrow">
              <span className="section-eyebrow-index">01</span>
              <span>Selected Work</span>
            </p>
            <h2 id="selected-work-heading" className="section-title">
              Featured AI, automation &amp; digital product builds.
            </h2>
          </div>
          <p className="section-description">
            Three signature deployments across business automation, SaaS platforms, and consumer web. Open any card to inspect architecture and outcomes.
          </p>
        </div>

        <div className={styles.showcaseList}>
          {projects.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            const cover = project.images[0];
            const highlight = CONCISE_HIGHLIGHT[project.slug] ?? project.headlineMetric;

            return (
              <article
                key={project.id}
                className={`${styles.showcaseCard} ${isReversed ? styles.reversed : ''}`}
                data-featured-row
              >
                <button
                  type="button"
                  className={styles.cardTrigger}
                  onClick={() => onSelectProject(project)}
                  aria-label={`View case study for ${project.title}`}
                >
                  <div className={styles.mediaCol}>
                    {cover && (
                      <div className={styles.mediaFrame}>
                        <img
                          src={cover.src}
                          alt={cover.alt}
                          width={cover.width}
                          height={cover.height}
                          loading="lazy"
                          decoding="async"
                          className={styles.coverImg}
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.infoCol}>
                    <div className={styles.metaRow}>
                      <span className={styles.metaLeft}>
                        <span className={`${styles.index} tabular`}>0{idx + 1}</span>
                        <span className={styles.category}>{project.categoryLabel}</span>
                      </span>
                      <StatusBadge status={project.status} label={project.statusLabel} />
                    </div>

                    <div className={styles.textBlock}>
                      <h3 className={styles.title}>{project.title}</h3>
                      <p className={styles.oneLiner}>{project.subtitle}.</p>
                    </div>

                    {highlight && <p className={styles.highlight}>{highlight}</p>}

                    <ul className={styles.stackRow} aria-label="Primary technologies">
                      {project.stack.slice(0, 4).map((tech) => (
                        <li key={tech} className={styles.stackPill}>
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <span className={styles.ctaRow}>
                      <span>View Case Study</span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={2}
                        className={styles.arrow}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        <div className={styles.exploreBar}>
          <a href="#all-projects" className={styles.exploreBtn}>
            <span>Explore All Projects</span>
            <span className={`${styles.exploreCount} tabular`}>{totalCollectionCount}</span>
            <ArrowDownRight size={17} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { gsap, useGSAP } from '../motion/gsapConfig';
import { MOTION } from '../motion/tokens';
import { IMPACT_METRICS } from '../data/metrics';
import styles from './ImpactSection.module.css';

interface ImpactSectionProps {
  onOpenProjectBySlug: (slug: string) => void;
}

export function ImpactSection({ onOpenProjectBySlug }: ImpactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-metric-card]', {
          opacity: 0,
          y: 16,
          duration: MOTION.duration.base,
          ease: MOTION.ease.editorial,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="impact"
      ref={sectionRef}
      className={styles.band}
      aria-labelledby="impact-heading"
    >
      <div className="container">
        <div className={styles.topRow}>
          <h2 id="impact-heading" className={styles.kicker}>
            <span className={styles.kickerAccent}>02</span>
            <span>MEASURABLE IMPACT</span>
          </h2>
          <p className={styles.sub}>Verified operational results from production deployments.</p>
        </div>

        <div className={styles.grid}>
          {IMPACT_METRICS.map((metric) => (
            <button
              key={metric.id}
              type="button"
              className={styles.card}
              data-metric-card
              onClick={() => onOpenProjectBySlug(metric.projectSlug)}
              aria-label={`${metric.value} — ${metric.label}. Open case study`}
            >
              <span className={`${styles.value} tabular`}>{metric.value}</span>
              <span className={styles.label}>{metric.label}</span>
              <span className={styles.context}>{metric.context}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

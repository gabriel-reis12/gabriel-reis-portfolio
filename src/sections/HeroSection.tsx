import { useRef } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '../motion/gsapConfig';
import { MOTION } from '../motion/tokens';
import { PROFILE } from '../data/profile';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: MOTION.ease.editorial } });

        tl.from('[data-hero-rule]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.6,
          ease: MOTION.ease.precision,
        })
          .from(
            '[data-hero-eyebrow]',
            {
              opacity: 0,
              y: 10,
              duration: 0.4,
            },
            '-=0.45',
          )
          .from(
            '[data-hero-line]',
            {
              yPercent: 108,
              opacity: 0,
              duration: MOTION.duration.hero,
              ease: MOTION.ease.precision,
              stagger: 0.08,
            },
            '-=0.32',
          )
          .from(
            '[data-hero-copy]',
            {
              opacity: 0,
              y: 14,
              duration: 0.48,
            },
            '-=0.35',
          )
          .from(
            '[data-hero-cta]',
            {
              opacity: 0,
              y: 12,
              duration: 0.42,
              stagger: 0.06,
            },
            '-=0.3',
          );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="top" ref={sectionRef} className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.gridBackdrop} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.eyebrowRow} data-hero-eyebrow>
          <span className={styles.pulseDot} aria-hidden="true" />
          <span className={styles.eyebrow}>{PROFILE.eyebrow}</span>
        </div>

        <div className={styles.rule} data-hero-rule aria-hidden="true" />

        <div className={styles.mainGrid}>
          <h1 id="hero-heading" className={styles.headline}>
            {PROFILE.headlineLines.map((line, index) => (
              <span key={line} className={styles.lineMask}>
                <span
                  className={`${styles.lineInner} ${
                    index === 2 ? styles.lineAccent : ''
                  }`}
                  data-hero-line
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className={styles.sideCol}>
            <p className={styles.subheadline} data-hero-copy>
              {PROFILE.subheadline}
            </p>

            <div className={styles.actions}>
              <a href="#selected-work" className={styles.primaryCta} data-hero-cta>
                <span>Explore My Work</span>
                <ArrowDownRight size={17} strokeWidth={2} aria-hidden="true" />
              </a>

              <a href="#contact" className={styles.secondaryCta} data-hero-cta>
                <span>Get in Touch</span>
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { Award, GraduationCap } from 'lucide-react';
import { gsap, useGSAP } from '../motion/gsapConfig';
import { MOTION } from '../motion/tokens';
import { PROFILE } from '../data/profile';
import { CERTIFICATIONS, FORMAL_EDUCATION } from '../data/credentials';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-about-reveal]', {
          opacity: 0,
          y: 16,
          duration: MOTION.duration.base,
          ease: MOTION.ease.editorial,
          stagger: 0.08,
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="section-header" data-about-reveal>
          <div>
            <p className="section-eyebrow">
              <span className="section-eyebrow-index">04</span>
              <span>About</span>
            </p>
            <h2 id="about-heading" className="section-title">
              Connecting AI, automation &amp; operational systems.
            </h2>
          </div>
          <p className="section-description">
            Control engineering foundation applied to intelligent workflows, API integrations, and production software.
          </p>
        </div>

        <div className={styles.bioGrid} data-about-reveal>
          <figure className={styles.portraitCol}>
            <div className={styles.portraitFrame}>
              <span className={styles.cornerMark} aria-hidden="true" />
              <img
                src={PROFILE.portrait.src}
                alt={PROFILE.portrait.alt}
                width={PROFILE.portrait.width}
                height={PROFILE.portrait.height}
                loading="lazy"
                decoding="async"
                className={styles.portraitImg}
              />
            </div>
            <figcaption className={styles.portraitCaption}>
              <span className={styles.captionName}>{PROFILE.name}</span>
              <span className={styles.captionLoc}>{PROFILE.location}</span>
            </figcaption>
          </figure>

          <div className={styles.rightCol}>
            <div className={styles.bioText}>
              {PROFILE.bioParagraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
              <p className={styles.brandNote}>{PROFILE.brandNote}</p>
            </div>

            <div className={styles.credentialsCompact}>
              <div className={styles.credBlock}>
                <h3 className={styles.credHeading}>
                  <GraduationCap size={15} className={styles.credIcon} aria-hidden="true" />
                  <span>Education</span>
                </h3>
                <ul className={styles.compactList}>
                  {FORMAL_EDUCATION.map((item) => (
                    <li key={item.id} className={styles.compactRow}>
                      <span className={styles.compactTitle}>{item.title}</span>
                      <span className={`${styles.compactMeta} tabular`}>
                        {item.institution}
                        {item.date ? ` · ${item.date}` : ''}
                        {item.workload ? ` · ${item.workload}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.credBlock}>
                <h3 className={styles.credHeading}>
                  <Award size={15} className={styles.credIcon} aria-hidden="true" />
                  <span>Certifications</span>
                </h3>
                <ul className={styles.compactList}>
                  {CERTIFICATIONS.map((item) => (
                    <li key={item.id} className={styles.compactRow}>
                      <span className={styles.compactTitle}>{item.title}</span>
                      <span className={`${styles.compactMeta} tabular`}>
                        {item.institution}
                        {item.workload ? ` · ${item.workload}` : ''}
                        {item.validity && item.validity !== 'Permanent'
                          ? ` · ${item.validity}`
                          : ''}
                      </span>
                      {item.id === 'cert-anthropic' && (
                        <span className={styles.compactSub}>{item.details}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

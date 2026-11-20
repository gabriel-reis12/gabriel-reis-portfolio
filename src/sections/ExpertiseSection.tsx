import { useRef, useState } from 'react';
import { ChevronDown, Terminal } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../motion/gsapConfig';
import { MOTION } from '../motion/tokens';
import {
  ACTIVE_STUDY_TOPICS,
  AI_ENGINEERING_WORKFLOW,
  CORE_CAPABILITIES,
  SKILL_GROUPS,
} from '../data/skills';
import styles from './ExpertiseSection.module.css';

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showFullStack, setShowFullStack] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-cap-card]', {
          opacity: 0,
          y: 16,
          duration: MOTION.duration.base,
          ease: MOTION.ease.editorial,
          stagger: 0.07,
          scrollTrigger: {
            trigger: '[data-cap-grid]',
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  const toggleFullStack = () => {
    setShowFullStack((prev) => !prev);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <section
      id="what-i-do"
      ref={sectionRef}
      className="section"
      aria-labelledby="what-i-do-heading"
    >
      <div className="container">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">
              <span className="section-eyebrow-index">03</span>
              <span>What I Do</span>
            </p>
            <h2 id="what-i-do-heading" className="section-title">
              AI solutions, automation &amp; systems built for real operations.
            </h2>
          </div>
          <p className="section-description">
            Prioritizing practical production capabilities across AI workflows, API integrations, digital products, and analytics.
          </p>
        </div>

        <div className={styles.grid} data-cap-grid>
          {CORE_CAPABILITIES.map((cap) => (
            <div key={cap.id} className={styles.card} data-cap-card>
              <div className={styles.cardHead}>
                <span className={`${styles.num} tabular`}>{cap.index}</span>
                <h3 className={styles.domain}>{cap.title}</h3>
              </div>
              <p className={styles.summary}>{cap.summary}</p>
              <ul className={styles.skillList}>
                {cap.tools.map((tool) => (
                  <li key={tool} className={styles.skillTag}>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.expandControl}>
          <button
            type="button"
            className={styles.expandBtn}
            aria-expanded={showFullStack}
            aria-controls="full-technical-stack"
            onClick={toggleFullStack}
          >
            <span>
              {showFullStack
                ? 'Hide Full Technical Stack'
                : 'Explore Full Technical Stack & Workflow'}
            </span>
            <ChevronDown
              size={16}
              className={`${styles.chevron} ${showFullStack ? styles.chevronOpen : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {showFullStack && (
          <div id="full-technical-stack" className={styles.fullStackPanel}>
            <div className={styles.subGrid}>
              {SKILL_GROUPS.map((group) => (
                <div key={group.id} className={styles.subCard}>
                  <h4 className={styles.subTitle}>{group.domain}</h4>
                  <p className={styles.subDesc}>{group.summary}</p>
                  <ul className={styles.skillList}>
                    {group.skills.map((skill) => (
                      <li key={skill} className={styles.skillTag}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.lowerGrid}>
              <div className={styles.workflowCard}>
                <span className={styles.workflowBadge}>
                  <Terminal size={12} aria-hidden="true" />
                  <span>{AI_ENGINEERING_WORKFLOW.eyebrow}</span>
                </span>
                <h4 className={styles.subTitle}>{AI_ENGINEERING_WORKFLOW.title}</h4>
                <p className={styles.subDesc}>{AI_ENGINEERING_WORKFLOW.description}</p>
                <ul className={styles.skillList}>
                  {AI_ENGINEERING_WORKFLOW.tools.map((tool) => (
                    <li key={tool} className={styles.toolPill}>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.studyCard}>
                <span className={styles.studyBadge}>{ACTIVE_STUDY_TOPICS.eyebrow}</span>
                <p className={styles.subDesc}>{ACTIVE_STUDY_TOPICS.description}</p>
                <ul className={styles.skillList}>
                  {ACTIVE_STUDY_TOPICS.topics.map((topic) => (
                    <li key={topic} className={styles.studyPill}>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

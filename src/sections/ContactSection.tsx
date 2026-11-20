import { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { gsap, useGSAP } from '../motion/gsapConfig';
import { MOTION } from '../motion/tokens';
import { PROFILE } from '../data/profile';
import type { SocialChannel } from '../data/types';
import styles from './ContactSection.module.css';

function ChannelIcon({ kind }: { kind: SocialChannel['kind'] }) {
  if (kind === 'linkedin') return <Linkedin size={18} strokeWidth={1.8} aria-hidden="true" />;
  if (kind === 'github') return <Github size={18} strokeWidth={1.8} aria-hidden="true" />;
  if (kind === 'email') return <Mail size={18} strokeWidth={1.8} aria-hidden="true" />;
  return <Globe size={18} strokeWidth={1.8} aria-hidden="true" />;
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-contact-reveal]', {
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

  const handleCopySummary = async () => {
    const brief = [
      `${PROFILE.name} — AI Solutions & Automation Engineer`,
      `Location: ${PROFILE.location}`,
      `LinkedIn: https://www.linkedin.com/in/gabrielreis-data/`,
      `GitHub: https://github.com/gabriel-reis12`,
      `Focus: ${PROFILE.targetRoles.join(', ')}`,
      `Highlights: 35 documented builds (23 shipped/operational), ZION multi-tenant SaaS, HR Náutica local PCP, Codan geometric material engine, ASCEND web app, PITAGO mobile app, Kalled ERP automation & BI (45m->10s, 300+ accounts, up to 6% YoY).`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`section ${styles.contactSection}`}
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className={styles.card} data-contact-reveal>
          <div className={styles.left}>
            <p className="section-eyebrow">
              <span className="section-eyebrow-index">06</span>
              <span>Contact</span>
            </p>
            <h2 id="contact-heading" className={styles.heading}>
              Let’s discuss an AI solution, automation architecture, or product build.
            </h2>
            <p className={styles.copy}>
              Available for international remote roles in AI Solutions, Intelligent Automation, API Integrations, and Data Analytics, as well as scoped end-to-end builds.
            </p>
            <p className={styles.location}>
              <MapPin size={15} className={styles.locIcon} aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </p>
          </div>

          <div className={styles.right}>
            <div className={styles.channelList}>
              {PROFILE.email && (
                <a
                  href={`mailto:${PROFILE.email}`}
                  className={styles.primaryChannel}
                  aria-label={`Send email to ${PROFILE.email}`}
                >
                  <span className={styles.channelLeft}>
                    <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span className={styles.channelText}>
                      <span className={styles.channelTitle}>Email</span>
                      <span className={styles.channelHandle}>{PROFILE.email}</span>
                    </span>
                  </span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}

              {PROFILE.socials.map((channel, index) => {
                const isPrimary = !PROFILE.email && index === 0;
                return (
                  <a
                    key={channel.href}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      isPrimary ? styles.primaryChannel : styles.secondaryChannel
                    }
                    aria-label={`Open Gabriel Reis on ${channel.label} (opens in new tab)`}
                  >
                    <span className={styles.channelLeft}>
                      <ChannelIcon kind={channel.kind} />
                      <span className={styles.channelText}>
                        <span className={styles.channelTitle}>{channel.label}</span>
                        <span
                          className={
                            isPrimary
                              ? styles.primaryHandle
                              : styles.channelHandle
                          }
                        >
                          {channel.handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight size={17} className={styles.extArrow} aria-hidden="true" />
                  </a>
                );
              })}

              {PROFILE.resumeUrl && (
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryChannel}
                  aria-label="Download Gabriel Reis Resume PDF (opens in new tab)"
                >
                  <span className={styles.channelLeft}>
                    <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span className={styles.channelText}>
                      <span className={styles.channelTitle}>Resume (PDF)</span>
                      <span className={styles.channelHandle}>English CV</span>
                    </span>
                  </span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              )}

              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopySummary}
              >
                {copied ? (
                  <>
                    <Check size={15} aria-hidden="true" />
                    <span>Recruiter Brief Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} aria-hidden="true" />
                    <span>Copy Recruiter Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

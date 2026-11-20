import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/profile';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.brand}>{PROFILE.name}</span>
          <span className={styles.sep} aria-hidden="true">
            /
          </span>
          <span className={styles.meta}>
            © {year} · Built with React, TypeScript &amp; GSAP
          </span>
        </div>

        <a href="#top" className={styles.topLink}>
          <span>Back to top</span>
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}


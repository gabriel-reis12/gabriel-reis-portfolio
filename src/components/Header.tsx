import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/profile';
import styles from './Header.module.css';

interface NavItem {
  id: string;
  index: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'selected-work', index: '01', label: 'Work' },
  { id: 'impact', index: '02', label: 'Impact' },
  { id: 'what-i-do', index: '03', label: 'What I Do' },
  { id: 'about', index: '04', label: 'About' },
  { id: 'all-projects', index: '05', label: 'All Projects' },
  { id: 'contact', index: '06', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let rafId = 0;

    const computeScrollState = () => {
      rafId = 0;
      const scrollY = window.scrollY;
      setScrolled(scrollY > 36);

      if (scrollY < 140) {
        setActiveId('');
        return;
      }

      const docHeight = document.documentElement.scrollHeight;
      const viewportBottom = scrollY + window.innerHeight;
      if (viewportBottom >= docHeight - 24) {
        setActiveId('contact');
        return;
      }

      const headerHeight = headerRef.current?.offsetHeight ?? 68;
      const activationLine = headerHeight + Math.min(180, window.innerHeight * 0.25);

      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= activationLine) {
          current = item.id;
        }
      }

      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(computeScrollState);
      }
    };

    computeScrollState();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={`container ${styles.inner}`}>
        <a
          href="#top"
          className={styles.brand}
          aria-label={`${PROFILE.name} — Home`}
          onClick={() => setActiveId('')}
        >
          <span className={styles.brandName}>GABRIEL REIS</span>
          <span className={styles.brandDot} aria-hidden="true" />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? 'location' : undefined}
                  className={`${styles.navLink} ${
                    activeId === item.id ? styles.navLinkActive : ''
                  }`}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleBtnRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className={`container ${styles.mobileNav}`}>
            <ul className={styles.mobileList}>
              <li>
                <a
                  href="#top"
                  className={styles.mobileLink}
                  onClick={() => {
                    setActiveId('');
                    setMenuOpen(false);
                  }}
                >
                  <span className={styles.mobileIndex}>00</span>
                  <span>Home</span>
                </a>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={styles.mobileLink}
                    onClick={() => {
                      setActiveId(item.id);
                      setMenuOpen(false);
                    }}
                  >
                    <span className={styles.mobileIndex}>{item.index}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.mobileFooter}>
              <p className={styles.mobileMeta}>{PROFILE.location}</p>
              <p className={styles.mobileMeta}>{PROFILE.availability}</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

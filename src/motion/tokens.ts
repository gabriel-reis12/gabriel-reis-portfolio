export const MOTION = {
  duration: {
    micro: 0.18,
    fast: 0.35,
    base: 0.55,
    hero: 0.7,
  },
  ease: {
    editorial: 'power3.out',
    sharp: 'power2.out',
    precision: 'expo.out',
  },
  offset: {
    mobile: 10,
    desktop: 20,
  },
  stagger: {
    tight: 0.05,
    cards: 0.08,
  },
} as const;


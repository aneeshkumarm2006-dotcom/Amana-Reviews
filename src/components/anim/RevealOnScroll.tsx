'use client';

import { useEffect } from 'react';

/**
 * Drop-in once per page. Fades + rises each <section> below the fold as it
 * scrolls into view. Sections already in the initial viewport are left untouched
 * (no flash), and motion is disabled for prefers-reduced-motion.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const sections = Array.from(document.querySelectorAll('main section')) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'none';
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    sections.forEach((s) => {
      // leave anything near/in the first viewport visible
      if (s.getBoundingClientRect().top < window.innerHeight * 0.85) return;
      s.style.opacity = '0';
      s.style.transform = 'translateY(24px)';
      s.style.transition = 'opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1)';
      io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return null;
}

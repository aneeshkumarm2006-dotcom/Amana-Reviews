'use client';

import { useEffect, useRef, useState } from 'react';

/** Parses values like "158", "2.4M", "22%", "4.7" into parts. */
function parse(value: string) {
  const m = value.trim().match(/^([^0-9]*)([0-9][0-9.,]*)\s*([^0-9]*)$/);
  if (!m) return { prefix: '', target: 0, decimals: 0, suffix: value };
  const prefix = m[1] || '';
  const numStr = m[2].replace(/,/g, '');
  const suffix = m[3] || '';
  const target = parseFloat(numStr);
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { prefix, target, decimals, suffix };
}

const fmt = (n: number, decimals: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up to the numeric part of `value` when it scrolls into view. */
export default function CountUp({
  value,
  duration = 1100,
  delayMs = 0,
}: {
  value: string;
  duration?: number;
  delayMs?: number;
}) {
  const { prefix, target, decimals, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(fmt(target, decimals));
      return;
    }
    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now() + delayMs;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(fmt(target * eased, decimals));
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(fmt(target, decimals));
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, decimals, duration, delayMs]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

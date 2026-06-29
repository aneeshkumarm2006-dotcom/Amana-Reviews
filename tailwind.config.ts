import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBFAF7',
        ink: '#0E1416',
        text: '#1A2227',
        muted: '#5A6670',
        green: { DEFAULT: '#16A34A', soft: '#9BE3B4' },
        amber: { DEFAULT: '#C8860D' },
        danger: { DEFAULT: '#C0392B' },
        foot: { txt: '#C7CDD1', muted: '#9BA4AA', dim: '#6B747A' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'serif'],
        sans: ['var(--font-sans)', 'Libre Franklin', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
        ar: ['var(--font-ar)', 'IBM Plex Sans Arabic', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1240px',
      },
      keyframes: {
        amRise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        amFade: { from: { opacity: '0' }, to: { opacity: '1' } },
        amPanel: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        amPulse: { '0%,100%': { opacity: '.55' }, '50%': { opacity: '1' } },
      },
      animation: {
        rise: 'amRise .5s cubic-bezier(.2,.7,.2,1) both',
        fade: 'amFade .18s ease both',
        panel: 'amPanel .22s ease both',
        pulse2: 'amPulse 2.4s infinite',
      },
    },
  },
  plugins: [],
};

export default config;

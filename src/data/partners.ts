/**
 * Real, externally-linked licensed brokers featured on the home page.
 * Evest is intentionally first. Replace `mark` tiles with real logo images when available.
 */
export interface Partner {
  name: string;
  url: string;
  mark: string;
  bg: string;
  fg: string;
}

export const PARTNERS: Partner[] = [
  { name: 'Evest', url: 'https://www.evest.com/en', mark: '{e}', bg: '#0E2A2E', fg: '#36C5A8' },
  { name: 'XTB', url: 'https://www.xtb.com', mark: 'XTB', bg: '#E2231A', fg: '#FFFFFF' },
  { name: 'Capital.com', url: 'https://capital.com', mark: 'C', bg: '#0A0A0A', fg: '#FFFFFF' },
  { name: 'Exness', url: 'https://www.exness.com', mark: 'ex', bg: '#F5C800', fg: '#111111' },
  { name: 'AvaTrade', url: 'https://www.avatrade.com', mark: 'AVA', bg: '#11244A', fg: '#FFFFFF' },
  { name: 'Equiti', url: 'https://www.equiti.com', mark: 'equiti', bg: '#1FA9A0', fg: '#FFFFFF' },
];

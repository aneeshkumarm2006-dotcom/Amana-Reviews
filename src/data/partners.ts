/**
 * Real, externally-linked licensed brokers featured on the home page.
 * Evest is intentionally first. Logos are fetched live from the Clearbit logo API
 * by domain; drop branded SVGs in /public/brokers and swap `logoUrl` if you prefer
 * self-hosted assets.
 */
export interface Partner {
  name: string;
  url: string;
  domain: string;
}

export const PARTNERS: Partner[] = [
  { name: 'Evest', url: 'https://www.evest.com/en', domain: 'evest.com' },
  { name: 'XTB', url: 'https://www.xtb.com', domain: 'xtb.com' },
  { name: 'Capital.com', url: 'https://capital.com', domain: 'capital.com' },
  { name: 'Exness', url: 'https://www.exness.com', domain: 'exness.com' },
  { name: 'AvaTrade', url: 'https://www.avatrade.com', domain: 'avatrade.com' },
  { name: 'Equiti', url: 'https://www.equiti.com', domain: 'equiti.com' },
];

export const logoUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

export function formatDate(dateStr: string, lang: 'es' | 'en', short = false): string {
  const date = new Date(dateStr);
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: short ? 'short' : 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function calculateReadingTime(text: string): number {
  const WPM = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / WPM);
}

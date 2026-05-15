'use client';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-0.5">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={clsx(
            'toc-link',
            h.level === 3 && 'toc-link-h3',
            activeId === h.id && 'active'
          )}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(h.id);
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

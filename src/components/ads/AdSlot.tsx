'use client';
import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

interface AdSlotProps {
  slot: string;
  format: 'leaderboard' | 'rectangle' | 'sidebar' | 'mobile-banner' | 'in-content';
  label?: string;
  sticky?: boolean;
  className?: string;
}

const FORMAT_CLASSES = {
  leaderboard: 'min-h-[90px] w-full max-w-[728px] mx-auto',
  rectangle: 'min-h-[250px] w-full max-w-[336px] mx-auto',
  sidebar: 'min-h-[600px] w-[300px]',
  'mobile-banner': 'min-h-[50px] w-full',
  'in-content': 'min-h-[280px] w-full my-8',
};

export function AdSlot({ slot, format, label, sticky, className }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently in dev
    }
  }, []);

  return (
    <div
      className={clsx(
        'ad-slot relative overflow-hidden',
        FORMAT_CLASSES[format],
        sticky && 'sticky top-24',
        className
      )}
      role="complementary"
      aria-label={label || 'Advertisement'}
    >
      {label && (
        <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest text-slate-400 whitespace-nowrap z-10 pointer-events-none">
          {label}
        </span>
      )}
      <ins
        ref={adRef as any}
        className="adsbygoogle block"
        style={{ display: 'block', minHeight: '1px' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Development placeholder — shows in dev, hides in prod
export function AdPlaceholder({ format }: { format: AdSlotProps['format'] }) {
  if (process.env.NODE_ENV === 'production') return null;

  const heights: Record<string, string> = {
    leaderboard: 'h-24',
    rectangle: 'h-64',
    sidebar: 'h-96',
    'mobile-banner': 'h-14',
    'in-content': 'h-72',
  };

  return (
    <div className={`${heights[format]} w-full bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center`}>
      <span className="text-slate-400 text-sm font-mono">AD: {format}</span>
    </div>
  );
}

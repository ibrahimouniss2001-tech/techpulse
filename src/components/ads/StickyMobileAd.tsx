'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export function StickyMobileAd() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pushed = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    if (visible && !pushed.current) {
      pushed.current = true;
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, [visible]);

  if (!visible || dismissed) return null;

  return (
    <div className="sticky-ad-mobile lg:hidden">
      <div className="relative flex items-center justify-center px-2 py-1">
        <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest text-slate-400">
          Advertisement
        </span>
        <ins
          className="adsbygoogle block"
          style={{ display: 'block', minHeight: '50px', width: '100%', maxWidth: '320px' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="9988776655"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          aria-label="Close ad"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

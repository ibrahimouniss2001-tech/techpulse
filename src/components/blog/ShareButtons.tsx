'use client';
import { useState } from 'react';
import { Twitter, Link2, Check, ChevronDown } from 'lucide-react';
import { FAQ } from '@/data/posts';

// Share Buttons
interface ShareButtonsProps {
  url: string;
  title: string;
  lang: 'es' | 'en';
}

export function ShareButtons({ url, title, lang }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 hidden sm:block">{lang === 'es' ? 'Compartir:' : 'Share:'}</span>
      <button
        onClick={shareTwitter}
        className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={15} />
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={15} className="text-green-500" /> : <Link2 size={15} />}
      </button>
    </div>
  );
}

// FAQ Accordion
interface FAQAccordionProps {
  faqs: FAQ[];
  lang: 'es' | 'en';
}

export function FAQAccordion({ faqs, lang }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-semibold text-slate-900 dark:text-white text-sm">
              {faq.question[lang]}
            </span>
            <ChevronDown
              size={18}
              className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/50">
              {faq.answer[lang]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

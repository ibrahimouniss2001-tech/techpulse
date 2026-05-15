import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0a0f1a',
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '900': '#0f172a',
          '950': '#080d18',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        'display-2xl': ['4.5rem', { lineHeight: '5.25rem', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '4.5rem', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '3.75rem', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }],
        'display-sm': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.01em' }],
        'display-xs': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-brand': 'radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.1) 0%, transparent 50%)',
        'mesh-dark': 'radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.06) 0%, transparent 50%)',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.05)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'card-dark-hover': '0 10px 30px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.3)',
        'glow-brand': '0 0 40px rgba(14,165,233,0.2)',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate[700]'),
            '--tw-prose-headings': theme('colors.slate[900]'),
            '--tw-prose-links': theme('colors.brand[600]'),
            '--tw-prose-code': theme('colors.brand[700]'),
            maxWidth: 'none',
            a: { fontWeight: '500', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            h2: { scrollMarginTop: '5rem' },
            h3: { scrollMarginTop: '5rem' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.brand[400]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6366F1', // indigo-500
        'primary-50': '#EEF2FF', // indigo-50
        'primary-100': '#E0E7FF', // indigo-100
        'primary-200': '#C7D2FE', // indigo-200
        'primary-300': '#A5B4FC', // indigo-300
        'primary-400': '#818CF8', // indigo-400
        'primary-500': '#6366F1', // indigo-500
        'primary-600': '#4F46E5', // indigo-600
        'primary-700': '#4338CA', // indigo-700
        'primary-800': '#3730A3', // indigo-800
        'primary-900': '#312E81', // indigo-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#8B5CF6', // violet-500
        'secondary-50': '#F5F3FF', // violet-50
        'secondary-100': '#EDE9FE', // violet-100
        'secondary-200': '#DDD6FE', // violet-200
        'secondary-300': '#C4B5FD', // violet-300
        'secondary-400': '#A78BFA', // violet-400
        'secondary-500': '#8B5CF6', // violet-500
        'secondary-600': '#7C3AED', // violet-600
        'secondary-700': '#6D28D9', // violet-700
        'secondary-800': '#5B21B6', // violet-800
        'secondary-900': '#4C1D95', // violet-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#10B981', // emerald-500
        'accent-50': '#ECFDF5', // emerald-50
        'accent-100': '#D1FAE5', // emerald-100
        'accent-200': '#A7F3D0', // emerald-200
        'accent-300': '#6EE7B7', // emerald-300
        'accent-400': '#34D399', // emerald-400
        'accent-500': '#10B981', // emerald-500
        'accent-600': '#059669', // emerald-600
        'accent-700': '#047857', // emerald-700
        'accent-800': '#065F46', // emerald-800
        'accent-900': '#064E3B', // emerald-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#0F172A', // slate-900
        'background-50': '#F8FAFC', // slate-50
        'background-100': '#F1F5F9', // slate-100
        'background-200': '#E2E8F0', // slate-200
        'background-300': '#CBD5E1', // slate-300
        'background-400': '#94A3B8', // slate-400
        'background-500': '#64748B', // slate-500
        'background-600': '#475569', // slate-600
        'background-700': '#334155', // slate-700
        'background-800': '#1E293B', // slate-800
        'background-900': '#0F172A', // slate-900

        // Surface Colors
        'surface': '#1E293B', // slate-800
        'surface-50': '#F8FAFC', // slate-50
        'surface-100': '#F1F5F9', // slate-100
        'surface-200': '#E2E8F0', // slate-200
        'surface-300': '#CBD5E1', // slate-300
        'surface-400': '#94A3B8', // slate-400
        'surface-500': '#64748B', // slate-500
        'surface-600': '#475569', // slate-600
        'surface-700': '#334155', // slate-700
        'surface-800': '#1E293B', // slate-800
        'surface-900': '#0F172A', // slate-900

        // Text Colors
        'text-primary': '#F8FAFC', // slate-50
        'text-secondary': '#94A3B8', // slate-400
        'text-muted': '#64748B', // slate-500
        'text-inverse': '#0F172A', // slate-900

        // Status Colors
        'success': '#059669', // emerald-600
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-200': '#A7F3D0', // emerald-200
        'success-300': '#6EE7B7', // emerald-300
        'success-400': '#34D399', // emerald-400
        'success-500': '#10B981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-700': '#047857', // emerald-700
        'success-800': '#065F46', // emerald-800
        'success-900': '#064E3B', // emerald-900
        'success-foreground': '#FFFFFF', // white

        'warning': '#D97706', // amber-600
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-300': '#FCD34D', // amber-300
        'warning-400': '#FBBF24', // amber-400
        'warning-500': '#F59E0B', // amber-500
        'warning-600': '#D97706', // amber-600
        'warning-700': '#B45309', // amber-700
        'warning-800': '#92400E', // amber-800
        'warning-900': '#78350F', // amber-900
        'warning-foreground': '#FFFFFF', // white

        'error': '#DC2626', // red-600
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-300': '#FCA5A5', // red-300
        'error-400': '#F87171', // red-400
        'error-500': '#EF4444', // red-500
        'error-600': '#DC2626', // red-600
        'error-700': '#B91C1C', // red-700
        'error-800': '#991B1B', // red-800
        'error-900': '#7F1D1D', // red-900
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': 'rgba(148, 163, 184, 0.2)', // slate-400 with opacity
        'border-light': 'rgba(148, 163, 184, 0.1)', // slate-400 with light opacity
        'border-strong': 'rgba(148, 163, 184, 0.4)', // slate-400 with strong opacity
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['JetBrains Mono', 'monospace'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'gaming': '0 4px 8px rgba(0, 0, 0, 0.25)',
        'gaming-lg': '0 8px 16px rgba(0, 0, 0, 0.25)',
        'gaming-xl': '0 12px 24px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'pulse-accent': 'pulse-accent 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
        'slide-up': 'slide-up 0.2s ease-out',
      },
      keyframes: {
        'pulse-accent': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        'header': '1000',
        'dropdown': '1010',
        'modal': '1100',
        'toast': '1200',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
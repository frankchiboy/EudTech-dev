/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite',
        'floating': 'floating 3s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'subtle-zoom': {
          '0%, 100%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.07)' },
        },
        'floating': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(14, 165, 233, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.6)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(59, 130, 246, 0.3)' },
          '50%': { borderColor: 'rgba(59, 130, 246, 0.8)' },
        }
      },
      boxShadow: {
        'neo-light': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neo-dark': '8px 8px 16px #0e1621, -8px -8px 16px #1a2537',
        '3d-light': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 -3px 0 rgba(0, 0, 0, 0.1)',
        '3d-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.3)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
        'glow-teal': '0 0 15px rgba(20, 184, 166, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        eudtech: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c1d7fe',
          300: '#94bbfd',
          400: '#609afa',
          500: '#3b78f6',
          600: '#2558e9',
          700: '#1e45d3',
          800: '#1f3aab',
          900: '#1e3485',
          // 深色模式增強色彩
          950: '#162a6e',
        },
        comino: {
          50: '#f4f1ff',
          100: '#ebe4ff',
          200: '#d9cdfe',
          300: '#beaafb',
          400: '#9e7df7',
          500: '#8354f0',
          600: '#7336e3',
          700: '#6228c8',
          800: '#5123a2',
          900: '#441e85',
          // 深色模式增強色彩
          950: '#36186d',
        },
        dark: {
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#4b5563',
          600: '#374151',
          700: '#1f2937',
          800: '#111827',
          850: '#0d141e',
          900: '#030712',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
    },
  },
  plugins: [],
};

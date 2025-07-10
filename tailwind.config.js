/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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

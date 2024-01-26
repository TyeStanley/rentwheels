import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: '#833EFF',
        secondary: '#7934B0',
        ps100: '#94A7CB',
        ps50: '#C3D4E9',
        gray900: '#1A202C',
        gray850: '#293346',
        gray800: '#424B5C',
        gray700: '#3D5278',
        gray400: '#90A3BF',
        white: '#FFFFFF',
        white100: '#F7F9FC',
        white200: '#F6F7F9',
      },
      screens: {
        xs: '475px',
        xl: '1440px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;

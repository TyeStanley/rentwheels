import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        deep: '#0B1D26',
        navy: '#0F2B3C',
        teal: { DEFAULT: '#1A6B5A', light: '#2A9D8F' },
        gold: { DEFAULT: '#D4A843', light: '#E8C96A' },
        cream: '#FAF7F2',
        warm: '#FDFCFA',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: { xl: '20px' },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1200px',
        },
      },
      colors: {
        background: '#d0cfbb',
        primary: '#191C36',
        secondary: '#292733',
        'card-bg': '#C3BFAE',
        input: '#F0EBD4',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(60%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

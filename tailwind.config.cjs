/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        slideDown: 'slideDown 8s ease-in-out infinite',
      },
      keyframes: {
        slideDown: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%, 90%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        'londrina': ['"Londrina Solid"', 'cursive'], // Add Londrina Solid
      },
      colors: {
        'dark-grey': '#333333', // or any hex value for dark grey,
        'yawn-primary': '#00C3FF',
        'yawn-purple': '#9747FF',
        'yawn-lemon': '#FFAE00',
        'yawn-dark-purple': '#400072',
      },
    },
  },
  plugins: [],
};

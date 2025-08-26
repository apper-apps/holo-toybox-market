/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Fredoka One', 'cursive'],
        'sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: '#7B68EE',
        secondary: '#FFB6C1',
        accent: '#FFA500',
        surface: '#FFF5F7',
        background: '#FAFAFA',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      borderRadius: {
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'lift': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
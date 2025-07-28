/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html',
    'components/*.html',
    '*.html',  // Untuk semua file HTML di root
    './src/**/*.{html,js}' // Jika ada file lain di folder src
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#dc2626',
        secondary: '#64748b',
        dark: '#0f172a',
      },
    },
  },
  plugins: [],
}
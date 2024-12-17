/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'surface': 'var(--surface)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
      },
    },
  },
  plugins: [],
}

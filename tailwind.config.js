/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4f46e5',
        'primary-dark': '#4338ca',
        'secondary': '#10b981',
        'background': '#111827',
        'surface': '#1f2937',
        'text-primary': '#f9fafb',
        'text-secondary': '#d1d5db',
        'border': '#374151',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        slate: {
          100: '#cbd5e1', // Maps to slate-300 default
          200: '#94a3b8', // Maps to slate-400 default
        }
      },
      colors: {
        slate: {
          300: '#64748b', // Darkened to slate-500 equivalent for small text contrast
          400: '#334155'  // Deepened to slate-700 equivalent for absolute safety
        },
        primary: {
          DEFAULT: '#ff6b00',
          hover: '#e66000',
        },
        background: {
          DEFAULT: '#f8f9fa',
          dark: '#121212',
        },
        sidebar: {
          DEFAULT: '#ffffff',
          dark: '#1e1e1e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

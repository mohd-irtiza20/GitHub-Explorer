/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Approximates Roboto
        display: ['Outfit', 'system-ui', 'sans-serif'], // Approximates Google Sans
      },
      colors: {
        google: {
          bg: '#F8F9FA',
          surface: '#FFFFFF',
          surfaceHover: '#F1F3F4',
          border: '#DADCE0',
          textPrimary: '#202124',
          textSecondary: '#5F6368',
          blue: '#1A73E8',
          blueHover: '#1557B0',
          blueLight: '#E8F0FE',
          green: '#1E8E3E',
          greenLight: '#E6F4EA',
          yellow: '#F9AB00',
          yellowLight: '#FEF7E0',
          red: '#D93025',
          redLight: '#FCE8E6',
        }
      },
      boxShadow: {
        'google-1': '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
        'google-2': '0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
        'google-3': '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
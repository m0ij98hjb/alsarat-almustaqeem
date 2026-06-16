/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FBF7E8',
          100: '#F5ECC4',
          200: '#EDD882',
          300: '#E4C43F',
          400: '#C9A227',
          500: '#A8841A',
          600: '#836712',
          700: '#614D0D',
          800: '#3F3208',
          900: '#1E1804',
        },
        islamic: {
          green:        '#1B4332',
          'green-mid':  '#2D6A4F',
          'green-light':'#52B788',
          navy:         '#0A1628',
          'navy-mid':   '#162035',
          'navy-light': '#1E2D45',
          cream:        '#F8F6F0',
          'cream-dark': '#EDE8DA',
        },
      },
      fontFamily: {
        arabic: ['var(--font-amiri)', 'Amiri', 'serif'],
        naskh:  ['var(--font-noto)', 'Noto Naskh Arabic', 'serif'],
        sans:   ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'islamic-pattern': "url('/images/pattern.svg')",
        'hero-gradient': 'linear-gradient(165deg, #0A1628 0%, #1B4332 50%, #162035 100%)',
      },
      animation: {
        'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0.4)' },
          '50%':       { boxShadow: '0 0 0 20px rgba(201,162,39,0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

module.exports = config
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wamao: {
          bg: '#F5E6C8',
          'bg-warm': '#EDE0C8',
          ink: '#1A1A1A',
          text: '#2C2C2C',
          red: '#B83A2B',
          brown: '#5C3A1E',
          gold: '#C9A227'
        }
      },
      fontFamily: {
        serif: ["'Noto Serif SC'", 'SimSun', 'serif'],
        display: ["'Ma Shan Zheng'", 'cursive']
      }
    }
  },
  plugins: []
}

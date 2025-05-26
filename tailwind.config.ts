import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6b00',
          dark: '#cc5500'
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a'
        }
      }
    }
  },
  plugins: []
} satisfies Config
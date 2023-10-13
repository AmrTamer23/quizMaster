import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cText': '#333333',
        'navyBlue': '#2b3d50',
        'secondary': '#e77e23',
       },
      },
  },
  plugins: [],
}
export default config

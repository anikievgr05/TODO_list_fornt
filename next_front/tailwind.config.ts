import type { Config } from 'tailwindcss'
import tailwindcssForm from '@tailwindcss/forms'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark_charcoal: '#27262B',
        silver_mist: '#B2B1B6',
        stormy_gray: '#5B5A5F',
        deep_onyx: '#36363A',
        vivid_violet: '#8993F9',
        hot_crimson: '#F9305E',
        fresh_lime: '#50C878',
      },
    },
  },
  plugins: [tailwindcssForm],
}
export default config

// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   content: ['./src/**/*.js'],
//   darkMode: 'media',
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Nunito', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   variants: {
//     extend: {
//       opacity: ['disabled'],
//     },
//   },
//   plugins: [require('@tailwindcss/forms')],
// }

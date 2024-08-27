import daisyui from 'daisyui'

const naturalcycles = {
  50: '#fff1fc',
  100: '#ffe2fa',
  200: '#ffc5f4',
  300: '#ff97e7',
  400: '#ff5ad7',
  500: '#ff1dcf',
  600: '#fd00db',
  700: '#d300b2',
  800: '#ac008f',
  900: '#72035d',
  950: '#60004f',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: { colors: { naturalcycles } },
  },
  plugins: [daisyui],
  daisyui: { themes: [] },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0f0c0c',
        black: '#050505',
        white: '#FFFFFF',
        gray: {
          100: '#e9e9e9',
          200: '#d2d2d2',
          300: '#bcbcbc',
          400: '#a5a5a5',
          500: '#8f8f8f',
          600: '#727272',
          700: '#565656',
          800: '#393939',
          900: '#1d1d1d',
        },
        primary: {
          100: '#ebccce',
          200: '#d89a9c',
          300: '#c4676b',
          400: '#b13539',
          500: '#9d0208',
          600: '#7e0206',
          700: '#5e0105',
          800: '#3f0103',
          900: '#1f0002',
        },
        danger: '#a71829',
      },
      fontFamily: {
        'urbanist-thin': ['Urbanist-Thin'],
        'urbanist-extralight': ['Urbanist-ExtraLight'],
        'urbanist-light': ['Urbanist-Light'],
        'urbanist-regular': ['Urbanist-Regular'],
        'urbanist-medium': ['Urbanist-Medium'],
        'urbanist-semibold': ['Urbanist-SemiBold'],
        'urbanist-bold': ['Urbanist-Bold'],
        'urbanist-extrabold': ['Urbanist-ExtraBold'],
        'urbanist-black': ['Urbanist-Black'],
      },
    },
  },
  plugins: [],
};

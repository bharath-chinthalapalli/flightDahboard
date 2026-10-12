/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: {
    relative: true,
    files: ['./src/**/*.{html,ts}'],
  },
  theme: {
    extend: {
      screens: {
      'xxs':'320',
      'xs':'280px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '1920px',
    },
    colors: {
      bg_border:"#eaeaea",
      text_secondary:"#3F4850",
      text_primary:"#0B1C30",
      bg_content:"F8F9FF",
     
   

  },
    },
  },
  plugins: [],
}

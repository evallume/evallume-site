/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'group-hover:w-full',
    'w-0',
    'transition-all',
    'duration-300',
    'group-hover:text-white',
    'group-hover:scale-110',
    'group-hover:drop-shadow-[0_2px_18px_#bfcbd8cc]'
  ],
  theme: {
    extend: {
      colors: {
        // Можешь здесь свои брендовые цвета прописать!
        brandblue: "#bfcbd8",
        brandbeige: "#e6dad1",
        brandbrown: "#9d5a4d",
        primary: "#9d5a4d",
        accent: "#bfcbd8",
        secondary: "#e6dad1",
        nav: "#222A37",
        bg: "#F9F9FB",
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

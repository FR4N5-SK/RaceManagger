/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"

  ],
  theme: {
    extend: {
      colors: {
        "azul-cielo": "#00A3E0",
        "verde-lima": "#A8D600",
        "naranja-brillante": "#FF6F20",
        "rojo-intenso": "#C8102E",
        "gris-claro": "#F5F5F5"
      },
      fontFamily: {
        "Oswald": ["Oswald", "sans-serif"],
        "Open-Sans": ["Open Sans", "sans-serif"]
      }
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Si usas un archivo HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de que tailwind escanee tus archivos .ts y .tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

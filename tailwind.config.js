/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Colores de marca leídos desde src/styles/tokens.css.
      // El cliente solo edita ese archivo; aquí no hay que tocar nada.
      // <alpha-value> permite seguir usando opacidades (bg-oliva/25, etc.).
      colors: {
        brand: 'rgb(var(--vs-brand) / <alpha-value>)',
        oliva: 'rgb(var(--vs-oliva) / <alpha-value>)',
        crema: 'rgb(var(--vs-crema) / <alpha-value>)',
        'crema-clara': 'rgb(var(--vs-crema-clara) / <alpha-value>)',
        dorado: 'rgb(var(--vs-dorado) / <alpha-value>)',
      },
      fontFamily: {
        serif: 'var(--vs-font-serif)',
        sans: 'var(--vs-font-sans)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        stone: "#f5f5f4",
        mist: "#e7e5e4"
      }
    }
  },
  plugins: []
};

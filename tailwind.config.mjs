/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define these variables in your CSS file
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class', // Enable dark mode using the class strategy
  plugins: [],
};

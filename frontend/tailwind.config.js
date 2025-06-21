module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Include all pages
    './components/**/*.{js,ts,jsx,tsx}', // Include components folder
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // Indigo
        secondary: '#f97316', // Orange
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        archive: ['Archive', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#F5F5F4',
          100: '#EEEEEE',
          200: '#EFEDF3',
          300: '#D1D5DB',
          400: '#8F8F8F',
          500: '#3B3B3B',
          600: '#585660',
          700: '#404040',
          800: '#737373'
        },
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
        },
      },
    },
  },
  plugins: [],
};
export default config;

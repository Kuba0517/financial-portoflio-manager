import type { Config } from "tailwindcss";
import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        secondary: '#A8DADC',
        background: '#f1faee',
        accent: '#457B9D',
        dark: '#1D3557',
      },
    },
  },
  plugins: [
    formsPlugin,
    typographyPlugin,
    aspectRatioPlugin,
  ],
} satisfies Config;

import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
          level: {
            1: 'color-mix(in lch, hsl(var(--card)) 25%, hsl(var(--background)))',
            2: 'color-mix(in lch, hsl(var(--card)) 50%, hsl(var(--background)))',
            3: 'color-mix(in lch, hsl(var(--card)) 75%, hsl(var(--background)))',
            4: 'color-mix(in lch, hsl(var(--card)) 100%, hsl(var(--background)))',
          },
        },
        glass: {
          DEFAULT: 'var(--card-bg-trans)',
          lighter: 'color-mix(in lch, var(--card-bg-trans) 80%, var(--page-background))',
          darker: 'color-mix(in lch, var(--card-bg-trans) 90%, #300033)',
          opaque: 'var(--card-bg)',
          white: 'hsl(0 0% 100% / <alpha-value>)',
          black: 'hsl(0 0% 0% / <alpha-value>)',
          primary: {
            DEFAULT: 'var(--glass-primary-trans)',
            darker: 'color-mix(in lch, var(--glass-primary-trans) 80%, #300033)',
            lighter: 'color-mix(in lch, var(--glass-primary-trans) 90%, #ffffff)',
          },
          secondary: {
            DEFAULT: 'var(--glass-secondary-trans)',
            darker: 'color-mix(in lch, var(--glass-secondary-trans) 80%, #300033)',
            lighter: 'color-mix(in lch, var(--glass-secondary-trans) 90%, #ffffff)',
          },
          accent: 'var(--glass-accent-trans)',
          destructive: 'var(--glass-destructive-trans)',
        },
        average: {
          DEFAULT: 'var(--bg-average)',
          lighter: 'color-mix(in lch, var(--bg-average) 10%, var(--page-background))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [...fontFamily.sans],
      },
      backgroundImage: {
        radial: 'radial-gradient(var(--tw-gradient-stops))',
        main: 'var(--page-background)',
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(0, 1fr))',
        'fluid-50': 'repeat(auto-fit, minmax(50px, 1fr))',
        'fluid-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'fluid-150': 'repeat(auto-fit, minmax(150px, 1fr))',
        'fluid-200': 'repeat(auto-fit, minmax(200px, 1fr))',
        'fluid-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'fluid-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'fluid-350': 'repeat(auto-fit, minmax(350px, 1fr))',
        'fluid-400': 'repeat(auto-fit, minmax(400px, 1fr))',
        'fluid-450': 'repeat(auto-fit, minmax(450px, 1fr))',
        'fluid-500': 'repeat(auto-fit, minmax(500px, 1fr))',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};

export default config;

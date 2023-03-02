import { defineConfig } from 'windicss/helpers'
import type { Plugin } from 'windicss/types/interfaces'

// colors
import colors from 'windicss/colors'

// themes
import defaultTheme from 'windicss/defaultTheme'

// plugins
import TypographyPlugin from 'windicss/plugin/typography'
import AspectRatioPlugin from 'windicss/plugin/aspect-ratio'
import FiltersPlugin from 'windicss/plugin/filters'

const MyTheme = {
  colors: {
    green: {
      DEFAULT: '#B5EAEA',
      '50': '#ffffff',
      '100': '#edfafa',
      '200': '#daf5f5',
      '300': '#c8efef',
      '400': '#b5eaea',
      '500': '#9be0e0',
      '600': '#81d6d6',
      '700': '#68cccc',
      '800': '#4ec2c2',
      '900': '#34b8b8',
    },
    yellow: {
      DEFAULT: '#EDF6E5',
      '50': '#ffffff',
      '100': '#fbfdf9',
      '200': '#f6fbf2',
      '300': '#f2f8ec',
      '400': '#edf6e5',
      '500': '#dbedca',
      '600': '#c8e4b0',
      '700': '#b6da95',
      '800': '#a3d17b',
      '900': '#91c860',
    },
    red: {
      DEFAULT: '#F38BA0',
      '50': '#ffffff',
      '100': '#fde8ec',
      '200': '#fad1d9',
      '300': '#f8b9c6',
      '400': '#f5a2b3',
      '500': '#f38ba0',
      '600': '#e46d85',
      '700': '#d64f6a',
      '800': '#c7314f',
      '900': '#b81334',
    },
  },
}

export default defineConfig({
  darkMode: 'class',
  attributify: false,
  extract: {
    include: [
      './components/**/*.{vue,js}',
      './composables/**/*.{js,ts}',
      './content/**/*.md',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './utils/**/*.{js,ts}',
      './app.vue',
    ],
  },
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      colors: {
        // if want to change primary color to blue
        primary: MyTheme.colors.green,
        green: MyTheme.colors.green,
        red: MyTheme.colors.red,
        slate: colors.slate,
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  shortcuts: {
    'light-img': 'block dark:hidden',
    'dark-img': 'hidden dark:block',
  },
  plugins: [
    // filters plugin require for navbar blur
    FiltersPlugin as Plugin,
    TypographyPlugin as Plugin,
    AspectRatioPlugin as Plugin,
  ] as Plugin[],
})

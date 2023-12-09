
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | Shadows

  export const Tokens = {
  colors: {
    accent: {
      '50': '#ffeeb4',
      '100': '#ffe690',
      '200': '#fede6d',
      '300': '#fed649',
      '400': '#fecf2d',
      '500': '#fec709',
      '600': '#e2b001',
      '700': '#a27e01',
      '800': '#7f6201',
      '900': '#5b4700',
      base: '#FEC709',
    },
    bg: {
      '50': '#646473',
      '100': '#535360',
      '200': '#42424c',
      '300': '#323239',
      '400': '#25252a',
      '500': '#141417',
      '600': '#030304',
      '700': '#000000',
      '800': '#000000',
      '900': '#000000',
      base: '#141417',
    },
    'bg-highlight': {
      '50': '#6c6c7b',
      '100': '#5b5b68',
      '200': '#4b4b55',
      '300': '#3a3a42',
      '400': '#2d2d33',
      '500': '#1c1c20',
      '600': '#0b0b0d',
      '700': '#000000',
      '800': '#000000',
      '900': '#000000',
      base: '#1C1C20',
    },
  },
  fontSizes: {},
  fontWeights: {},
  lineHeights: {},
  boxShadows: {},
}
  
import { sharedColors, grey, green, red, blue, yellow } from './colorPalettes';

type SharedColors = typeof sharedColors;

export type ColorTheme = {
  primary: string;
  secondary: string;
  textSecondary: string;
  textPrimary: string;
  bgPrimary: string;
  bgSecondary: string;
};

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

const Colors: ColorPalettes = {
  dark: {
    primary: blue[2],
    secondary: blue[1],
    textPrimary: grey[1],
    textSecondary: grey[5],
    bgPrimary: grey[5],
    bgSecondary: grey[4],
    ...sharedColors,
  },
  light: {
    primary: blue[5],
    secondary: blue[4],
    textPrimary: grey[5],
    textSecondary: grey[1],
    bgPrimary: grey[1],
    bgSecondary: grey[2],
    ...sharedColors,
  },
};

export default Colors;

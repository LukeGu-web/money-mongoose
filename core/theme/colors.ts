import { sharedColors, grey, green, red, blue, yellow } from './colorPalettes';

type SharedColors = typeof sharedColors;

export type ColorTheme = {
  primary: string;
  secondary: string;
  textSecondary: string;
  textPrimary: string;
  bgPrimary: string;
  bgSecondary: string;
  iconColor: string;
  iconBgColor: string;
  incomeTextColor: string;
  incomeBgColor: string;
  expenseTextColor: string;
  expenseBgColor: string;
};

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

const Colors: ColorPalettes = {
  dark: {
    primary: blue[5],
    secondary: blue[4],
    textPrimary: sharedColors.white,
    textSecondary: grey[5],
    bgPrimary: grey[5],
    bgSecondary: grey[4],
    iconColor: blue[5],
    iconBgColor: yellow[2],
    incomeTextColor: green[1],
    incomeBgColor: green[5],
    expenseTextColor: red[1],
    expenseBgColor: red[5],
    ...sharedColors,
  },
  light: {
    primary: blue[5],
    secondary: blue[4],
    textPrimary: sharedColors.black,
    textSecondary: grey[1],
    bgPrimary: grey[1],
    bgSecondary: grey[2],
    iconColor: blue[5],
    iconBgColor: yellow[2],
    incomeTextColor: green[5],
    incomeBgColor: green[1],
    expenseTextColor: red[5],
    expenseBgColor: red[1],
    ...sharedColors,
  },
};

export default Colors;

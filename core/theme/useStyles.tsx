import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { TColors } from './colors';
import useTheme from './useTheme';

interface Styles<T extends StyleSheet.NamedStyles<T>> {
  theme: TColors;
  styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyle: (theme: TColors) => T
): Styles<T> {
  const { theme } = useTheme();

  return {
    theme: theme,
    styles: useMemo(() => createStyle(theme), [theme, createStyle]),
  };
}

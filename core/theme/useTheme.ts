import Colors, { TColors } from './colors';
import { create } from 'zustand';

type ThemeState = {
  theme: TColors;
  setTheme: (theme: TColors) => void;
};

const useTheme = create<ThemeState>((set) => ({
  theme: Colors.light,
  setTheme: (theme) => {
    set(() => ({ theme: theme }));
  },
}));

export default useTheme;

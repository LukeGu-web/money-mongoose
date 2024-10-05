import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingStoreState = {
  isEnabledAuth: boolean;
  isEnabledBlur: boolean;
  isEnabledReminder: boolean;
  lockTime: number;
  theme: 'light' | 'dark';
  setIsEnabledAuth: (isEnabledAuth: boolean) => void;
  setIsEnabledBlur: (isEnabledBlur: boolean) => void;
  setIsEnabledReminder: (isEnabledReminder: boolean) => void;
  setLockTime: (lockTime: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const useSettingStore = create<SettingStoreState>()(
  persist(
    devtools((set) => ({
      isEnabledAuth: false,
      isEnabledBlur: false,
      isEnabledReminder: false,
      lockTime: 1,
      theme: 'light',
      setIsEnabledAuth: (isEnabledAuth) => {
        set(() => ({ isEnabledAuth }));
      },
      setIsEnabledBlur: (isEnabledBlur) => {
        set(() => ({ isEnabledBlur }));
      },
      setIsEnabledReminder: (isEnabledReminder) => {
        set(() => ({ isEnabledReminder }));
      },
      setLockTime: (lockTime) => {
        set(() => ({ lockTime }));
      },
      setTheme: (theme) => {
        set(() => ({ theme }));
      },
    })),
    {
      name: 'setting-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useSettingStore;

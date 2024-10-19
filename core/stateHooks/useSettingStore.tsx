import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingStoreState = {
  isEnabledAuth: boolean;
  isEnabledBlur: boolean;
  isEnabledReminder: boolean;
  lockTime: number;
  reminderId: null | string;
  reminderTime: Date;
  theme: 'light' | 'dark';
  setIsEnabledAuth: (isEnabledAuth: boolean) => void;
  setIsEnabledBlur: (isEnabledBlur: boolean) => void;
  setIsEnabledReminder: (isEnabledReminder: boolean) => void;
  setLockTime: (lockTime: number) => void;
  setReminderId: (reminderId: null | string) => void;
  setReminderTime: (reminderTime: Date) => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const useSettingStore = create<SettingStoreState>()(
  persist(
    devtools((set) => ({
      isEnabledAuth: false,
      isEnabledBlur: false,
      isEnabledReminder: false,
      lockTime: 1,
      reminderId: null,
      reminderTime: new Date(),
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
      setReminderId: (reminderId) => {
        set(() => ({ reminderId }));
      },
      setReminderTime: (reminderTime) => {
        set(() => ({ reminderTime }));
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

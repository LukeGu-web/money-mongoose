import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingStoreState = {
  isEnabledAuth: boolean;
  isEnabledBlur: boolean;
  lockTime: number;
  setIsEnabledAuth: (isEnabledAuth: boolean) => void;
  setIsEnabledBlur: (isEnabledBlur: boolean) => void;
  setLockTime: (lockTime: number) => void;
};

const useSettingStore = create<SettingStoreState>()(
  persist(
    devtools((set) => ({
      isEnabledAuth: false,
      isEnabledBlur: false,
      lockTime: 1,
      setIsEnabledAuth: (isEnabledAuth) => {
        set(() => ({ isEnabledAuth }));
      },
      setIsEnabledBlur: (isEnabledBlur) => {
        set(() => ({ isEnabledBlur }));
      },
      setLockTime: (lockTime) => {
        set(() => ({ lockTime }));
      },
    })),
    {
      name: 'setting-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useSettingStore;

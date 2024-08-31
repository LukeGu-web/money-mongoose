import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingStoreState = {
  isEnabledAuth: boolean;
  isEnabledBlur: boolean;
  setIsEnabledAuth: (isEnabledAuth: boolean) => void;
  setIsEnabledBlur: (isEnabledBlur: boolean) => void;
};

const useSettingStore = create<SettingStoreState>()(
  persist(
    devtools((set) => ({
      isEnabledAuth: false,
      isEnabledBlur: false,
      setIsEnabledAuth: (isEnabledAuth) => {
        set(() => ({ isEnabledAuth }));
      },
      setIsEnabledBlur: (isEnabledBlur) => {
        set(() => ({ isEnabledBlur }));
      },
    })),
    {
      name: 'setting-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useSettingStore;

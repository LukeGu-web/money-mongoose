import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LocalState = {
  deviceId: string;
  token: string;
  isOnBoarding: boolean;
  isAcceptedAgreement: boolean;
  isEnabledBlur: boolean;
  setDeviceId: (deviceId: string) => void;
  setToken: (token: string) => void;
  setIsOnBoarding: (isOnBoarding: boolean) => void;
  setIsAcceptedAgreement: (isAcceptedAgreement: boolean) => void;
  setIsEnabledBlur: (isEnabledBlur: boolean) => void;
  reset: () => void;
};

const useLocalStore = create<LocalState>()(
  persist(
    devtools((set) => ({
      deviceId: '',
      token: '',
      isOnBoarding: false,
      isAcceptedAgreement: false,
      isEnabledBlur: false,
      setDeviceId: (deviceId) => {
        set(() => ({ deviceId }));
      },
      setToken: (token) => {
        set(() => ({ token }));
      },
      setIsOnBoarding: (isOnBoarding) => {
        set(() => ({ isOnBoarding }));
      },
      setIsAcceptedAgreement: (isAcceptedAgreement) => {
        set(() => ({ isAcceptedAgreement }));
      },
      setIsEnabledBlur: (isEnabledBlur) => {
        set(() => ({ isEnabledBlur }));
      },
      reset: () => {
        set(() => ({
          deviceId: '', // 851bfd8c-9017-4e4f-8fd2-82d560c7d67f
          token: '', //41631ca394cd7441f37766dafebb220736e54644
          isOnBoarding: false,
          isAcceptedAgreement: false,
        }));
      },
    })),
    {
      name: 'local-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useLocalStore;

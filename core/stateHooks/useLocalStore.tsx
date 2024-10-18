import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LocalState = {
  isOnBoarding: boolean;
  isAcceptedAgreement: boolean;
  expoPushToken: string | null;
  setIsOnBoarding: (isOnBoarding: boolean) => void;
  setIsAcceptedAgreement: (isAcceptedAgreement: boolean) => void;
  setExpoPushToken: (expoPushToken: string) => void;
  reset: () => void;
};

const useLocalStore = create<LocalState>()(
  persist(
    devtools((set) => ({
      isOnBoarding: false,
      isAcceptedAgreement: false,
      expoPushToken: null,
      setIsOnBoarding: (isOnBoarding) => {
        set(() => ({ isOnBoarding }));
      },
      setIsAcceptedAgreement: (isAcceptedAgreement) => {
        set(() => ({ isAcceptedAgreement }));
      },
      setExpoPushToken: (expoPushToken) => {
        set(() => ({ expoPushToken }));
      },
      reset: () => {
        set(() => ({
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

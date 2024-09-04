import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LocalState = {
  isOnBoarding: boolean;
  isAcceptedAgreement: boolean;
  setIsOnBoarding: (isOnBoarding: boolean) => void;
  setIsAcceptedAgreement: (isAcceptedAgreement: boolean) => void;
  reset: () => void;
};

const useLocalStore = create<LocalState>()(
  persist(
    devtools((set) => ({
      isOnBoarding: false,
      isAcceptedAgreement: false,
      setIsOnBoarding: (isOnBoarding) => {
        set(() => ({ isOnBoarding }));
      },
      setIsAcceptedAgreement: (isAcceptedAgreement) => {
        set(() => ({ isAcceptedAgreement }));
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

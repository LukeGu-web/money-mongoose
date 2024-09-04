import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LocalUserType = {
  id: number;
  account_id: string | null; // Device ID
  avatar: string | null;
  nickname: string;
  account_status: string;
  token: string;
  // the following part is from user section
  email: string;
  date_joined: string;
};

const defaultUser: LocalUserType = {
  id: -1,
  account_id: null,
  avatar: null,
  nickname: 'anonymous',
  account_status: 'unregistered',
  token: '',
  email: '',
  date_joined: '',
};

type UserState = {
  user: LocalUserType;
  setUser: (user: LocalUserType) => void;
  reset: () => void;
};

const useUserStore = create<UserState>()(
  persist(
    devtools((set) => ({
      user: defaultUser,
      setUser: (user) => {
        set(() => ({ user }));
      },
      reset: () => {
        set(() => ({
          user: defaultUser,
        }));
      },
    })),
    {
      name: 'user-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useUserStore;

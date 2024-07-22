import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountType } from 'api/asset/types';

type AccountState = {
  accounts: { [groupName: string]: AccountType[] };
  numOfGroups: number;
  addGroup: (name: string) => void;
  addAccount: (account: AccountType) => void;
  resetAccounts: () => void;
};

const useAccounts = create<AccountState>()(
  persist(
    devtools((set) => ({
      accounts: { Saving: [], Credit: [], Investment: [] },
      numOfGroups: 0,
      addGroup: (name) => {
        set((state) => ({ accounts: { ...state.accounts, [name]: [] } }));
      },
      addAccount: (account) => {
        set((state) => ({
          accounts: {
            ...state.accounts,
            [account.group]: [...state.accounts[account.group], account],
          },
          numOfGroups: state.numOfGroups + 1,
        }));
      },
      resetAccounts: () => {
        set(() => ({
          accounts: { Saving: [], Credit: [], Investment: [] },
        }));
      },
    })),
    {
      name: 'account-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useAccounts;

import { create } from 'zustand';
import { AccountType } from 'api/asset/types';

type AccountState = {
  accounts: { [groupName: string]: AccountType[] };
  numOfGroups: number;
  addGroup: (name: string) => void;
  addAccount: (account: AccountType) => void;
};

const useAccounts = create<AccountState>((set) => ({
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
}));

export default useAccounts;

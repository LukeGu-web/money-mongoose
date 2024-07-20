import { create } from 'zustand';
import { AccountType } from 'api/asset/types';

type AccountState = {
  accounts: AccountType[];
  addAccount: (account: AccountType) => void;
};

const useAccounts = create<AccountState>((set) => ({
  accounts: [],
  addAccount: (account) => {
    set((state) => ({
      accounts: [...state.accounts, account],
    }));
  },
}));

export default useAccounts;

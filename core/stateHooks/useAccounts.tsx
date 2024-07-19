import { create } from 'zustand';
import { AccountType } from 'api/asset/types';

type AccountState = {
  accounts: AccountType[];
  addAccount: (account: AccountType) => void;
};

const useAccounts = create<AccountState>((set, get) => ({
  accounts: [],
  addAccount: (account) => {
    set(() => ({
      accounts: [...get().accounts, account],
    }));
  },
}));

export default useAccounts;

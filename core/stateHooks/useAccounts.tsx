import { create } from 'zustand';

type AccountType = {
  accountName: string;
  group: string;
  balance: string;
  isCredit: boolean;
  creditLimit: string;
  repaymentDay: string;
  isTotalAssets: boolean;
  isNoBudget: boolean;
  note: string;
};

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

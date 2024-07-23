import { create } from 'zustand';
import { AccountType } from 'api/asset/types';

type CalendarState = {
  account: AccountType;
  setSelect: (value: { group: string } | AccountType) => void;
  resetAccount: () => void;
};

const defaultValue = {
  accountName: '',
  group: '',
  balance: '',
  isCredit: false,
  creditLimit: '',
  billDay: '',
  repaymentDay: '',
  isTotalAssets: true,
  isNoBudget: false,
  note: '',
};

const useAsset = create<CalendarState>((set) => ({
  account: defaultValue,
  setSelect: (value) => {
    set((state) => ({ account: { ...state.account, ...value } }));
  },
  resetAccount: () => {
    set(() => ({
      account: defaultValue,
    }));
  },
}));

export default useAsset;

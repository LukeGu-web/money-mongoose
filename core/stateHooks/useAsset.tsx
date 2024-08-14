import { create } from 'zustand';
import { AssetType } from 'api/types';

type AssetState = {
  asset: AssetType;
  setSelect: (value: AssetType) => void;
  resetAsset: () => void;
};

const defaultValue: AssetType = {
  name: '',
  group: 0,
  balance: 0,
  is_credit: false,
  credit_limit: 0,
  bill_day: new Date(),
  repayment_day: new Date(),
  is_total_asset: true,
  is_no_budget: false,
  note: '',
};

const useAsset = create<AssetState>((set) => ({
  asset: defaultValue,
  setSelect: (value) => {
    set((state) => ({ asset: { ...state.asset, ...value } }));
  },
  resetAsset: () => {
    set(() => ({
      asset: defaultValue,
    }));
  },
}));

export default useAsset;

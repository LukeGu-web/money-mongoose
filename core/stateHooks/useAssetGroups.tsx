import { create } from 'zustand';
import dayjs from 'dayjs';

type AssetGroupsState = {
  groups: string[];
  addGroup: (name: string) => void;
};

const useAssetGroups = create<AssetGroupsState>((set) => ({
  groups: ['Saving', 'Credit', 'Investment'],
  addGroup: (name) => {
    set((state) => ({ groups: [...state.groups, name] }));
  },
}));

export default useAssetGroups;

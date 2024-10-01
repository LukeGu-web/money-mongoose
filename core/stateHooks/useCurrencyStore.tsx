import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryType } from 'components/Dropdown/types';

type CurrencyState = {
  list: CountryType[];
  addCountry: (country: CountryType) => void;
  removeCountry: (country: CountryType) => void;
};

const useCurrencyStore = create<CurrencyState>()(
  devtools(
    persist(
      immer((set, get) => ({
        list: [],
        addCountry: (country) => {
          set((state) => {
            state.list.push(country);
          });
        },
        removeCountry: (country) => {
          set((state) => {
            const index = state.list.findIndex(
              (item) => item.country === country.country
            );
            state.list.splice(index, 1);
          });
        },
      })),
      {
        name: 'currency-storage', // unique name
        storage: createJSONStorage(() => AsyncStorage), // Add this here!
      }
    )
  )
);

export default useCurrencyStore;

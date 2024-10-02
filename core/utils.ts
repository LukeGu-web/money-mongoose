import { AssetType } from 'api/types';
import symbol from 'static/currency-symbol.json';
import { CountryType } from 'components/Dropdown/types';

export function calculateDate(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days))
    .toISOString()
    .split('T')[0];
}

export const formatter = (num: number) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatAsset = (
  asset: number,
  flatAssets: AssetType[],
  isNameOnly: boolean
) => {
  let curentAsset = undefined;
  if (asset) {
    const targetAsset = flatAssets.find((item) => item.id === asset);
    if (targetAsset)
      curentAsset = isNameOnly
        ? targetAsset.name
        : `${targetAsset.id}-${targetAsset.name}`;
  }
  return curentAsset;
};

export const currencySymbol = (country: CountryType) =>
  /* @ts-ignore: ignore json type */
  symbol[country.currency_code] ?? country.currency_code;

import { BookType } from 'api/types';

export function calculateDate(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days))
    .toISOString()
    .split('T')[0];
}

export const formatter = (num: number) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });

export const formatAsset = (
  asset: number,
  book: BookType,
  isNameOnly: boolean
) => {
  let curentAsset = undefined;
  if (asset) {
    const flatAssets = book.groups.flatMap((group) => group.assets);
    const targetAsset = flatAssets.find((item) => item.id === asset);
    if (targetAsset)
      curentAsset = isNameOnly
        ? targetAsset.name
        : `${targetAsset.id}-${targetAsset.name}`;
  }
  return curentAsset;
};

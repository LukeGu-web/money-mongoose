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

export const calculateAssets = (book: BookType) =>
  book.groups.reduce(
    ([netAssetSum, assetSum, liabilitySum], group) => {
      const { assets: groupAssets, liabilities: groupLiabilities } =
        group.assets.reduce(
          (acc, item) => {
            if (item.is_credit) {
              acc.liabilities += Number(item.balance);
            } else {
              acc.assets += Number(item.balance);
            }
            return acc;
          },
          { assets: 0, liabilities: 0 }
        );

      const netAsset = groupAssets + groupLiabilities;

      return [
        netAssetSum + netAsset,
        assetSum + groupAssets,
        liabilitySum + groupLiabilities,
      ];
    },
    [0, 0, 0]
  );

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

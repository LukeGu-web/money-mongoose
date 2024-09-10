import { BookType } from 'api/types';

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

export const stringToColor = (str: string) => {
  let hash = 0;
  str.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }
  return color;
};

function generateRandomColor() {
  // Generating a random number between 0 and 0xFFFFFF
  const randomColor = Math.floor(Math.random() * 0xffffff);
  // Converting the number to a hexadecimal string and padding with zeros
  return `#${randomColor.toString(16).padStart(6, '0')}`;
}

// export const ChartDataGenerator = (numberPoints = 5) =>
//   Array.from({ length: numberPoints }, (_, index) => ({
//     value: randomNumber(),
//     color: generateRandomColor(),
//     label: `Label ${index + 1}`,
//   }));

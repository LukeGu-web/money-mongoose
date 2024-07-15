export function calculateDate(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days))
    .toISOString()
    .split('T')[0];
}

export const formatter = (num: number) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });

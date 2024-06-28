export function calculateDate(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days))
    .toISOString()
    .split('T')[0];
}

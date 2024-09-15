import { LineDataType } from './types';

export const formatYAxisLabel = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value}`;
};

export const getChartTypeAndLabels = (data: LineDataType[]) => {
  const length = data.length;
  if (length <= 7) {
    return data.map((item) => {
      const date = new Date(item.date);
      return {
        ...item,
        label: date
          .toLocaleDateString('en-US', { weekday: 'short' })
          .slice(0, 3),
      };
    });
  } else if (length <= 12) {
    return data.map((item) => {
      const date = new Date(item.date);
      return {
        ...item,
        label: date.toLocaleDateString('en-US', { month: 'short' }).slice(0, 3),
      };
    });
  } else {
    return data.map((item, index) => {
      const date = new Date(item.date);
      if (index === 0 || index === data.length || index % 3 === 0) {
        return {
          ...item,
          label: date.getDate().toString(),
        };
      } else {
        return item;
      }
    });
  }
};

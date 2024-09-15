import { useState, useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import {
  LineDataType,
  getChartTypeAndLabels,
  formatYAxisLabel,
} from './chart-utils';

const Pointer = (items: LineDataType[]) => {
  const item = items[0];
  if (!item) return null;
  return (
    <View className='justify-center w-24 h-20'>
      <Text className='text-center'>{item.date}</Text>
      <View className='px-3 py-1 rounded-2xl bg-slate-200'>
        <Text className='font-bold text-center'>{'$' + item.value}</Text>
      </View>
    </View>
  );
};

export default function Line({ data }: { data: LineDataType[] }) {
  const [isRight, setIsRight] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 70;
  const chartHeight = 300;

  const handleLabelPosition = ({
    pointerX,
  }: {
    pointerIndex: number;
    pointerX: number;
    pointerY: number;
  }) => {
    setIsRight(pointerX > chartWidth / 2);
  };

  const maxValue = useMemo(() => {
    if (data && data.length === 0) return 1; // Avoid 0 maxValue
    const maxVal = Math.max(...data.map((item) => item.value));
    return maxVal === 0 ? 1 : maxVal; // Avoid 0 for maxValue
  }, [data]);

  const avgValue = useMemo(() => {
    return data.length === 0
      ? 0
      : data.reduce((sum, item) => sum + item.value, 0) / data.length;
  }, [data]);

  const chartData = useMemo(() => {
    const newData = getChartTypeAndLabels(data);
    return newData;
  }, [data]);

  const yAxisLabelTexts = useMemo(() => {
    return [
      { value: 0, label: '0' },
      { value: avgValue, label: avgValue === 0 ? '' : 'Avg' },
      { value: maxValue, label: maxValue === 0 ? '' : 'Max' },
    ];
  }, [avgValue, maxValue]);

  if (data.every((item) => item.value === 0)) {
    return (
      <View className='items-center justify-center w-full p-2 bg-white h-72'>
        <Text>No meaningful data to display</Text>
      </View>
    );
  }

  return (
    <View className='w-full p-2 bg-white'>
      <LineChart
        areaChart
        curved
        data={chartData}
        width={chartWidth}
        height={chartHeight}
        hideDataPoints
        spacing={chartWidth / (data.length + 1)}
        color='#00ff83'
        thickness={2}
        startFillColor='rgba(20,105,81,0.3)'
        endFillColor='rgba(20,85,81,0.01)'
        startOpacity={0.8}
        endOpacity={0.1}
        initialSpacing={20}
        noOfSections={2}
        maxValue={maxValue}
        yAxisLabelTexts={yAxisLabelTexts.map((item) =>
          formatYAxisLabel(item.value)
        )}
        yAxisColor='lightgray'
        rulesColor='lightgray'
        rulesType='dashed'
        xAxisColor='lightgray'
        xAxisLabelTextStyle={{
          color: 'gray',
          fontSize: data.length > 7 ? 8 : 10,
          textAlign: 'center',
        }}
        getPointerProps={handleLabelPosition}
        pointerConfig={{
          pointerStripHeight: chartHeight - 20,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          shiftPointerLabelX: isRight ? -70 : 10,
          pointerColor: 'lightgray',
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: Pointer,
        }}
      />
    </View>
  );
}

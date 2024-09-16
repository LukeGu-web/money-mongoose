import { useState } from 'react';
import { PieChartDataType } from 'api/types';
import { View, Text, Image } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Legend, { DetailsType } from './PieLegend';
import TypeSelector from './TypeSelector';
const noDataImage = require('../../assets/illustrations/nodata/no-data-pie-chart.png');

export enum Types {
  EXPENSE = 'expense',
  INCOME = 'income',
}

type PieProps = {
  data: PieChartDataType;
  total: string;
  details: { [key: string]: DetailsType };
  type: string;
  onChangeType: (type: string) => void;
};

export default function Pie({
  data,
  details,
  total,
  type,
  onChangeType,
}: PieProps) {
  if (data.length === 0) {
    return (
      <View className='items-center justify-center w-full p-2 bg-white'>
        <Image className='w-72 h-72' source={noDataImage} />
        <Text className='text-lg font-semibold'>No data to display</Text>
      </View>
    );
  }

  return (
    <View className='items-center justify-start flex-1 w-full gap-4 '>
      <View className='mb-8 opacity-70'>
        <PieChart
          strokeColor='white'
          strokeWidth={2}
          donut
          data={data}
          innerCircleColor='#fff'
          innerCircleBorderWidth={2}
          innerCircleBorderColor={'white'}
          showValuesAsLabels={true}
          textSize={18}
          centerLabelComponent={() => {
            return (
              <View className='items-center justify-center'>
                <Text className='text-2xl color-black'>{total}</Text>
                <Text className='color-black'>Total</Text>
              </View>
            );
          }}
        />
      </View>
      <TypeSelector Types={Types} type={type} onChangeType={onChangeType} />
      {/*********************    Custom Legend component      ********************/}
      <View className='items-start gap-2 p-2 m-2 rounded-lg bg-slate-100'>
        {data.map((item) => (
          <Legend
            key={item.text}
            value={item.value}
            text={item.text}
            color={item.color}
            details={details[item.text]}
          />
        ))}
      </View>
      {/****************************************************************************/}
    </View>
  );
}

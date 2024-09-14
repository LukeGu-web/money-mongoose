import { useState } from 'react';
import { PieChartDataType } from 'api/types';
import { View, Text, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Legend, { DetailsType } from './PieLegend';

type PieProps = {
  data: PieChartDataType;
  total: string;
  details: { [key: string]: DetailsType };
};

const types = ['expense', 'income'];

export default function Pie({ data, details, total }: PieProps) {
  const [type, setType] = useState('expense');
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
      <View className='flex-row items-center border-2 rounded-lg border-slate-800'>
        {Object.values(types).map((item, index) => (
          <Pressable
            key={item}
            className={`items-center justify-center py-1 px-2 border-slate-800 ${
              index === 0 && 'border-r-2'
            } ${type === item && 'bg-slate-800'}`}
            onPress={() => setType(item)}
          >
            <Text
              className={`text-center font-medium ${
                type === item ? 'color-white' : 'color-slate-800'
              }`}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
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

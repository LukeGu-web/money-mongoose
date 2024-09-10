import { PieChartDataType } from 'api/types';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

type PieProps = {
  data: PieChartDataType;
  total: string;
};

function Legend({
  text,
  color,
  value,
}: {
  text: string;
  color: string;
  value: number;
}) {
  return (
    <View className='flex-row'>
      <View
        className='w-4 h-4 mr-2 rounded-md opacity-70'
        style={{
          backgroundColor: color || 'white',
        }}
      />
      <Text>{text}</Text>
      <Text className='ml-4'>{value}%</Text>
    </View>
  );
}

export default function Pie({ data, total }: PieProps) {
  return (
    <View className='items-center justify-start flex-1 w-full gap-4 '>
      <View className='opacity-70'>
        <PieChart
          strokeColor='black'
          strokeWidth={2}
          donut
          data={data}
          innerCircleColor='#fff'
          innerCircleBorderWidth={2}
          innerCircleBorderColor={'black'}
          showValuesAsLabels={true}
          // showText
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
      {/*********************    Custom Legend component      ********************/}
      <View className='items-start gap-2'>
        {data.map((item) => (
          <Legend
            key={item.text}
            value={item.value}
            text={item.text}
            color={item.color}
          />
        ))}
      </View>
      {/****************************************************************************/}
    </View>
  );
}

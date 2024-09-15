import { useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type LinePointType = {
  value: number;
  date: string;
};

const Pointer = (items: LinePointType[]) => (
  <View className='justify-center w-24 h-20'>
    <Text className='text-center'>{items[0].date}</Text>

    <View className='px-3 py-1 rounded-2xl bg-slate-200'>
      <Text className='font-bold text-center'>
        {'$' + items[0].value + '.0'}
      </Text>
    </View>
  </View>
);

type LineProps = {
  data: {
    value: number;
    date: string;
  }[];
};

export default function Line({ data }: LineProps) {
  const [isRight, setIsRight] = useState(false);
  const handleLabelPosition = ({
    pointerX,
  }: {
    pointerIndex: number;
    pointerX: number;
    pointerY: number;
  }) => {
    if (pointerX > 200) {
      setIsRight(true);
    } else {
      setIsRight(false);
    }
  };
  return (
    <View className='w-full p-2 bg-white'>
      <LineChart
        areaChart
        data={data}
        rotateLabel
        width={300}
        hideDataPoints
        spacing={10}
        color='#00ff83'
        thickness={2}
        startFillColor='rgba(20,105,81,0.3)'
        endFillColor='rgba(20,85,81,0.01)'
        startOpacity={0.8}
        endOpacity={0.1}
        initialSpacing={10}
        noOfSections={3}
        stepHeight={100}
        height={300}
        yAxisColor='white'
        yAxisThickness={0}
        rulesColor='gray'
        yAxisTextStyle={{ color: 'gray' }}
        xAxisColor='lightgray'
        getPointerProps={handleLabelPosition}
        pointerConfig={{
          pointerStripHeight: 200,
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

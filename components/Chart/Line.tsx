import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type LinePointType = {
  value: number;
  date: string;
};

const types = ['expense', 'income', 'balance'];

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
  const [type, setType] = useState('expense');
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
    <View className='flex-1 w-full p-2 bg-white'>
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
      <View className='items-center justify-center'>
        <View className='flex-row items-center border-2 rounded-lg border-slate-800'>
          {Object.values(types).map((item, index) => (
            <Pressable
              key={item}
              className={`items-center justify-center py-1 px-2 border-slate-800 ${
                index < 2 && 'border-r-2'
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
      </View>
    </View>
  );
}

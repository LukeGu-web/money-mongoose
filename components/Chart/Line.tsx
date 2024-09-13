import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type LinePointType = {
  value: number;
  date: string;
};

const Pointer = (items: LinePointType[]) => (
  <View
    style={{
      height: 90,
      width: 100,
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        color: 'white',
        fontSize: 14,
        marginBottom: 6,
        textAlign: 'center',
      }}
    >
      {items[0].date}
    </Text>

    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: 'white',
      }}
    >
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
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
  return (
    <View className='flex-1 w-full p-2 bg-black'>
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
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={10}
        noOfSections={3}
        stepHeight={100}
        height={300}
        yAxisColor='white'
        yAxisThickness={0}
        rulesColor='gray'
        yAxisTextStyle={{ color: 'gray' }}
        xAxisColor='lightgray'
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          pointerColor: 'lightgray',
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          // activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: Pointer,
        }}
        // isAnimated
        // animationDuration={10000}
      />
    </View>
  );
}

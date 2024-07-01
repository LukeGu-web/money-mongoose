// import { View, View, Text, View } from "@gluestack-ui/themed";
import { Text, View } from 'react-native';
import React from 'react';
import { Pie, PolarChart } from 'victory-native';

const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 125;
function generateRandomColor(): string {
  // Generating a random number between 0 and 0xFFFFFF
  const randomColor = Math.floor(Math.random() * 0xffffff);
  // Converting the number to a hexadecimal string and padding with zeros
  return `#${randomColor.toString(16).padStart(6, '0')}`;
}

const data = [
  {
    value: 10,
    color: generateRandomColor(),
    label: 'First',
  },
  {
    value: 20,
    color: generateRandomColor(),
    label: 'Second',
  },
  {
    value: 30,
    color: generateRandomColor(),
    label: 'Third',
  },
  {
    value: 25,
    color: generateRandomColor(),
    label: 'Fourth',
  },
  {
    value: 15,
    color: generateRandomColor(),
    label: 'Fifth',
  },
];

export const PieChart = () => {
  return (
    <View
      style={{ width: '100%', height: '20%' }}
      $dark-bg='$black'
      $light-bg='$white'
      //   paddingHorizontal={5}
      //   paddingVertical={30}
    >
      <View
        style={{ width: '100%', height: '20%' }}
        $dark-bg='$black'
        $light-bg='$white'
      >
        <PolarChart
          data={data}
          colorKey={'color'}
          valueKey={'value'}
          labelKey={'label'}
        >
          <Pie.Chart>
            {() => {
              return (
                <>
                  <Pie.Slice />
                </>
              );
            }}
          </Pie.Chart>
        </PolarChart>
      </View>
      <View
        style={{ width: '100%', height: '20%' }}
        $dark-bg='$black'
        $light-bg='$white'
      >
        {data.map((val, index) => {
          return (
            <View
              key={index}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <View
                style={{ height: 10, width: 10, backgroundColor: val.color }}
              />
              <Text style={{ width: 80 }}>{val.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

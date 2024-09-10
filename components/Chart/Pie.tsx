import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
export default function Pie() {
  const renderLegend = (text: string, color: string) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'white',
          }}
        />
        <Text style={{ color: 'white', fontSize: 16 }}>{text || ''}</Text>
      </View>
    );
  };

  return (
    <View className='items-center justify-start flex-1 w-full gap-4 bg-zinc-800'>
      {/*********************    Custom Header component      ********************/}
      <Text className='text-3xl font-bold color-white'>Quarterly Sales</Text>
      {/****************************************************************************/}

      <PieChart
        strokeColor='white'
        strokeWidth={2}
        donut
        data={[
          { value: 30, color: 'rgb(84,219,234)', text: 'Jan' },
          { value: 40, color: 'lightgreen', text: 'Feb' },
          { value: 20, color: 'orange', text: 'Mar' },
        ]}
        innerCircleColor='#414141'
        innerCircleBorderWidth={2}
        innerCircleBorderColor={'white'}
        showValuesAsLabels={true}
        showText
        textSize={18}
        centerLabelComponent={() => {
          return (
            <View>
              <Text className='text-2xl color-white'>90</Text>
              <Text className='color-white'>Total</Text>
            </View>
          );
        }}
      />

      {/*********************    Custom Legend component      ********************/}
      <View className='flex-row w-full justify-evenly'>
        {renderLegend('Jan', 'rgb(84,219,234)')}
        {renderLegend('Feb', 'lightgreen')}
        {renderLegend('Mar', 'orange')}
      </View>
      {/****************************************************************************/}
    </View>
  );
}

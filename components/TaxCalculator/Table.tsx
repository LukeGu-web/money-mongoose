import { Text, FlatList, ScrollView } from 'react-native';
import { formatter } from 'core/utils';

type TableProps = {
  pay: number;
  base: number;
  tax: number;
  superannuation: number;
};

const colHeader = ['', 'Pay', 'Base', 'Super', 'Tax'];

export default function Table({ pay, base, tax, superannuation }: TableProps) {
  const weekData = [
    'Weekly',
    formatter(pay / 52),
    formatter(base / 52),
    formatter(superannuation / 52),
    formatter(tax / 52),
  ];
  const fortnightData = [
    'Fortnightly',
    formatter(pay / 26),
    formatter(base / 26),
    formatter(superannuation / 26),
    formatter(tax / 26),
  ];
  const monthData = [
    'Monthly',
    formatter(pay / 12),
    formatter(base / 12),
    formatter(superannuation / 12),
    formatter(tax / 12),
  ];
  const annualData = [
    'Annually',
    formatter(pay),
    formatter(base),
    formatter(superannuation),
    formatter(tax),
  ];
  const colData = [weekData, fortnightData, monthData, annualData];
  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 16 }}>
      <FlatList
        data={colHeader}
        renderItem={({ item }) => (
          <Text key={item} className='py-2 font-semibold'>
            {item}
          </Text>
        )}
      />
      {colData.map((data, index) => (
        <FlatList
          key={index}
          data={data}
          scrollEnabled={false}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Text
              key={item}
              className={`py-2 text-center ${
                item.toString().includes('ly') && 'font-semibold'
              }`}
            >
              {item}
            </Text>
          )}
        />
      ))}
      {/* <FlatList
        data={weekData}
        renderItem={({ item }) => (
          <Text key={item} className='py-1 text-center'>
            {item}
          </Text>
        )}
      />
      <FlatList
        data={fortnightData}
        renderItem={({ item }) => (
          <Text key={item} className='text-center'>
            {item}
          </Text>
        )}
      />
      <FlatList
        data={monthData}
        renderItem={({ item }) => (
          <Text key={item} className='text-center'>
            {item}
          </Text>
        )}
      />
      <FlatList
        data={annualData}
        renderItem={({ item }) => (
          <Text key={item} className='text-center'>
            {item}
          </Text>
        )}
      /> */}
    </ScrollView>
  );
}

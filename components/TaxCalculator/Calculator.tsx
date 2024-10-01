import { useState, useRef } from 'react';
import { View, Text, TextInput, Switch, Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import taxBrackets from './tax-brackets.json';
import Table from './Table';
import SelectFinancialYearBottomSheet from '../BottomSheet/SelectFinancialYearBottomSheet';
import Icon from '../Icon/Icon';

const calculateTax = (salary: number, year: string) => {
  // @ts-ignore: ignore json type
  const brackets = taxBrackets[year];
  let tax = 0;

  for (let i = brackets.length - 1; i >= 0; i--) {
    if (salary > brackets[i].threshold) {
      tax =
        brackets[i].baseTax +
        (salary - brackets[i].threshold) * brackets[i].rate;
      break;
    }
  }

  return tax;
};

export default function TaxCalculator() {
  const [salary, setSalary] = useState<number>(50000);
  const [superRate, setSuperRate] = useState<number>(11.5);
  const [year, setYear] = useState<string>('2024-2025');
  const [includeSuper, setIncludeSuper] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const baseSalary = includeSuper ? (salary * 100) / (100 + superRate) : salary;
  const superannuation = (baseSalary * superRate) / 100;
  const tax = calculateTax(baseSalary, year);
  const pay = baseSalary - tax;

  const handleSelectYear = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <View className='flex-1 w-full gap-2'>
      <View className='gap-4 px-2 py-4 bg-blue-200 rounded-lg'>
        <View className='flex-row items-center justify-between gap-2 '>
          <Text className='font-semibold'>Enter Annual Salary:</Text>
          <TextInput
            className='flex-1 p-2 border-2 rounded-lg border-zinc-500'
            clearButtonMode='while-editing'
            value={salary.toString()}
            onChangeText={(value) => setSalary(Number(value))}
            keyboardType='numeric'
            placeholder='Enter salary'
            placeholderTextColor='#a1a1aa'
          />
        </View>

        <Pressable
          className='flex-row items-center justify-between gap-2'
          onPress={handleSelectYear}
        >
          <Text className='font-semibold'>Select Financial Year:</Text>
          <View className='flex-row'>
            <Text>{year}</Text>
            <Icon name='arrow-right' size={14} color='black' />
          </View>
        </Pressable>

        <View className='flex-row items-center justify-between gap-2'>
          <Text className='font-semibold'>Include Superannuation:</Text>
          <Switch value={includeSuper} onValueChange={setIncludeSuper} />
        </View>
        <View className='flex-row items-center justify-between gap-2 '>
          <Text className='font-semibold'>Superannuation:</Text>
          <TextInput
            className='flex-1 p-2 border-2 rounded-lg border-zinc-500'
            clearButtonMode='while-editing'
            value={superRate.toString()}
            onChangeText={(value) => setSuperRate(Number(value))}
            keyboardType='numeric'
            placeholder='Enter superannuation rates'
            placeholderTextColor='#a1a1aa'
          />
          <Text>%</Text>
        </View>
      </View>
      <View className='p-2 rounded-lg bg-zinc-200'>
        <Text className='mb-4 text-2xl text-center'>Summary</Text>
        <Table
          pay={pay}
          base={baseSalary}
          tax={tax}
          superannuation={superannuation}
        />
      </View>

      <SelectFinancialYearBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        value={year}
        onChange={(value) => setYear(value)}
      />
    </View>
  );
}

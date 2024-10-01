import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Modal,
  Pressable,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

import { useUpdateBook } from 'api/book';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useSettingStore } from 'core/stateHooks';
import { formatter } from 'core/utils';
import log from 'core/logger';
import { GoalProcess } from '../Chart/GoalProcess';
import Icon from '../Icon/Icon';

type BudgetCardProps = {
  monthExpense: number;
};

export default function BudgetCard({ monthExpense }: BudgetCardProps) {
  const { mutate: updateBookApi, isPending } = useUpdateBook();
  const { currentBook, setCurrentBook } = useBookStore();
  const theme = useSettingStore((state) => state.theme);
  const expenseAmount = Math.abs(monthExpense);
  const days = dayjs().date();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(
    (currentBook.monthly_goal !== null ? Number(currentBook.monthly_goal) : 0) +
      monthExpense
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
    },
  });

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleConfirm = handleSubmit((data) => {
    updateBookApi(
      { id: currentBook.id, monthly_goal: Number(data.amount) },
      {
        onSuccess: (response) => {
          log.success('Set monthly goal on book success:', response);
          setCurrentBook(response);
          setRemaining(Number(response.monthly_goal) + monthExpense);
          setIsVisible(false);
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      }
    );
  });

  return (
    <View className='justify-between flex-1 p-2'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-2xl font-bold dark:color-white'>
          Month Budget
        </Text>
        <Pressable
          className='flex-row items-center justify-between gap-2'
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text className='dark:color-white'>
            {currentBook.monthly_goal === null
              ? 'set goal'
              : currentBook.monthly_goal}
          </Text>
          <Icon
            name='edit'
            size={14}
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </Pressable>
      </View>
      <View className='flex-row items-stretch justify-between flex-1 gap-2 py-2'>
        <View className='items-center justify-center flex-1 pt-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-300'>
          <GoalProcess
            targetPercentage={
              currentBook.monthly_goal !== null
                ? expenseAmount / Number(currentBook.monthly_goal)
                : 0
            }
          />
        </View>
        <View className='items-center justify-center flex-1 rounded-lg bg-zinc-100 dark:bg-zinc-300'>
          <Text className='text-lg'>{formatter(expenseAmount)}</Text>
          <Text>Spend</Text>
        </View>
        <View className='items-center justify-center flex-1 rounded-lg bg-zinc-100 dark:bg-zinc-300'>
          <Text
            className={`${
              remaining > 0 ? 'color-green-800' : 'color-red-800'
            } text-lg`}
          >
            {formatter(Math.abs(remaining))}
          </Text>
          <Text>{remaining > 0 ? 'Remaining' : 'Overspent'}</Text>
        </View>
      </View>
      <View>
        <View className='flex-row items-center justify-between'>
          <Text className='dark:color-white'>Average Daily Spending</Text>
          <Text className='dark:color-white'>
            {formatter(expenseAmount / days)}
          </Text>
        </View>
        <View className='flex-row items-center justify-between'>
          <Text className='dark:color-white'>Remaining Daily</Text>
          <Text className='dark:color-white'>
            {formatter(
              remaining > 0 ? remaining / (dayjs().daysInMonth() + 1 - days) : 0
            )}
          </Text>
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      >
        <View
          className='items-center justify-center h-full'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg'>
            <Text className='text-3xl'>Monthly Budget</Text>
            {isPending ? (
              <ActivityIndicator size='large' />
            ) : (
              <View className='items-center w-full gap-4'>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className='w-full p-3 border-2 rounded-lg border-zinc-600'
                      placeholder='Please enter the budget amount'
                      placeholderTextColor='#a1a1aa'
                      keyboardType='numeric'
                      autoFocus={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name='amount'
                />
                <View className='flex-row w-4/5 justify-evenly'>
                  <Button color='gray' title='Cancel' onPress={handleCancel} />
                  <Button title='Confirm' onPress={handleConfirm} />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

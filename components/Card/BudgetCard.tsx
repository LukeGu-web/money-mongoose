import { useState, useEffect } from 'react';
import { Text, TextInput, View, Modal, Pressable, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

import { useUpdateBook } from 'api/book';
import { formatApiError } from 'api/errorFormat';
import { useBookStore } from 'core/stateHooks';
import { formatter } from 'core/utils';
import log from 'core/logger';
import { GoalProcess } from '../Chart/GoalProcess';
import Icon from '../Icon/Icon';
import { BookType } from 'api/types';

type BudgetCardProps = {
  monthExpense: number;
};

export default function BudgetCard({ monthExpense }: BudgetCardProps) {
  const { mutate: updateBookApi } = useUpdateBook();
  const { getCurrentBook, updateBook } = useBookStore();
  const { id, monthly_goal } = getCurrentBook() as BookType;
  const expenseAmount = Math.abs(monthExpense);
  const days = dayjs().date();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(
    (monthly_goal !== null ? Number(monthly_goal) : 0) + monthExpense
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
      { id: id, monthly_goal: Number(data.amount) },
      {
        onSuccess: (response) => {
          log.success('Set monthly goal on book success:', response);
          updateBook(response);
          setRemaining(Number(response.monthly_goal));
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
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Month Budget</Text>
        <Pressable
          className='flex-row items-center justify-between gap-2'
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text>{monthly_goal === null ? 'set goal' : monthly_goal}</Text>
          <Icon name='edit' size={14} color='#000' />
        </Pressable>
      </View>
      <View className='flex-row items-stretch justify-between flex-1 gap-2 py-2'>
        <View className='items-center justify-center flex-1 pt-2.5 rounded-lg bg-zinc-100'>
          <GoalProcess
            targetPercentage={
              monthly_goal !== null ? expenseAmount / Number(monthly_goal) : 0
            }
          />
        </View>
        <View className='items-center justify-center flex-1 rounded-lg bg-zinc-100 '>
          <Text className='text-lg'>{formatter(expenseAmount)}</Text>
          <Text>Spend</Text>
        </View>
        <View className='items-center justify-center flex-1 rounded-lg bg-zinc-100 '>
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
          <Text>Average Daily Spending</Text>
          <Text>{formatter(expenseAmount / days)}</Text>
        </View>
        <View className='flex-row items-center justify-between'>
          <Text>Remaining Daily</Text>
          <Text>
            {formatter(
              remaining > 0 ? remaining / (dayjs().daysInMonth() - days) : 0
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
            <Text style={{ fontSize: 24 }}>Monthly Budget</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='w-full p-3 border-2 rounded-lg border-zinc-600'
                  placeholder='Please enter the budget amount'
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
        </View>
      </Modal>
    </View>
  );
}

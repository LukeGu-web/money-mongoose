import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import dayjs from 'dayjs';

import { useMonthlyAnalysis } from 'core/stateHooks';
import { formatter } from 'core/utils';
import { GoalProcess } from '../Chart/GoalProcess';
import Icon from '../Icon/Icon';

type BudgetCardProps = {
  monthExpense: number;
};

export default function BudgetCard({ monthExpense }: BudgetCardProps) {
  const expenseAmount = Math.abs(monthExpense);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { goal, setGoal } = useMonthlyAnalysis(
    useShallow((state) => ({
      goal: state.goal,
      setGoal: state.setGoal,
    }))
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
    setGoal(Number(data.amount));
    setIsVisible(false);
  });

  const days = dayjs().date();
  const remaining = (goal ?? 0) + monthExpense;
  const dailyRemaining =
    remaining > 0 ? remaining / (dayjs().daysInMonth() - days) : 0;

  return (
    <View className='justify-between flex-1 p-2'>
      <View className='flex-row items-center justify-between'>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Month Budget</Text>
        <TouchableOpacity
          className='flex-row items-center justify-between gap-2'
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text>{goal === null ? 'set goal' : goal}</Text>
          <Icon name='edit' size={14} color='#000' />
        </TouchableOpacity>
      </View>
      <View className='flex-row items-stretch justify-between flex-1 gap-2 py-2'>
        <View className='items-center justify-center flex-1 pt-2.5 rounded-lg bg-zinc-100'>
          <GoalProcess targetPercentage={goal ? expenseAmount / goal : 0} />
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
          <Text>{formatter(dailyRemaining)}</Text>
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

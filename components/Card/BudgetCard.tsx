import { useState } from 'react';
import {
  StyleSheet,
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

import { useStyles, TColors } from 'core/theme';
import { useMonthlyAnalysis } from 'core/stateHooks';
import { formatter } from 'core/utils';
import { GoalProcess } from '../Chart/GoalProcess';
import Icon from '../Icon/Icon';

type BudgetCardProps = {
  monthExpense: number;
};

export default function BudgetCard({ monthExpense }: BudgetCardProps) {
  const { styles, theme } = useStyles(createStyles);
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
    <View style={styles.container}>
      <View style={styles.verticalContainer}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Month Budget</Text>
        <TouchableOpacity
          style={{ ...styles.verticalContainer, gap: 5 }}
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text>{goal === null ? 'set goal' : goal}</Text>
          <Icon name='edit' size={14} color={theme.black} />
        </TouchableOpacity>
      </View>
      <View style={[styles.verticalContainer, styles.midContainer]}>
        <View
          style={{
            ...styles.midBlock,
            paddingTop: 10,
          }}
        >
          <GoalProcess targetPercentage={goal ? expenseAmount / goal : 0} />
        </View>
        <View style={styles.midBlock}>
          <Text className='text-lg'>{formatter(expenseAmount)}</Text>
          <Text>Spend</Text>
        </View>
        <View style={styles.midBlock}>
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
      <View style={styles.botContainer}>
        <View style={styles.verticalContainer}>
          <Text>Average Daily Spending</Text>
          <Text>{formatter(expenseAmount / days)}</Text>
        </View>
        <View style={styles.verticalContainer}>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 24 }}>Monthly Budget</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.numInput}
                  placeholder='Please enter the budget amount'
                  keyboardType='numeric'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='amount'
            />

            <View style={styles.buttonGroup}>
              <Button color='gray' title='Cancel' onPress={handleCancel} />
              <Button title='Confirm' onPress={handleConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 8,
    },
    verticalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    midContainer: {
      flex: 1,
      gap: 6,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    midBlock: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: theme.bgPrimary,
    },
    botContainer: {
      borderWidth: 2,
      borderBottomWidth: 0,
      borderColor: 'red',
      borderStyle: 'dashed',
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      height: '100%',
    },
    modalView: {
      width: '90%',
      backgroundColor: theme.white,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: theme.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      gap: 16,
    },
    numInput: {
      width: '90%',
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
    },
    buttonGroup: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });

import { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FontAwesome6 } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';
import PickerBottomSheet from 'components/BottomSheet/PickerBottomSheet';
import monthlyDay from 'static/monthly-day.json';

export default function AssetCreditForm() {
  const { theme, styles } = useStyles(createStyles);
  const { control } = useFormContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressSelect = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.rowWrapper}>
              <Text style={styles.headerText}>Credit limit</Text>
              <TextInput
                placeholder='0.00'
                keyboardType='numeric'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name='creditLimit'
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.rowWrapper}>
              <Text style={styles.headerText}>Repayment Day</Text>
              <View>
                <TouchableOpacity onPress={handlePressSelect}>
                  {value ? (
                    <Text>{value}</Text>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Text style={{ color: '#bfc0c0' }}>Select the day</Text>
                      <FontAwesome6
                        name='angle-right'
                        size={14}
                        color='#bfc0c0'
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <PickerBottomSheet
                  bottomSheetModalRef={bottomSheetModalRef}
                  data={monthlyDay}
                  value={value}
                  onChange={onChange}
                />
              </View>
            </View>
          )}
          name='repaymentDay'
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      gap: 8,
    },
    rowWrapper: {
      height: 40,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {},
  });

import { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Icon from '../Icon/Icon';
import { useStyles, TColors } from 'core/theme';
import { useAssetStore } from 'core/stateHooks';
import SelectGroupBottomSheet from '../BottomSheet/SelectGroupBottomSheet';
import { inputAccessoryCreateBtnID } from './static';

export default function AssetAccountBasicForm() {
  const { theme, styles } = useStyles(createStyles);
  const { control, setValue, getValues } = useFormContext();
  const accounts = useAssetStore((state) => state.accounts);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePressSelect = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Keyboard.dismiss();
    if (!getValues('group')) setValue('group', Object.keys(accounts)[0]);
  }, []);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.rowWrapper}>
            <Text style={styles.headerText}>Account Name</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              placeholder='Enter the amount name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name='accountName'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.rowWrapper}>
            <Text style={styles.headerText}>Group</Text>
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
                    <Text style={{ color: '#bfc0c0' }}>Select group</Text>
                    <Icon name='arrow-right' size={14} color='#bfc0c0' />
                  </View>
                )}
              </TouchableOpacity>
              <SelectGroupBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                value={value}
                onChange={onChange}
              />
            </View>
          </View>
        )}
        name='group'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.rowWrapper}>
            <Text style={styles.headerText}>Balance</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              placeholder='0.00'
              keyboardType='numeric'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name='balance'
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.rowWrapper}>
            <Text style={styles.headerText}>Credit</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              ios_backgroundColor='#f8f9fa'
              onValueChange={(e) => {
                onChange(e);
                Keyboard.dismiss();
              }}
              value={value}
            />
          </View>
        )}
        name='isCredit'
      />
    </View>
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

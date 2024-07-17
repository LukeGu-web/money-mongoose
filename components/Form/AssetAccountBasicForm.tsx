import { View, Text, Switch, StyleSheet } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';

import { useStyles, TColors } from 'core/theme';
import { TextInput } from 'react-native-gesture-handler';

export default function AssetAccountBasicForm() {
  const { theme, styles } = useStyles(createStyles);
  const { control } = useFormContext();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.rowWrapper}>
            <Text style={styles.headerText}>Account Name</Text>
            <TextInput
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
            <TextInput
              //   style={styles.numInput}
              placeholder='Select group'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
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
              //   style={styles.numInput}
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
              onValueChange={onChange}
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

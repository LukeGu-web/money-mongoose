import { View, Text, Switch, StyleSheet, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';

import { useStyles, TColors } from 'core/theme';
import { TextInput } from 'react-native-gesture-handler';

export default function AssetAccountOtherForm() {
  const { theme, styles } = useStyles(createStyles);
  const { control } = useFormContext();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.rowWrapper}>
            <Text style={styles.headerText}>Include in total assets</Text>
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
        name='isTotalAssets'
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.rowWrapper}>
            <Text style={styles.headerText}>No budget</Text>
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
        name='isNoBudget'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.noteWrapper}>
            <Text style={styles.headerText}>Note</Text>
            <TextInput
              style={styles.noteInput}
              multiline={true}
              numberOfLines={6}
              placeholder='Enter a note'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name='note'
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
    noteWrapper: {
      flex: 1,
      width: '100%',
      gap: 5,
    },
    noteInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#6c757d',
      borderRadius: 4,
      alignItems: 'flex-start',
      padding: 8,
    },
    headerText: {},
  });

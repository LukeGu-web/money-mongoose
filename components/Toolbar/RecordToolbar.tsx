import { SetStateAction, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

import Icon from '../Icon/Icon';
import { useStyles, TColors } from 'core/theme';
import { formatter } from 'core/utils';

export default function RecordToolbar() {
  const { styles } = useStyles(createStyles);
  const [date, setDate] = useState(new Date());

  const onChange = (e: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        style={{ width: 90 }}
        value={date}
        mode={'date'}
        display='calendar'
        onChange={onChange}
      />
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={styles.text}>no account</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={{ ...styles.iconWrapper, marginVertical: 4 }}>
        <Icon name='tax' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper}>
        <Icon name='camera' size={32} color='black' />
      </TouchableOpacity> */}
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      height: 48,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 16,
      gap: 8,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderColor: '#faf3dd',
    },
    textWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: theme.bgPrimary,
    },
    text: {
      fontSize: 16,
    },
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
  });

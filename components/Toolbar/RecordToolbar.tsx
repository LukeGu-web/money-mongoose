import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';
import { formatter } from 'core/utils';

export default function RecordToolbar() {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={{ fontSize: 16 }}>Jun 20</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={{ fontSize: 16 }}>account details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.iconWrapper, marginVertical: 4 }}>
        <MaterialCommunityIcons name='cash-refund' size={24} color='black' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper}>
        <FontAwesome5 name='camera-retro' size={32} color='black' />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      height: 64,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
      gap: 6,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderColor: '#faf3dd',
      //   backgroundColor: '#faf3dd',
    },
    textWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
  });

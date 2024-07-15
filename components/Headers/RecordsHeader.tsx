import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

import { RecordTypes } from 'api/record/types';
import { useRecord } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';
import Icon from '../Icon/Icon';

export default function RecordsHeader() {
  // const { record, setRecord } = useRecord(
  //   useShallow((state) => ({
  //     record: state.record,
  //     setRecord: state.setRecord,
  //   }))
  // );
  const { theme, styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')}>
        <Icon name='left' size={24} color={theme.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Record list</Text>
      <TouchableOpacity>
        <Icon name='setting' size={24} color={theme.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textSecondary,
    },
  });

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';

import { RecordTypes } from 'api/record/types';
import { useRecord } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';
import Icon from '../Icon/Icon';

export default function RecordHeader() {
  const { record, setRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
    }))
  );
  const { theme, styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate('/')}>
        <Icon name='left' size={24} color={theme.textSecondary} />
      </TouchableOpacity>
      <View style={styles.buttonGroup}>
        {Object.values(RecordTypes).map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              record.type === item && styles.selectedButton,
            ]}
            onPress={() => {
              setRecord({ type: item });
            }}
          >
            <Text
              style={[
                styles.buttonText,
                record.type === item && styles.selectedButtonText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    buttonGroup: {
      flex: 0.5,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.textSecondary,
      borderRadius: 5,
    },
    button: {
      flex: 1,
      padding: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedButton: {
      backgroundColor: theme.textSecondary,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 14,
      color: theme.textSecondary,
    },
    selectedButtonText: {
      color: theme.textPrimary,
    },
  });

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useRecord } from 'core/stateHooks/useRecord';
import { useShallow } from 'zustand/react/shallow';
import { RecordTypes } from 'api/record/types';

export default function RecordHeader() {
  const { record, setRecord } = useRecord(
    useShallow((state) => ({
      record: state.record,
      setRecord: state.setRecord,
    }))
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')}>
        <AntDesign name='left' size={24} color='#fff' />
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
        <AntDesign name='setting' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: '#fff',
    borderRadius: 5,
  },
  button: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
  selectedButtonText: {
    color: '#000',
  },
});

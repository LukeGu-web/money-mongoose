import { useState } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const recordTypes = ['expense', 'income'];

export default function RecordHeader() {
  const [selectedTab, setSelectedTab] = useState<string>('expense');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')}>
        <AntDesign name='left' size={24} color='#fff' />
      </TouchableOpacity>
      <View style={styles.buttonGroup}>
        {recordTypes.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              selectedTab === item && styles.selectedButton,
            ]}
            onPress={() => setSelectedTab(item)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedTab === item && styles.selectedButtonText,
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

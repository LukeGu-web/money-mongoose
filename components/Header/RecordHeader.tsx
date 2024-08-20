import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { RecordTypes } from 'api/record/types';
import { useAsset, useRecord } from 'core/stateHooks';
import Icon from '../Icon/Icon';

export default function RecordHeader() {
  const { record, setRecord, resetRecord } = useRecord();
  const { resetAsset } = useAsset();
  const handleGoBack = () => {
    resetRecord();
    resetAsset();
    router.navigate('/');
  };
  return (
    <View className='flex-row items-center justify-between flex-1 w-full'>
      <TouchableOpacity className='py-2 pr-2' onPress={handleGoBack}>
        <Icon name='left' size={24} color='#fff' />
      </TouchableOpacity>
      <View
        className='flex-row items-center border-2 border-white rounded-lg'
        style={{ flex: 0.7 }}
      >
        {Object.values(RecordTypes).map((item, index) => (
          <TouchableOpacity
            key={item}
            className={`items-center justify-center p-1 flex-1 border-white ${
              index < 2 && 'border-r-2'
            } ${record.type === item && 'bg-white'}`}
            onPress={() => {
              setRecord({ type: item });
            }}
          >
            <Text
              className={`text-center font-medium ${
                record.type === item ? 'color-indigo-900' : 'color-white'
              }`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity>
        <Icon name='setting' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

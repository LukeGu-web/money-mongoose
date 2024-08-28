import { View, Pressable, Text } from 'react-native';
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
    <View className='flex-row items-center justify-between h-12 px-4 pb-1 -mt-1 bg-primary'>
      <Pressable className='py-2 pr-2' onPress={handleGoBack}>
        <Icon name='left' size={24} color='#fff' />
      </Pressable>
      <View className='flex-row items-center border-2 border-white rounded-lg'>
        {Object.values(RecordTypes).map((item, index) => (
          <Pressable
            key={item}
            className={`items-center justify-center py-1 px-2 border-white ${
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
          </Pressable>
        ))}
      </View>
      <Pressable>
        <Icon name='setting' size={24} color='#fff' />
      </Pressable>
    </View>
  );
}

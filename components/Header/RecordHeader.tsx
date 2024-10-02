import { View, Pressable, Text } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { RecordTypes } from 'api/record/types';
import { useAsset, useRecord } from 'core/stateHooks';
import Icon from '../Icon/Icon';

export default function RecordHeader() {
  const { control, getValues, setValue, reset, resetField } = useFormContext();
  const { resetRecord } = useRecord();
  const { resetAsset } = useAsset();
  const handleGoBack = () => {
    resetRecord();
    resetAsset();
    reset();
    router.navigate('/');
  };
  return (
    <View className='flex-row items-center justify-between h-12 px-4 pb-1 -mt-1 bg-primary'>
      <Pressable className='py-2 pr-2' onPress={handleGoBack}>
        <Icon name='left' size={24} color='#fff' />
      </Pressable>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Please select a record type.',
          },
        }}
        render={({ field: { value } }) => (
          <View className='flex-row items-center border-2 border-white rounded-lg'>
            {Object.values(RecordTypes).map((item, index) => (
              <Pressable
                key={item}
                className={`items-center justify-center py-1 px-2 border-white ${
                  index < 2 && 'border-r-2'
                } ${getValues('type') === item && 'bg-white'}`}
                onPress={() => {
                  if (value !== item) {
                    setValue('type', item);
                    resetField('category');
                    resetField('subcategory');
                    resetField('from_asset');
                    resetField('to_asset');
                  }
                }}
              >
                <Text
                  className={`text-center font-medium ${
                    getValues('type') === item ? 'color-primary' : 'color-white'
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        name='type'
      />
      <Pressable onPress={() => router.navigate('/user/settings')}>
        <Icon name='setting' size={24} color='#fff' />
      </Pressable>
    </View>
  );
}

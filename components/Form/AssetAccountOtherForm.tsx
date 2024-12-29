import { View, Text, Keyboard } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { inputAccessoryCreateBtnID } from './static';
import Switch from '../Switch/Switch';

export default function AssetAccountOtherForm() {
  const { control } = useFormContext();
  return (
    <View className='items-center justify-between flex-1 w-full p-4'>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>Include in total assets</Text>
            <Switch
              onValueChange={(e) => {
                onChange(e);
                Keyboard.dismiss();
              }}
              value={value}
            />
          </View>
        )}
        name='is_total_asset'
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View className='flex-row items-center justify-between w-full h-12'>
            <Text>No budget</Text>
            <Switch
              onValueChange={(e) => {
                onChange(e);
                Keyboard.dismiss();
              }}
              value={value}
            />
          </View>
        )}
        name='is_no_budget'
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='flex-1 w-full gap-2'>
            <Text>Note</Text>
            <TextInput
              inputAccessoryViewID={inputAccessoryCreateBtnID}
              className='items-start p-2 border-2 border-gray-400 rounded-lg'
              style={{ minHeight: 240 }}
              multiline={true}
              numberOfLines={6}
              placeholder='Enter a note'
              placeholderTextColor='#a1a1aa'
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

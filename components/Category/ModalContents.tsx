import { View, Text, TextInput, Pressable } from 'react-native';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import { useSettingStore } from 'core/stateHooks';
import IconTable from './IconTable';
import Icon from '../Icon/Icon';

type SubCategoryProps = {
  subcategory: string[];
  onClose: () => void;
};

type CustomCategoryProps = {
  onClose: () => void;
};

export function Subcategory({ subcategory, onClose }: SubCategoryProps) {
  const theme = useSettingStore((state) => state.theme);
  const { control, getValues, setValue } = useFormContext();
  const handleSubcategory = (item: string, hasSubcategory: boolean) => {
    setValue('subcategory', item, { shouldValidate: true });
    onClose();
  };
  return (
    <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg dark:bg-zinc-600'>
      <View className='flex-row justify-between w-full'>
        <Text className='mb-4 text-xl text-center dark:color-white'>
          {getValues('category')}
        </Text>
        <Pressable onPress={onClose}>
          <Icon
            name='close'
            size={24}
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </Pressable>
      </View>
      <Controller
        control={control}
        render={() => (
          <IconTable data={subcategory} onSelect={handleSubcategory} />
        )}
        name='subcategory'
      />
    </View>
  );
}

export function CustomCategory({ onClose }: CustomCategoryProps) {
  const theme = useSettingStore((state) => state.theme);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: '',
      subcategory: '',
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <View className='items-center w-11/12 gap-4 p-6 bg-white rounded-lg dark:bg-zinc-600'>
      <View className='flex-row justify-between w-full'>
        <Text className='mb-4 text-xl text-center dark:color-white'>
          Custom Category
        </Text>
        <Pressable onPress={onClose}>
          <Icon
            name='close'
            size={24}
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </Pressable>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='w-full gap-2'>
            <Text className='ml-1 dark:color-white'>
              Category <Text className='color-red-500'>*</Text>
            </Text>
            <TextInput
              className='w-full p-3 border-2 rounded-lg border-zinc-200 dark:color-white'
              placeholder='Category is required'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name='category'
      />
      {errors.category && (
        <Text className='w-full color-red-500'>* Category is required.</Text>
      )}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className='w-full gap-2'>
            <Text className='ml-1 dark:color-white'>Subcategory</Text>
            <TextInput
              className='w-full p-3 border-2 rounded-lg border-zinc-200 dark:color-white'
              placeholder='Optional'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name='subcategory'
      />
      <View className='flex-row justify-between w-4/5 mt-4'>
        <Pressable
          className='items-center justify-center px-6 py-2 bg-gray-400 rounded-lg'
          onPress={onClose}
        >
          <Text className='text-xl color-white'>Cancel</Text>
        </Pressable>
        <Pressable
          className='items-center justify-center px-6 py-2 rounded-lg bg-amber-400'
          onPress={onSubmit}
        >
          <Text className='text-xl color-white'>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}

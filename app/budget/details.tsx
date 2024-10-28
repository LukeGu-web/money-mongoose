import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  InputAccessoryView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';

import { useCreateBook, useUpdateBook } from 'api/book';
import { formatApiError } from 'api/errorFormat';
import { useBook, useBookStore, useSettingStore } from 'core/stateHooks';
import log from 'core/logger';
import { successToaster } from 'core/toaster';

export default function BudgetDetails() {
  const inputAccessoryCreateBtnID = 'inputAccessoryCreateBtnID-book';
  const { mutate: addBookApi, isPending: isCreating } = useCreateBook();
  const { mutate: updateBookApi, isPending: isUpdating } = useUpdateBook();
  const { book, resetBook } = useBook();
  const theme = useSettingStore((state) => state.theme);
  const { currentBook, setCurrentBook } = useBookStore();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: book,
  });

  const handleSubmitData = handleSubmit((data) => {
    if (data.id > 0) {
      updateBookApi(
        { id: data.id, name: data.name, note: data.note },
        {
          onSuccess: (response) => {
            successToaster('Update book successfully');
            log.success('Update book success:', response);
            if (currentBook.id === data.id) {
              setCurrentBook(data);
            }
            resetBook();
            reset();
            router.back();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      addBookApi(data, {
        onSuccess: (response) => {
          successToaster('Add budget successfully');
          log.success('Add budget success:', response);
          resetBook();
          reset();
          router.navigate('/book/management');
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      });
    }
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: theme === 'dark' ? 'black' : 'white',
      }}
      edges={['bottom']}
    >
      <KeyboardAwareScrollView extraScrollHeight={50}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='flex-row items-center justify-between w-full h-12'>
              <Text className='dark:color-white'>Book Name</Text>
              <TextInput
                className='dark:color-white'
                inputAccessoryViewID={inputAccessoryCreateBtnID}
                placeholder='Enter the book name'
                placeholderTextColor='#a1a1aa'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name='name'
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='flex-1 w-full gap-2'>
              <Text className='dark:color-white'>Note</Text>
              <TextInput
                inputAccessoryViewID={inputAccessoryCreateBtnID}
                className='items-start p-2 border-2 border-gray-400 rounded-lg dark:color-white'
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
      </KeyboardAwareScrollView>
      <InputAccessoryView nativeID={inputAccessoryCreateBtnID}>
        <Pressable
          className='items-center w-full p-2 my-2 bg-yellow-300 rounded-lg'
          onPress={handleSubmitData}
        >
          {isCreating || isUpdating ? (
            <ActivityIndicator size='small' />
          ) : (
            <Text className='font-semibold'>
              {book.id > 0 ? 'Update' : 'Create'}
            </Text>
          )}
        </Pressable>
      </InputAccessoryView>
      <Pressable
        className='items-center w-full p-2 bg-yellow-300 rounded-lg'
        onPress={handleSubmitData}
      >
        {isCreating || isUpdating ? (
          <ActivityIndicator size='small' />
        ) : (
          <Text className='font-semibold'>
            {book.id > 0 ? 'Update' : 'Create'}
          </Text>
        )}
      </Pressable>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  InputAccessoryView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { useCreateBook, useUpdateBook } from 'api/book';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useBook } from 'core/stateHooks';
import log from 'core/logger';

export default function AddNewBook() {
  const inputAccessoryCreateBtnID = 'inputAccessoryCreateBtnID-book';
  const { mutate: addBookApi } = useCreateBook();
  const { mutate: updateBookApi } = useUpdateBook();

  const { addBook, updateBook } = useBookStore(
    useShallow((state) => ({
      addBook: state.addBook,
      updateBook: state.updateBook,
    }))
  );
  const { book, resetBook } = useBook();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: book,
  });

  const handleSubmitData = handleSubmit((data) => {
    if (data.id > 0) {
      updateBookApi(
        { id: data.id, name: data.name, note: data.note },
        {
          onSuccess: (response) => {
            log.success('Update book success:', response);
            updateBook(response);
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
          log.success('Add book success:', response);
          addBook(response);
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
      className='bg-white '
      style={{ flex: 1, padding: 8 }}
      edges={['bottom']}
    >
      <KeyboardAwareScrollView extraScrollHeight={50}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='flex-row items-center justify-between w-full h-12'>
              <Text>Book Name</Text>
              <TextInput
                inputAccessoryViewID={inputAccessoryCreateBtnID}
                placeholder='Enter the book name'
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
              <Text>Note</Text>
              <TextInput
                inputAccessoryViewID={inputAccessoryCreateBtnID}
                className='items-start p-2 border-2 border-gray-400 rounded-lg'
                style={{ minHeight: 240 }}
                multiline={true}
                numberOfLines={6}
                placeholder='Enter a note'
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
        <TouchableOpacity
          className='items-center w-full p-2 my-2 bg-yellow-300 rounded-lg'
          onPress={handleSubmitData}
        >
          <Text className='font-semibold'>
            {book.id > 0 ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
      </InputAccessoryView>
      <TouchableOpacity
        className='items-center w-full p-2 bg-yellow-300 rounded-lg'
        onPress={handleSubmitData}
      >
        <Text className='font-semibold'>
          {book.id > 0 ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

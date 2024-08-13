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
import { useBookStore } from 'core/stateHooks';

export default function AddNewBook() {
  const inputAccessoryCreateBtnID = 'inputAccessoryCreateBtnID-book';
  const { mutate: addBookApi } = useCreateBook();
  const { mutate: updateBookApi } = useUpdateBook();

  const { addBook, updateBook, selectedBook } = useBookStore(
    useShallow((state) => ({
      addBook: state.addBook,
      updateBook: state.updateBook,
      selectedBook: state.selectedBook,
    }))
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: selectedBook?.name ?? '',
      note: selectedBook?.note ?? '',
    },
  });

  const handleSubmitData = handleSubmit((data) => {
    if (selectedBook) {
      updateBookApi(
        { id: selectedBook.id, ...data },
        {
          onSuccess: (response) => {
            console.log('submit success:', response);
            updateBook(response);
            reset();
            router.back();
          },
          onError: (error) => {
            console.log('error: ', formatApiError(error));
          },
        }
      );
    } else {
      addBookApi(data, {
        onSuccess: (response) => {
          console.log('submit success:', response);
          addBook(response);
          reset();
          router.navigate('/');
        },
        onError: (error) => {
          console.log('error: ', formatApiError(error));
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
                className='items-start p-2 border-2 border-gray-400 rounded-md'
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
          className='items-center w-full p-2 my-2 bg-yellow-300 rounded-md'
          onPress={handleSubmitData}
        >
          <Text className='font-semibold'>
            {selectedBook ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
      </InputAccessoryView>
      <TouchableOpacity
        className='items-center w-full p-2 bg-yellow-300 rounded-md'
        onPress={handleSubmitData}
      >
        <Text className='font-semibold'>
          {selectedBook ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
import React, { useRef } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Pressable, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useForm, Controller } from 'react-hook-form';

import { useCreateBook, useUpdateBook } from 'api/book';
import { formatApiError } from 'api/errorFormat';
import { useBook, useBookStore, useSettingStore } from 'core/stateHooks';
import log from 'core/logger';
import { successToaster } from 'core/toaster';
import { CreateButton } from 'components';

export default function AddNewBook() {
  const nameRef = useRef<TextInput>(null);
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
          successToaster('Add book successfully');
          log.success('Add book success:', response);
          resetBook();
          reset();
          router.push('/book/management');
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      });
    }
  });
  return (
    <>
      <KeyboardAwareScrollView className='p-2'>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Pressable
              className='flex-row items-center justify-between w-full h-12'
              onPress={() => nameRef.current?.focus()}
            >
              <Text className='dark:color-white'>Book Name</Text>
              <TextInput
                className='dark:color-white'
                ref={nameRef}
                placeholder='Enter the book name'
                placeholderTextColor='#a1a1aa'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Pressable>
          )}
          name='name'
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='flex-1 w-full gap-2'>
              <Text className='dark:color-white'>Note</Text>
              <TextInput
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
      <CreateButton
        targetId={Number(book.id)}
        isPending={isCreating || isUpdating}
        onPress={handleSubmitData}
      />
      <StatusBar style='light' />
    </>
  );
}

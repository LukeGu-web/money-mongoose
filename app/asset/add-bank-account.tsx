import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, router } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, FormProvider } from 'react-hook-form';

import { useAssetStore, useAsset } from 'core/stateHooks';
import {
  AssetAccountBasicForm,
  AssetAccountOtherForm,
  AssetCreditForm,
  Icon,
} from 'components';
import { inputAccessoryCreateBtnID } from 'components/Form/static';

export default function AddBankAccount() {
  const addAccount = useAssetStore((state) => state.addAccount);
  const defaultAccount = useAsset((state) => state.account);
  const [isMore, setIsMore] = useState(false);
  const methods = useForm({
    defaultValues: defaultAccount,
  });
  const { getValues, watch } = methods;
  watch(['isCredit']);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMore(false);
        methods.reset();
      };
    }, [])
  );

  const handleCreate = methods.handleSubmit((data) => {
    console.log(data);
    addAccount(data);
    router.navigate('/asset');
  });

  return (
    <SafeAreaView
      className='bg-white '
      style={{ flex: 1, padding: 8 }}
      edges={['bottom']}
    >
      <KeyboardAwareScrollView extraScrollHeight={50}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormProvider {...methods}>
            <View className='h-32 mb-4 bg-blue-200 rounded-md'></View>
            <View>
              <Text className='text-sm color-gray-400'>Basic information</Text>
              <View className='h-64 mb-4 bg-gray-200 rounded-md'>
                <AssetAccountBasicForm />
              </View>
            </View>
            {getValues('isCredit') && (
              <View>
                <Text className='text-sm color-gray-400'>
                  Credit information
                </Text>
                <View className='h-48 mb-4 bg-gray-200 rounded-md'>
                  <AssetCreditForm />
                </View>
              </View>
            )}
            <View style={{ flex: 1 }}>
              {isMore ? (
                <View style={{ flex: 1, marginBottom: 16 }}>
                  <Text className='text-sm color-gray-400'>Other settings</Text>
                  <View className='flex-1 mb-4 bg-gray-200 rounded-md'>
                    <AssetAccountOtherForm />
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  className='flex-row items-center justify-center w-full p-2'
                  onPress={() => setIsMore(true)}
                >
                  <Text className='color-blue-500'>More settings</Text>
                  <Icon name='arrow-down' size={18} color='#3b82f6 ' />
                </TouchableOpacity>
              )}
            </View>
          </FormProvider>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <InputAccessoryView nativeID={inputAccessoryCreateBtnID}>
        <TouchableOpacity
          className='items-center w-full p-2 my-2 bg-yellow-300 rounded-md'
          onPress={handleCreate}
        >
          <Text className='font-semibold'>Create</Text>
        </TouchableOpacity>
      </InputAccessoryView>
      <TouchableOpacity
        className='items-center w-full p-2 bg-yellow-300 rounded-md'
        onPress={handleCreate}
      >
        <Text className='font-semibold'>Create</Text>
      </TouchableOpacity>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

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
import { useShallow } from 'zustand/react/shallow';

import { useCreateAsset, useUpdateAsset } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useBookStore, useAsset } from 'core/stateHooks';
import log from 'core/logger';
import {
  AssetAccountBasicForm,
  AssetAccountOtherForm,
  AssetCreditForm,
  Icon,
} from 'components';
import { inputAccessoryCreateBtnID } from 'components/Form/static';

export default function AssetDetails() {
  const { mutate: addAssetApi } = useCreateAsset();
  const { mutate: updateAssetApi } = useUpdateAsset();
  const { asset, resetAsset } = useAsset();
  const { addAsset, updateAsset } = useBookStore(
    useShallow((state) => ({
      addAsset: state.addAsset,
      updateAsset: state.updateAsset,
    }))
  );
  const [isMore, setIsMore] = useState(false);
  const methods = useForm({
    defaultValues: asset,
  });
  const { getValues, watch, reset } = methods;
  watch(['is_credit']);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMore(false);
        methods.reset();
      };
    }, [])
  );

  const handleCreate = methods.handleSubmit((data) => {
    if (asset.id === -1) {
      addAssetApi(
        {
          ...data,
          group: Number((data.group as string).split('-')[0]),
        },
        {
          onSuccess: (response) => {
            log.success('Create asset success:', response);
            addAsset(response);
            reset();
            router.back();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      const { id, group, ...rest } = data;
      updateAssetApi(
        {
          ...rest,
          id: id as number,
          group: Number(String(group).split('-')[0]),
        },
        {
          onSuccess: (response) => {
            log.success('update asset success:', response);
            updateAsset(response);
            resetAsset();
            reset();
            router.navigate('/asset/management');
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    }
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
            <View className='h-32 mb-4 bg-blue-200 rounded-lg'></View>
            <View>
              <Text className='text-sm color-gray-400'>Basic information</Text>
              <View className='h-64 mb-4 bg-gray-200 rounded-lg'>
                <AssetAccountBasicForm />
              </View>
            </View>
            {getValues('is_credit') && (
              <View>
                <Text className='text-sm color-gray-400'>
                  Credit information
                </Text>
                <View className='h-48 mb-4 bg-gray-200 rounded-lg'>
                  <AssetCreditForm />
                </View>
              </View>
            )}
            <View style={{ flex: 1 }}>
              {isMore ? (
                <View style={{ flex: 1, marginBottom: 16 }}>
                  <Text className='text-sm color-gray-400'>Other settings</Text>
                  <View className='flex-1 mb-4 bg-gray-200 rounded-lg'>
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
          className='items-center w-full p-2 my-2 bg-yellow-300 rounded-lg'
          onPress={handleCreate}
        >
          <Text className='font-semibold'>
            {Number(asset.id) > 0 ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
      </InputAccessoryView>
      <TouchableOpacity
        className='items-center w-full p-2 bg-yellow-300 rounded-lg'
        onPress={handleCreate}
      >
        <Text className='font-semibold'>
          {Number(asset.id) > 0 ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}
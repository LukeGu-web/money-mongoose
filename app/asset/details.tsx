import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, router } from 'expo-router';
import {
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useForm, FormProvider } from 'react-hook-form';

import { useCreateAsset, useUpdateAsset } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useAsset, useSettingStore } from 'core/stateHooks';
import log from 'core/logger';
import {
  AssetAccountBasicForm,
  AssetAccountOtherForm,
  AssetCreditForm,
  CreateButton,
  Icon,
} from 'components';
import { successToaster } from 'core/toaster';

export default function AssetDetails() {
  const { mutate: addAssetApi, isPending: isCreating } = useCreateAsset();
  const { mutate: updateAssetApi, isPending: isUpdating } = useUpdateAsset();
  const { asset, resetAsset } = useAsset();
  const theme = useSettingStore((state) => state.theme);
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
    const { id, group, balance, credit_limit, ...rest } = data;
    if (asset.id === -1) {
      addAssetApi(
        {
          ...rest,
          balance: Number(balance),
          credit_limit: Number(credit_limit),
          group: Number((group as string).split('-')[0]),
        },
        {
          onSuccess: (response) => {
            successToaster('Create asset successfully');
            log.success('Create asset success:', response);
            resetAsset();
            reset();
            router.back();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    } else {
      updateAssetApi(
        {
          ...rest,
          id: Number(id),
          balance: Number(balance),
          credit_limit: Number(credit_limit),
          group: Number(String(group).split('-')[0]),
        },
        {
          onSuccess: (response) => {
            successToaster('Update asset successfully');
            log.success('Update asset success:', response);
            resetAsset();
            reset();
            // router.push('/asset/management');
            router.back();
          },
          onError: (error) => {
            log.error('Error: ', formatApiError(error));
          },
        }
      );
    }
  });

  return (
    <>
      <KeyboardAwareScrollView className='p-2'>
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
            <View className='flex-1'>
              {isMore ? (
                <View className='flex-1 mb-6'>
                  <Text className='text-sm color-gray-400'>Other settings</Text>
                  <View className='flex-1 mb-4 bg-gray-200 rounded-lg'>
                    <AssetAccountOtherForm />
                  </View>
                </View>
              ) : (
                <Pressable
                  className='flex-row items-center justify-center w-full p-2'
                  onPress={() => setIsMore(true)}
                >
                  <Text className='color-blue-500'>More settings</Text>
                  <Icon name='arrow-down' size={18} color='#3b82f6 ' />
                </Pressable>
              )}
            </View>
          </FormProvider>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <CreateButton
        targetId={Number(asset.id)}
        isPending={isCreating || isUpdating}
        onPress={handleCreate}
      />
      <StatusBar style='light' />
    </>
  );
}

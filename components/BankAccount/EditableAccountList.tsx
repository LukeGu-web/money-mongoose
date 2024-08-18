import { useRef, useCallback } from 'react';
import { Alert, View } from 'react-native';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useUpdateAsset, useDeleteAsset } from 'api/asset';
import { formatApiError } from 'api/errorFormat';
import { useAsset, useBookStore } from 'core/stateHooks';
import ListItem from './ListItem';
import EditableGroupTitle from '../ExpandView/EditableGroupTitle';
import EditAssetGroupBottomSheet from '../BottomSheet/EditAssetGroupBottomSheet';
import SelectGroupBottomSheet from '../BottomSheet/SelectGroupBottomSheet';

export default function EditableAccountList() {
  const { asset, resetAsset } = useAsset();
  const { getCurrentBook, updateAsset, removeAsset } = useBookStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const selectGroupModalRef = useRef<BottomSheetModal>(null);
  const { mutate: updateAssetApi } = useUpdateAsset();
  const { mutate: deleteAssetApi } = useDeleteAsset();

  const methods = useForm({
    defaultValues: {
      group: '',
    },
  });
  const { handleSubmit, control, reset } = methods;

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handlePressItem = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleDeleteAccount = () =>
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete ${asset.name} account?`,
      [
        {
          text: 'Cancel',
          onPress: () => bottomSheetModalRef.current?.dismiss(),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => onDeleteAsset() },
      ]
    );

  const onDeleteAsset = () => {
    deleteAssetApi(
      { id: asset.id as number },
      {
        onSuccess: () => {
          console.log('Delete asset successfully!');
          // remove asset from store
          removeAsset(asset);
          resetAsset();
        },
        onError: (error) => {
          console.log('error: ', formatApiError(error));
        },
      }
    );
    bottomSheetModalRef.current?.dismiss();
  };

  const handleChangeGroup = handleSubmit((data) => {
    console.log('Asset change group data:', data);
    updateAssetApi(
      { id: asset.id as number, group: Number(data.group.split('-')[0]) },
      {
        onSuccess: (response) => {
          console.log('update asset success:', response);
          updateAsset(response);
          resetAsset();
          reset();
        },
        onError: (error) => {
          console.log('error: ', formatApiError(error));
        },
      }
    );
  });

  const functions = {
    'View Details': () => {},
    Edit: () => {
      bottomSheetModalRef.current?.dismiss();
      router.navigate('/asset/details');
    },
    'Move to another group': () => {
      selectGroupModalRef.current?.present();
    },
    Delete: handleDeleteAccount,
  };

  return (
    <View className='flex-1 gap-2'>
      {getCurrentBook()?.groups.map((group) => {
        const assets = group.assets;
        const title = {
          text: group.name,
          number: assets.length,
          amount: assets.reduce((sum, item) => sum + Number(item.balance), 0),
        };
        return (
          <EditableGroupTitle
            key={group.id}
            id={group.id}
            title={title}
            height={40 * assets.length}
          >
            <View className='flex-1 w-full'>
              <FlashList
                data={assets}
                renderItem={({ item }) => (
                  <ListItem
                    item={{ ...item, group: `${group.id}-${group.name}` }}
                    onPress={handlePressItem}
                  />
                )}
                estimatedItemSize={10}
              />
            </View>
          </EditableGroupTitle>
        );
      })}
      <EditAssetGroupBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        funtions={functions}
        title={asset.name}
        onCancel={handleCloseSheet}
      />
      <FormProvider {...methods}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectGroupBottomSheet
              bottomSheetModalRef={selectGroupModalRef}
              value={value}
              onChange={onChange}
              onDismiss={handleChangeGroup}
            />
          )}
          name='group'
        />
      </FormProvider>
    </View>
  );
}

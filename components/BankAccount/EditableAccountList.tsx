import { useRef, useCallback } from 'react';
import { View } from 'react-native';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useUpdateAsset } from 'api/asset';
import { FlashList } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useShallow } from 'zustand/react/shallow';

import { formatApiError } from 'api/errorFormat';
import { useAsset, useBookStore } from 'core/stateHooks';
import ListItem from './ListItem';
import EditableGroupTitle from '../ExpandView/EditableGroupTitle';
import EditAssetGroupBottomSheet from '../BottomSheet/EditAssetGroupBottomSheet';
import SelectGroupBottomSheet from '../BottomSheet/SelectGroupBottomSheet';

export default function EditableAccountList() {
  const asset = useAsset((state) => state.asset);
  const { currentBook, updateAsset } = useBookStore(
    useShallow((state) => ({
      currentBook: state.currentBook,
      updateAsset: state.updateAsset,
    }))
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const selectGroupModalRef = useRef<BottomSheetModal>(null);
  const { mutate: updateAssetApi } = useUpdateAsset();

  const methods = useForm({
    defaultValues: {
      group: '',
    },
  });
  const { handleSubmit, control, reset } = methods;

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const functions = {
    'View Details': () => {},
    'Move to another group': () => {
      selectGroupModalRef.current?.present();
    },
  };
  const handlePressItem = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleChangeGroup = handleSubmit((data) => {
    console.log('Hello, luke', data.group);
    updateAssetApi(
      { id: asset.id as number, group: Number(data.group.split('-')[0]) },
      {
        onSuccess: (response) => {
          console.log('update asset success:', response);
          updateAsset(response);
          reset();
        },
        onError: (error) => {
          console.log('error: ', formatApiError(error));
        },
      }
    );
  });

  return (
    <View className='flex-1 gap-2'>
      {currentBook?.groups.map((group) => {
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
                  <ListItem item={item} onPress={handlePressItem} />
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

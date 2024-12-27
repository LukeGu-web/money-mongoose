import { View, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FormProvider, useFormContext } from 'react-hook-form';
import BottomSheet from './BottomSheet';
import { useSettingStore } from 'core/stateHooks';
import RecordCategory from '../Category/RecordCategroy';

type RecordCategoryBottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export default function RecordCategoryBottomSheet({
  bottomSheetModalRef,
}: RecordCategoryBottomSheetProps) {
  const theme = useSettingStore((state) => state.theme);
  const formContext = useFormContext();
  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={400}>
      <FormProvider {...formContext}>
        <View className='items-center flex-1 w-full gap-2'>
          <Text className='text-xl font-semibold dark:color-white'>
            Select Category
          </Text>
          <RecordCategory />
        </View>
      </FormProvider>
    </BottomSheet>
  );
}

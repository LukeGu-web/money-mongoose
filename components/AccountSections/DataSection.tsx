import { Alert, View, Text, Pressable } from 'react-native';
import * as Updates from 'expo-updates';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useDeleteUser } from 'api/account';
import { useUserStore } from 'core/stateHooks';
import { successToaster } from 'core/toaster';
import { clearAll } from 'core/localStorage/storage';

export default function DataSection() {
  const user = useUserStore((state) => state.user);
  const { mutate: deleteUserApi } = useDeleteUser();
  const handleDeleteData = () =>
    Alert.alert(
      'Delete All Data',
      `Are you sure you want to erase all data? Once deleted, the data cannot be recovered.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            deleteUserApi(
              { id: user.id },
              {
                onSuccess: () => {
                  successToaster('Erase data successfully!');
                  clearAll();
                  Updates.reloadAsync();
                },
              }
            ),
        },
      ]
    );
  return (
    <View className='items-start justify-center flex-1 gap-2 mb-4'>
      <Text className='color-zinc-600 dark:color-zinc-300'>Data</Text>
      <View className='w-full bg-red-500 rounded-lg'>
        <Pressable
          className='flex-row items-center gap-2 px-4 py-2'
          onPress={handleDeleteData}
        >
          <MaterialIcons name='dangerous' size={24} color='white' />
          <Text className='text-lg font-bold color-white'>Erase All Data</Text>
        </Pressable>
      </View>
    </View>
  );
}

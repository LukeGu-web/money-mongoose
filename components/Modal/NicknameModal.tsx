import { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { useUpdateUser } from 'api/account';
import { useUserStore } from 'core/stateHooks';
import { formatApiError } from 'api/errorFormat';
import log from 'core/logger';

type NicknameModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function NicknameModal({
  isVisible,
  onClose,
}: NicknameModalProps) {
  const { mutate: updateUserApi, isPending } = useUpdateUser();
  const { user, setUser } = useUserStore();

  const [nickname, setNickname] = useState<string>(user.nickname);

  const handleConfirm = () => {
    updateUserApi(
      { id: user.id, nickname },
      {
        onSuccess: (response) => {
          log.success('Update nickname success:', response.nickname);
          setUser({
            ...user,
            nickname: response.nickname as string,
          });
          onClose();
        },
        onError: (error) => {
          log.error('Error: ', formatApiError(error));
        },
      }
    );
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        className='items-center justify-center h-full'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg'>
          <Text className='text-3xl'>Change Nickname</Text>
          <TextInput
            className='w-full p-3 border-2 rounded-lg border-zinc-600'
            placeholder='Please enter your nickname'
            autoFocus={true}
            onChangeText={(value) => setNickname(value)}
            value={nickname}
          />
          <View className='flex-row justify-between w-4/5'>
            <Pressable
              onPress={onClose}
              className='items-center justify-center px-6 py-2 bg-gray-400 rounded-lg '
            >
              <Text className='text-xl color-white'>Cancel</Text>
            </Pressable>
            <Pressable
              disabled={isPending}
              onPress={handleConfirm}
              className='items-center justify-center px-6 py-2 rounded-lg bg-amber-400'
            >
              {isPending ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <Text className='text-xl color-white'>Confirm</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
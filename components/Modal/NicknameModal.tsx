import { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useUpdateUser } from 'api/account';
import { useUserStore } from 'core/stateHooks';
import { formatApiError } from 'api/errorFormat';
import log from 'core/logger';
import { successToaster } from 'core/toaster';

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
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -200 : 0;
  const handleConfirm = () => {
    updateUserApi(
      { id: user.id, nickname },
      {
        onSuccess: (response) => {
          successToaster('Update nickname successfully');
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        className='items-center justify-center h-full'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg dark:bg-zinc-600'>
          <Text className='text-3xl dark:color-white'>Change Nickname</Text>
          <TextInput
            className='w-full p-3 border-2 rounded-lg border-zinc-600 dark:color-white dark:border-zinc-200'
            placeholder='Please enter your nickname'
            placeholderTextColor='#a1a1aa'
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
                <ActivityIndicator size='small' color='white' />
              ) : (
                <Text className='text-xl color-white'>Confirm</Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as MailComposer from 'expo-mail-composer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSettingStore } from 'core/stateHooks';
import { successToaster } from 'core/toaster';
import Icon from '../Icon/Icon';

const email = 'getrich.help.service@gmail.com';

export default function Email() {
  const theme = useSettingStore((state) => state.theme);
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(email);
    successToaster('Copied Email.');
  };

  const handleClickEmail = () => {
    if (isAvailable) {
    } else {
      copyToClipboard();
    }
  };

  return (
    <Pressable
      className='flex-row items-center justify-between gap-2 px-4 py-2'
      onPress={handleClickEmail}
    >
      <View className='flex-row items-center justify-center gap-2'>
        <MaterialCommunityIcons
          name='email-outline'
          size={20}
          color={theme === 'dark' ? 'white' : 'black'}
        />
        <Text className='text-lg font-semibold dark:color-white'>Email:</Text>
      </View>
      <View className='flex-row items-center justify-center gap-2'>
        <Text className='text-lg dark:color-white'>{email}</Text>
        <Icon
          name={isAvailable ? 'arrow-right' : 'copy'}
          size={16}
          color={theme === 'dark' ? 'white' : 'black'}
        />
      </View>
    </Pressable>
  );
}

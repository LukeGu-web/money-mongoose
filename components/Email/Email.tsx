import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSettingStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';

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
  return (
    <Pressable
      className='flex-row items-center justify-between gap-2 px-4 py-2'
      disabled={!isAvailable}
    >
      <View className='flex-row items-center justify-center gap-2'>
        <MaterialCommunityIcons
          name='email-outline'
          size={20}
          color={theme === 'dark' ? 'white' : 'black'}
        />
        <Text className='text-lg font-semibold dark:color-white'>Email:</Text>
      </View>
      <View className='flex-row items-center justify-center'>
        <Text className='text-lg dark:color-white'>
          getrich.help.service@gmail.com
        </Text>
        <Icon
          name='arrow-right'
          size={16}
          color={theme === 'dark' ? 'white' : 'black'}
        />
      </View>
    </Pressable>
  );
}

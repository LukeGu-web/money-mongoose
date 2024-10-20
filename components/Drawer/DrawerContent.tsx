import { View, Image, Text } from 'react-native';
import { router } from 'expo-router';
import * as Updates from 'expo-updates';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from '../Icon/Icon';
import { useBookStore, useUserStore, useSettingStore } from 'core/stateHooks';
import { clearAll } from 'core/localStorage/storage';

const avatarImage = require('../../assets/icon.png');

export default function DrawerContent(props: any) {
  const user = useUserStore((state) => state.user);
  const theme = useSettingStore((state) => state.theme);
  const { name } = useBookStore((state) => state.currentBook);
  const iconColor = theme === 'dark' ? '#0891b2' : '#03045E';
  const labelColor = theme === 'dark' ? 'white' : '#000';
  return (
    <DrawerContentScrollView
      {...props}
      key={theme}
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme === 'dark' ? '#164e63' : '#6cd4ff',
      }}
    >
      <View className='items-center gap-4 my-8'>
        <Image
          source={user?.avatar ? { uri: user.avatar } : avatarImage}
          className='w-32 h-32 rounded-lg'
        />
        <Text className='text-lg font-bold color-white'>{user.nickname}</Text>
      </View>
      <View className='flex-1 py-8 bg-white dark:bg-zinc-700'>
        <View className='pl-4 mb-2 border-b-2 border-gray-400'>
          <Text className='p-2 text-lg dark:color-white'>Current book:</Text>
          <DrawerItem
            label={name ?? 'No book'}
            labelStyle={{ color: labelColor }}
            onPress={() => router.navigate('/book/management')}
          />
        </View>
        <DrawerItem
          label='Books'
          labelStyle={{ color: labelColor }}
          icon={() => <Ionicons name='library' size={24} color={iconColor} />}
          onPress={() => router.navigate('/book/management')}
        />
        <DrawerItem
          label='Budget'
          labelStyle={{ color: labelColor }}
          icon={() => (
            <AntDesign name='calculator' size={24} color={iconColor} />
          )}
          onPress={() => router.navigate('budget')}
        />
        <DrawerItem
          label='Category Analysis'
          labelStyle={{ color: labelColor }}
          icon={() => <AntDesign name='piechart' size={24} color={iconColor} />}
          onPress={() => router.navigate('/statistics/category')}
        />
        <DrawerItem
          label='Overview Analysis'
          labelStyle={{ color: labelColor }}
          icon={() => (
            <AntDesign name='areachart' size={24} color={iconColor} />
          )}
          onPress={() => router.navigate('/statistics/trending')}
        />
      </View>
      <View className='pb-8 bg-white border-t-2 border-gray-400 dark:bg-zinc-700'>
        {user.account_status === 'unregistered' ? (
          <View>
            <DrawerItem
              label='Login'
              labelStyle={{ color: labelColor }}
              icon={() => <AntDesign name='login' size={24} color='gray' />}
              onPress={() =>
                router.navigate({
                  pathname: '/user/register',
                  params: { reason: 'login' },
                })
              }
            />
            <DrawerItem
              label='Sign up'
              labelStyle={{ color: labelColor }}
              icon={() => (
                <Ionicons name='person-add-outline' size={24} color='gray' />
              )}
              onPress={() =>
                router.navigate({
                  pathname: '/user/register',
                  params: { reason: 'sign-up' },
                })
              }
            />
          </View>
        ) : (
          <DrawerItem
            label='Logout'
            labelStyle={{ color: labelColor }}
            icon={() => <AntDesign name='logout' size={24} color='gray' />}
            onPress={() => {
              clearAll();
              Updates.reloadAsync();
            }}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
}

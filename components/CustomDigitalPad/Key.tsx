import { Text } from 'react-native';
import { useSettingStore } from 'core/stateHooks';
import Icon from '../Icon/Icon';

type KeyProps = {
  value: string;
  disabled: boolean;
};

export default function Key({ value, disabled }: KeyProps) {
  const theme = useSettingStore((state) => state.theme);
  const color = disabled ? '#94a3b8' : theme === 'dark' ? '#f4f4f5' : '#312e81';
  switch (value) {
    case 'delete':
      return (
        <Icon
          name='delete-left'
          size={36}
          color={theme === 'dark' ? '#f4f4f5' : '#312e81'}
        />
      );
    case 'camera':
      return <Icon name='camera' size={44} color={color} />;
    case 'tax':
      return <Icon name='tax' size={32} color={color} />;
    case 'clear':
    case 'save':
      return (
        <Text className='text-3xl font-semibold color-indigo-900 dark:color-zinc-100'>
          {value}
        </Text>
      );
    default:
      return (
        <Text className='text-4xl font-semibold color-indigo-900 dark:color-zinc-100'>
          {value}
        </Text>
      );
  }
}

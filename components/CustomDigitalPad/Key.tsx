import { Text } from 'react-native';
import Icon from '../Icon/Icon';

export default function Key({ value }: { value: string }) {
  switch (value) {
    case 'delete':
      return <Icon name='delete-left' size={36} color='#312e81' />;
    case 'camera':
      return <Icon name='camera' size={44} color='#312e81' />;
    case 'tax':
      return <Icon name='tax' size={32} color='#312e81' />;
    case 'clear':
    case 'save':
      return (
        <Text className='text-3xl font-semibold color-indigo-900'>{value}</Text>
      );
    default:
      return (
        <Text className='text-4xl font-semibold color-indigo-900'>{value}</Text>
      );
  }
}

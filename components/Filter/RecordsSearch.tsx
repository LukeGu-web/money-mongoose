import { View, TextInput } from 'react-native';

type RecordsSearchProps = {
  onSearch: (text: string) => void;
};

export default function RecordsSearch({ onSearch }: RecordsSearchProps) {
  return (
    <View className='flex-row items-center justify-between flex-1 gap-4'>
      <TextInput
        className='flex-1 p-2 bg-white rounded-lg'
        placeholder='search'
        placeholderTextColor='#a1a1aa'
        returnKeyType='search'
        autoFocus={true}
        clearButtonMode='while-editing'
        onSubmitEditing={({ nativeEvent: { text } }) => onSearch(text)}
      />
    </View>
  );
}

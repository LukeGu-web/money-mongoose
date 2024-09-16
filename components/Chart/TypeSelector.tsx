import { View, Text, Pressable } from 'react-native';

type Types = { [key: string]: string };

type TypeSelectorProps = {
  Types: Types;
  type: string;
  onChangeType: (type: string) => void;
};

export default function TypeSelector({
  Types,
  type,
  onChangeType,
}: TypeSelectorProps) {
  return (
    <View className='flex-row items-center border-2 rounded-lg border-slate-800'>
      {Object.values(Types).map((item, index) => (
        <Pressable
          key={item}
          className={`items-center justify-center py-1 px-2 border-slate-800 ${
            index === 0 && 'border-r-2'
          } ${type === item && 'bg-slate-800'}`}
          onPress={() => onChangeType(item)}
        >
          <Text
            className={`text-center font-medium ${
              type === item ? 'color-white' : 'color-slate-800'
            }`}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

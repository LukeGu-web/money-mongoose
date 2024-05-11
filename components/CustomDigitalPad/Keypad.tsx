import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Key from './Key';

const { width } = Dimensions.get('window');
const dialPadSize = width * 0.225;

export default function Keypad({ onKeyInput }: KeypadProps) {
  return (
    <FlatList
      data={dialPadContent}
      numColumns={4} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => onKeyInput(item)}>
            <View
              style={[
                styles.key,
                {
                  backgroundColor: item === '' ? 'transparent' : '#fff',
                },
              ]}
            >
              <Key value={item} />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

type KeypadProps = {
  onKeyInput: (item: string) => void;
};

const styles = StyleSheet.create({
  key: {
    width: dialPadSize,
    height: dialPadSize * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 8,
    borderColor: 'transparent',
  },
});

const dialPadContent = [
  '1',
  '2',
  '3',
  'delete',
  '4',
  '5',
  '6',
  'clear',
  '7',
  '8',
  '9',
  'calculator',
  'new',
  '0',
  '.',
  'save',
];

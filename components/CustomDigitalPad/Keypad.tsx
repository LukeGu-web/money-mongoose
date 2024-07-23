import {
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Key from './Key';
import { useStyles, TColors } from 'core/theme';

const { width } = Dimensions.get('window');
const dialPadSize = width * 0.225;

export default function Keypad({ onKeyInput }: KeypadProps) {
  const { theme, styles } = useStyles(createStyles);
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
                  backgroundColor:
                    item === '' ? 'transparent' : theme.bgPrimary,
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

const createStyles = (theme: TColors) =>
  StyleSheet.create({
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
  'camera',
  '4',
  '5',
  '6',
  'delete',
  '7',
  '8',
  '9',
  'clear',
  'tax',
  '0',
  '.',
  'save',
];

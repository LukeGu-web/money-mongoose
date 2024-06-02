import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Keypad from './Keypad';

export default function DigitalPad() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -150 : 0;

  const [integer, setInteger] = useState('0');
  const [decimal, setDecimal] = useState('00');
  const [decimalLength, setDecimalLength] = useState(0);
  const [isDecimal, setIsDecimal] = useState(false);

  const handlePriceInput = (item: string) => {
    switch (item) {
      case 'delete':
        if (integer === '0' && decimal === '00') {
          setIsDecimal(false);
          setDecimalLength(0);
        }
        if (decimal[1] !== '0') {
          setDecimal(decimal[0] + '0');
          setDecimalLength(1);
        } else if (decimal[0] !== '0') {
          setDecimal('00');
          setDecimalLength(0);
        } else if (integer.length === 1 && integer !== '0') {
          setInteger('0');
        } else if (integer.length > 1) {
          setInteger(integer.slice(0, -1));
        }
        break;
      case 'clear':
        setInteger('0');
        setDecimal('00');
        setIsDecimal(false);
        setDecimalLength(0);
        break;
      case '.':
        setIsDecimal(true);
        break;
      case 'calculator':
        break;
      case 'new':
        break;
      case 'save':
        break;
      default:
        if (isDecimal) {
          if (decimalLength === 0) {
            setDecimal(String(item) + '0');
            setDecimalLength(1);
          } else if (decimalLength === 1) {
            setDecimal(decimal[0] + String(item));
            setDecimalLength(2);
          }
        } else {
          if (integer === '0') {
            setInteger(String(item));
          } else {
            setInteger(integer + String(item));
          }
        }
        break;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.container}
    >
      <View style={styles.noteContainer}>
        <TextInput placeholder='note' style={styles.noteInput} />
        <TouchableOpacity style={styles.amount}>
          <Text style={styles.amountText}>{`A$ ${integer}.${decimal}`}</Text>
        </TouchableOpacity>
      </View>
      {/* <View>function tags</View> */}
      <Keypad onKeyInput={handlePriceInput} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  noteContainer: {
    height: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    borderBottomWidth: 1,
    marginBottom: 6,
    paddingBottom: 6,
  },
  noteInput: {
    flex: 1,
    height: '100%',
    fontSize: 24,
    padding: 4,
    marginRight: 10,
  },
  amount: {
    borderRadius: 8,
    height: '100%',
    padding: 6,
    backgroundColor: '#48CAE4',
    justifyContent: 'center',
  },
  amountText: {
    color: '#fff',
    fontSize: 24,
  },
});

import { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import Keypad from './Keypad';

export default function DigitalPad() {
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
    <View style={styles.container}>
      <View style={styles.noteContainer}>
        <TextInput
          placeholder='note'
          //   containerStyle={{
          //     flex: 1,
          //     margin: 6,
          //   }}
          //   inputStyle={{
          //     fontSize: 25,
          //   }}
          //   onChangeText={value => this.setState({ comment: value })}
        />
        <Button
          //   buttonStyle={{ borderRadius: 8 }}
          //   titleStyle={{
          //     fontSize: 24,
          //   }}
          title={`A$ ${integer}.${decimal}`}
        />
      </View>
      {/* <View>function tags</View> */}
      <Keypad onKeyInput={handlePriceInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  noteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: 14,
    marginBottom: -16,
  },
});

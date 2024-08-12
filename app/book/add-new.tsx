import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddNewBook() {
  const inputAccessoryCreateBtnID = 'inputAccessoryCreateBtnID-book';
  //   const handleCreate = methods.handleSubmit((data) => {
  //     console.log(data);
  //     // addAccount(data);
  //     router.navigate('/asset');
  //   });
  return (
    <SafeAreaView
      className='bg-white '
      style={{ flex: 1, padding: 8 }}
      edges={['bottom']}
    >
      <KeyboardAwareScrollView extraScrollHeight={50}></KeyboardAwareScrollView>
      <InputAccessoryView nativeID={inputAccessoryCreateBtnID}>
        <TouchableOpacity
          className='items-center w-full p-2 bg-yellow-300 rounded-md'
          //   onPress={handleCreate}
        >
          <Text className='font-semibold'>Create</Text>
        </TouchableOpacity>
      </InputAccessoryView>
      <TouchableOpacity
        className='items-center w-full p-2 bg-yellow-300 rounded-md'
        // onPress={handleCreate}
      >
        <Text className='font-semibold'>Create</Text>
      </TouchableOpacity>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

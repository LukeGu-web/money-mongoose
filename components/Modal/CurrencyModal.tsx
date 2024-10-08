import { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { CountryType } from '../Dropdown/types';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import { useCurrencyStore } from 'core/stateHooks';

type CurrencyModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelectCountry: (country: CountryType) => void;
};

export default function CurrencyModal({
  isVisible,
  onClose,
  onSelectCountry,
}: CurrencyModalProps) {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -100 : 0;
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const [country, setCountry] = useState<CountryType | null>(null);
  const handleChange = (country: CountryType, amount: number) => {
    setCountry(country);
  };
  const handleConfirm = () => {
    if (country) {
      onSelectCountry(country);
      onClose();
    }
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        className='items-center justify-center h-full'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <View className='items-center w-11/12 gap-6 p-6 bg-white rounded-lg dark:bg-zinc-600'>
          <Text className='text-3xl dark:color-white'>Select Currency</Text>
          <CurrencyDropdown
            base={baseCurrency}
            countryOnly
            onChange={handleChange}
          />
          <View className='flex-row justify-between w-4/5'>
            <Pressable
              onPress={onClose}
              className='items-center justify-center px-6 py-2 bg-gray-400 rounded-lg '
            >
              <Text className='text-xl color-white'>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              className='items-center justify-center px-6 py-2 rounded-lg bg-amber-400'
            >
              <Text className='text-xl color-white'>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

import { router, Link } from 'expo-router';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalStore } from 'core/stateHooks';
const avatarImage = require('../assets/icon.png');

export default function Onboarding() {
  const setIsAcceptedAgreement = useLocalStore(
    (state) => state.setIsAcceptedAgreement
  );
  const handleAgree = () => {
    setIsAcceptedAgreement(true);
    router.navigate('/onboarding');
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['right', 'bottom', 'left']}
    >
      <View className='flex-1'>
        <View className='items-center justify-center flex-1 gap-4'>
          <Image className='w-32 h-32' source={avatarImage} />
          <Text className='text-2xl font-permanentMarker'>Get Rich</Text>
        </View>
        <View className='self-center w-11/12 gap-2 p-4 bg-blue-400 rounded-xl'>
          <Text className='text-xl font-semibold text-center text-white'>
            User Agreement and Privacy Policy
          </Text>
          <Text className='text-justify'>
            Dear user, according to the latest laws, regulations, and regulatory
            policies, GET RICH is required to send you this notice. In order to
            better provide you with accounting and account management services,
            we need you to authorize this app to access local storage and device
            permissions, as well as specific device information collection
            permissions that require your consent for certain services.
          </Text>
          <View className='flex-row flex-wrap'>
            <Text>Please read carefully </Text>
            <Link className='text-yellow-400 underline' href='/user-agreement'>
              User Agreement
            </Link>
            <Text> and </Text>
            <Link className='text-yellow-400 underline' href='/privacy-policy'>
              Privacy Policy
            </Link>
          </View>
          <View className='flex-row justify-between gap-6 mt-4'>
            <TouchableOpacity
              className='items-center justify-center flex-1 p-2 border-2 border-black rounded-3xl'
              onPress={() => {}}
            >
              <Text>Disagree</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='items-center justify-center flex-1 p-2 bg-yellow-500 rounded-3xl'
              onPress={handleAgree}
            >
              <Text className='text-white'>Agree</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

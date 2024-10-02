import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { useSettingStore } from 'core/stateHooks';
import {
  AvatarSection,
  AccountPad,
  DetailsSection,
  SecuritySection,
  SettingsSection,
  InformationSection,
} from 'components/AccountSections';

export default function Account() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: theme === 'dark' ? 'black' : 'white',
      }}
    >
      <AvatarSection />
      <AccountPad />
      <DetailsSection />
      <SettingsSection />
      <SecuritySection />
      <InformationSection />
      <StatusBar style='light' />
    </ScrollView>
  );
}

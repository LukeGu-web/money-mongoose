import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { useSettingStore, useUserStore } from 'core/stateHooks';
import {
  AvatarSection,
  AccountPad,
  DataSection,
  DetailsSection,
  SecuritySection,
  SettingsSection,
  InformationSection,
} from 'components/AccountSections';

export default function Account() {
  const user = useUserStore((state) => state.user);
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
      {user.account_status === 'unregistered' && <DataSection />}
      <StatusBar style='light' />
    </ScrollView>
  );
}

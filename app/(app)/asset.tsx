import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import NetAssetCard from 'components/Card/NetAssetCard';
import { useStyles, TColors } from 'core/theme';
import InfoCard from 'components/Card/InfoCard';
import AccountList from 'components/BankAccount/AccountList';

export default function Asset() {
  const { styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <View style={styles.netContainer}>
        <NetAssetCard />
      </View>
      <View style={styles.infoContainer}>
        <InfoCard />
      </View>
      <View style={styles.accountContainer}>
        <AccountList />
      </View>
      <StatusBar style='light' />
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      gap: 6,
      padding: 5,
    },
    netContainer: {
      height: 160,
      borderRadius: 10,
      backgroundColor: 'skyblue',
    },
    infoContainer: {
      height: 60,
    },
    accountContainer: {
      flex: 1,
    },
  });

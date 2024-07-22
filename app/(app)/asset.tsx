import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';

import NetAssetCard from 'components/Card/NetAssetCard';
import { useStyles, TColors } from 'core/theme';
import InfoCard from 'components/Card/InfoCard';
import AccountList from 'components/BankAccount/AccountList';

export default function Asset() {
  const { styles } = useStyles(createStyles);
  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      padding: 5,
    },
    netContainer: {
      height: 160,
      borderRadius: 10,
      backgroundColor: 'skyblue',
      marginBottom: 6,
    },
    infoContainer: {
      height: 60,
      marginBottom: 6,
    },
    accountContainer: {
      flex: 1,
      marginBottom: 12,
    },
  });

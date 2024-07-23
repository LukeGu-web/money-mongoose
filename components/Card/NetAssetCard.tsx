import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useStyles, TColors } from 'core/theme';
import { useAssetStore, useAsset } from 'core/stateHooks';
import { formatter } from 'core/utils';

export default function NetAssetCard() {
  const { styles } = useStyles(createStyles);
  const accounts = useAssetStore((state) => state.accounts);
  const netAsset = Object.keys(accounts)
    .map((group) =>
      accounts[group].reduce((sum, item) => sum + Number(item.balance), 0)
    )
    .reduce((sum, item) => sum + item, 0);
  console.log('netAsset: ', netAsset);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Net Asset</Text>
      <Text style={{ fontSize: 32 }}>{formatter(netAsset)}</Text>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: '800' }}>Assets</Text>
        <Text>{formatter(netAsset)}</Text>
        <Text style={{ fontWeight: '800' }}>Liabilities</Text>
        <Text>0.00</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 8,
    },
    textContainer: {
      gap: 6,
      flexDirection: 'row',
    },
  });

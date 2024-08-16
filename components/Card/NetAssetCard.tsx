import { StyleSheet, Text, View } from 'react-native';
import { useStyles, TColors } from 'core/theme';
import { useBookStore } from 'core/stateHooks';
import { formatter } from 'core/utils';
import { BookType } from 'api/types';

export default function NetAssetCard() {
  const { styles } = useStyles(createStyles);
  const getCurrentBook = useBookStore((state) => state.getCurrentBook);
  const netAsset = (getCurrentBook() as BookType).groups
    .map((group) =>
      group.assets.reduce((sum, item) => sum + Number(item.balance), 0)
    )
    .reduce((sum, item) => sum + item, 0);

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

import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import ListItem from './ListItem';

import { useStyles, TColors } from 'core/theme';
import { useAccounts } from 'core/stateHooks';
import ExpandView from 'components/ExpandView/ExpandView';

export default function AccountList() {
  const { styles } = useStyles(createStyles);
  const accounts = useAccounts((state) => state.accounts);
  const handlePressItem = () => {};
  return (
    <View style={styles.container}>
      {accounts.length > 0 ? (
        <ExpandView title='Saving' height={40 * accounts.length}>
          <View style={styles.listContainer}>
            <FlashList
              data={accounts}
              renderItem={({ item }) => (
                <ListItem item={item} onPress={handlePressItem} />
              )}
              estimatedItemSize={10}
            />
          </View>
        </ExpandView>
      ) : (
        <Text>No account yet</Text>
      )}
      <Button
        title='Add account'
        color='white'
        onPress={() => router.navigate('/add-bank-account')}
      />
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
      width: '100%',
      height: 100,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });
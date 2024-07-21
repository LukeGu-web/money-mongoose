import { View, Text, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import ListItem from './ListItem';

import { useStyles, TColors } from 'core/theme';
import { useAccounts } from 'core/stateHooks';
import ExpandView from 'components/ExpandView/ExpandView';

export default function AccountList() {
  const { styles } = useStyles(createStyles);
  const { accounts, numOfGroups } = useAccounts(
    useShallow((state) => ({
      accounts: state.accounts,
      numOfGroups: state.numOfGroups,
    }))
  );
  const handlePressItem = () => {};
  return (
    <View style={styles.container}>
      {Object.keys(accounts).map((group) => {
        if (accounts[group].length > 0) {
          const title = {
            text: group,
            number: accounts[group].length,
            amount: accounts[group].reduce(
              (sum, item) => sum + Number(item.balance),
              0
            ),
          };
          return (
            <ExpandView
              key={group}
              title={title}
              height={40 * accounts[group].length}
            >
              <View style={styles.listContainer}>
                <FlashList
                  data={accounts[group]}
                  renderItem={({ item }) => (
                    <ListItem item={item} onPress={handlePressItem} />
                  )}
                  estimatedItemSize={10}
                />
              </View>
            </ExpandView>
          );
        }
      })}
      {numOfGroups === 0 && (
        <View style={styles.noItemContainer}>
          <Text>No account yet</Text>
        </View>
      )}
      <Button
        title='Add account'
        onPress={() => router.navigate('/add-bank-account')}
      />
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 5,
    },
    listContainer: {
      flex: 1,
      width: '100%',
      height: 100,
    },
    noItemContainer: {
      alignItems: 'center',
      backgroundColor: theme.bgPrimary,
      paddingVertical: 16,
      borderRadius: 8,
    },
  });

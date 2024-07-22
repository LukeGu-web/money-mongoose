import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useShallow } from 'zustand/react/shallow';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

import { useStyles, TColors } from 'core/theme';
import { useAssetStore } from 'core/stateHooks';
import ExpandGroupTitle from '../ExpandView/ExpandGroupTitle';

export default function AccountList() {
  const { styles, theme } = useStyles(createStyles);
  const { accounts, numOfGroups } = useAssetStore(
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
            <ExpandGroupTitle
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
            </ExpandGroupTitle>
          );
        }
      })}
      {numOfGroups === 0 && (
        <View style={styles.noItemContainer}>
          <Text>No account yet</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.navigate('/asset/add-bank-account')}
      >
        <Text style={{ color: theme.secondary }}>Add account</Text>
        <MaterialCommunityIcons
          name='credit-card-plus-outline'
          size={20}
          color={theme.secondary}
        />
      </TouchableOpacity>
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
    },
    noItemContainer: {
      alignItems: 'center',
      backgroundColor: theme.bgPrimary,
      paddingVertical: 16,
      borderRadius: 8,
    },
    addBtn: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      padding: 8,
      borderRadius: 8,
    },
  });

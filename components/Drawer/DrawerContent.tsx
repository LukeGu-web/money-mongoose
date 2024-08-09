import { StyleSheet, View, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useShallow } from 'zustand/react/shallow';
import { useBookStore } from 'core/stateHooks';

const avatarImage = require('../../assets/icon.png');

export default function DrawerContent(props: any) {
  const { books, currentBook } = useBookStore(
    useShallow((state) => ({
      books: state.books,
      currentBook: state.currentBook,
    }))
  );

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.detailContainer}>
        <Image source={avatarImage} style={styles.image} />
        <Text style={styles.name}>Luke</Text>
      </View>
      <View style={styles.navContainer}>
        {books.map((book) => (
          <DrawerItem key={book.name} label={book.name} onPress={() => {}} />
        ))}
        {/* <DrawerItemList {...props} /> */}
        {/* <DrawerItem label='Logout' onPress={() => {}} /> */}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6cd4ff',
  },
  detailContainer: {
    marginVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 500,
  },
  navContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
});

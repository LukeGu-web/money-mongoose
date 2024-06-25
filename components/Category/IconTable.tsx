import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Icon from '../Icon/Icon';

export default function IconTable({
  data,
  selectedCategory,
  selectedSubcategory,
  onSelectIcon,
}: IconTableProps) {
  const { width } = Dimensions.get('window');
  const iconSize = width * 0.15;
  const isArray = Array.isArray(data);
  const numColumns = isArray ? 4 : 5;
  return (
    <FlatList
      data={isArray ? data : Object.keys(data)}
      scrollEnabled={false}
      numColumns={numColumns} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      style={{ flexGrow: 0 }}
      renderItem={({ item }) => {
        const hasSubcategory = !isArray && data[item].length > 0;
        return (
          <TouchableOpacity onPress={() => onSelectIcon(item, hasSubcategory)}>
            <View
              style={[
                {
                  backgroundColor:
                    item === selectedCategory ? '#fcefb4' : 'transparent',
                  width: iconSize,
                  height: iconSize,
                },
                styles.container,
              ]}
            >
              <Icon name={item} color='#3F1D38' size={30} />
            </View>
            {hasSubcategory && (
              <View style={[styles.container, styles.subcategory]}>
                <Entypo name='dots-three-vertical' size={10} color='black' />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 10 }}>{item}</Text>
              <Text style={{ fontSize: 8, opacity: 0.9 }}>
                {item === selectedCategory ? selectedSubcategory : ''}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

type IconTableProps = {
  data:
    | string[]
    | {
        [key: string]: string[];
      };
  selectedCategory: string;
  selectedSubcategory?: string;
  onSelectIcon: (item: string, hasSubcategory: boolean) => void;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
    borderColor: 'transparent',
  },
  subcategory: {
    position: 'absolute',
    backgroundColor: '#e9ecef',
    width: 16,
    height: 16,
    bottom: 16,
    right: 0,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -4,
  },
});

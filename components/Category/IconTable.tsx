import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Icon from './Icon';
import { iconMap } from './iconMap';

export default function IconTable({
  data,
  selectedCategory,
  selectedSubcategory,
  onSelectIcon,
}: IconTableProps) {
  const { width } = Dimensions.get('window');
  const iconSize = width * 0.15;
  return (
    <FlatList
      data={Object.keys(data)}
      scrollEnabled={false}
      numColumns={5} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        const hasSubcategory = data[item].length > 0;
        return (
          <TouchableOpacity onPress={() => onSelectIcon(item, hasSubcategory)}>
            <View
              style={[
                {
                  backgroundColor:
                    item === selectedCategory ? '#fff' : 'transparent',
                  width: iconSize,
                  height: iconSize,
                },
                styles.container,
              ]}
            >
              <Icon
                name={iconMap[item as keyof typeof iconMap].type}
                iconType={iconMap[item as keyof typeof iconMap].iconType}
                color='#3F1D38'
                size={30}
              />
            </View>
            {hasSubcategory && (
              <View style={[styles.container, styles.subcategory]}>
                <Entypo name='dots-three-vertical' size={10} color='black' />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 10 }}>{item}</Text>
              {item === selectedCategory && selectedSubcategory && (
                <Text style={{ fontSize: 8, opacity: 0.9 }}>
                  {selectedSubcategory}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

type IconTableProps = {
  data: {
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
    backgroundColor: '#fff',
    width: 16,
    height: 16,
    bottom: 6,
    right: 0,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -4,
  },
});

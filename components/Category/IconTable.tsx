import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';

import Icon from '../Icon/Icon';
import { useStyles, TColors } from 'core/theme';

const { width } = Dimensions.get('window');
const iconSize = width * 0.15;

export default function IconTable({
  data,
  name,
  onSelectSubcategory,
}: IconTableProps) {
  const { theme, styles } = useStyles(createStyles);
  const { control, getValues, setValue } = useFormContext();
  const isArray = Array.isArray(data);
  const numColumns = isArray ? 4 : 5;

  const handleSelect = (item: string, hasSubcategory: boolean) => {
    setValue(name, item, { shouldValidate: true });
    if (name === 'category' && hasSubcategory) {
      onSelectSubcategory(true, item);
    }
    if (name === 'subcategory') {
      onSelectSubcategory(false, item);
    }
  };
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
          <Controller
            control={control}
            render={() => (
              <TouchableOpacity
                onPress={() => handleSelect(item, hasSubcategory)}
              >
                <View
                  style={[
                    {
                      backgroundColor:
                        item === getValues('category')
                          ? theme.iconBgColor
                          : 'transparent',
                      width: iconSize,
                      height: iconSize,
                    },
                    styles.container,
                  ]}
                >
                  <Icon name={item} color={theme.iconColor} size={30} />
                </View>
                {hasSubcategory && (
                  <View style={[styles.container, styles.subcategory]}>
                    <Icon
                      name='dots-three-vertical'
                      size={10}
                      color={theme.textPrimary}
                    />
                  </View>
                )}
                <View style={styles.textContainer}>
                  <Text style={{ fontSize: 10 }}>{item}</Text>
                  <Text style={{ fontSize: 8, opacity: 0.9 }}>
                    {item === getValues('category')
                      ? getValues('subcategory')
                      : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            name={name}
          />
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
  name: string;
  onSelectSubcategory: (visible: boolean, item: string) => void;
};

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 50,
      borderColor: 'transparent',
    },
    subcategory: {
      position: 'absolute',
      backgroundColor: theme.bgPrimary,
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

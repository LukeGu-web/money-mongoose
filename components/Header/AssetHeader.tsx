import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';
import Icon from '../Icon/Icon';

export default function AssetHeader() {
  const { theme, styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate('/')}>
        <AntDesign name='linechart' size={24} color={theme.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Asset</Text>
      <TouchableOpacity
        onPress={() => router.navigate('/asset/asset-management')}
      >
        <MaterialCommunityIcons
          name='credit-card-multiple-outline'
          size={24}
          color={theme.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textSecondary,
    },
  });
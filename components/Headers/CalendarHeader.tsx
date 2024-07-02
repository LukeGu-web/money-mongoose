import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useCalendar } from 'core/stateHooks';
import { useStyles, TColors } from 'core/theme';

export default function CalendarHeader() {
  const { theme, styles } = useStyles(createStyles);

  const setVisiableMonth = useCalendar((state) => state.setVisiableMonth);

  const handleBackToday = () => {
    console.log('Back Today');
    setVisiableMonth(dayjs().format('YYYY-MM-DD'));
  };
  return (
    <View style={styles.container}>
      <View style={{ width: 26 }}></View>
      <View>
        <Text style={styles.headerText}>Calendar</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleBackToday}>
          <MaterialIcons
            name='center-focus-strong'
            size={24}
            color={theme.textSecondary}
          />
        </TouchableOpacity>
      </View>
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
    selectedButtonText: {
      color: theme.textPrimary,
    },
  });

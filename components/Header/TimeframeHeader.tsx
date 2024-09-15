import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Icon from '../Icon/Icon';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
type TimeRangeType = 'year' | 'month' | 'week';
type TimeframeHeaderProps = {
  onChangeTimeframe: (tf: string) => void;
};
const timeRanges = ['all', 'year', 'month', 'week'];

export default function TimeframeHeader({
  onChangeTimeframe,
}: TimeframeHeaderProps) {
  const today = dayjs();
  const [timeRange, setTimeRange] = useState<TimeRangeType | 'all'>('all');
  const [displayDate, setDisplyDate] = useState('All Records');
  const [currentDate, setCurrentDate] = useState(today);

  const changeDisplayDate = (date: Dayjs, tf: TimeRangeType | 'all') => {
    switch (tf) {
      case 'year':
        const year = date.format('YYYY');
        setDisplyDate(year);
        onChangeTimeframe(year);
        break;
      case 'month':
        setDisplyDate(date.format('MMM YYYY'));
        onChangeTimeframe(date.format('YYYY-MM'));
        break;
      case 'week':
        const mondayDate = date.subtract(1, 'day').weekday(1);
        const monday = mondayDate.format('DD MMM');
        const sunday = date.subtract(1, 'day').weekday(7).format('DD MMM');
        setDisplyDate(`${monday} ~ ${sunday}`);
        onChangeTimeframe(`${date.format('YYYY')}@${mondayDate.week()}`);
        break;
      default:
        setDisplyDate('All Records');
    }
  };
  const handleChangeTimeRange = (item: TimeRangeType | 'all') => {
    changeDisplayDate(today, item);
    setCurrentDate(today);
    setTimeRange(item);
  };
  const handleIncrease = () => {
    const changedDate = currentDate.add(1, timeRange as TimeRangeType);
    changeDisplayDate(changedDate, timeRange);
    setCurrentDate(changedDate);
  };
  const handleDecrease = () => {
    const changedDate = currentDate.subtract(1, timeRange as TimeRangeType);
    changeDisplayDate(changedDate, timeRange);
    setCurrentDate(changedDate);
  };
  return (
    <View className='-mt-1'>
      <View className='flex-row items-center justify-between h-12 px-4 pb-1 bg-primary'>
        <Pressable className='py-2 pr-2' onPress={() => router.back()}>
          <Icon name='left' size={24} color='#fff' />
        </Pressable>
        <View className='flex-row items-center border-2 border-white rounded-lg'>
          {Object.values(timeRanges).map((item, index) => (
            <Pressable
              key={item}
              className={`items-center justify-center py-1 w-16 border-white ${
                index < 3 && 'border-r-2'
              } ${timeRange === item && 'bg-white'}`}
              onPress={() =>
                handleChangeTimeRange(item as TimeRangeType | 'all')
              }
            >
              <Text
                className={`text-center font-medium ${
                  timeRange === item ? 'color-primary' : 'color-white'
                }`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Link href='/chart/line/' className='pl-3'>
          <Icon name='chart-line' size={24} color='#fff' />
        </Link>
      </View>
      <View className='items-center justify-center h-12'>
        {timeRange === 'all' ? (
          <Text>{displayDate}</Text>
        ) : (
          <View className='flex-row items-center justify-center gap-4'>
            <Pressable onPress={handleDecrease}>
              <FontAwesome5 name='chevron-circle-left' size={16} color='gray' />
            </Pressable>
            <Text>{displayDate}</Text>
            <Pressable onPress={handleIncrease}>
              <FontAwesome5
                name='chevron-circle-right'
                size={16}
                color='gray'
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

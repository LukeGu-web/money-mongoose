import { create } from 'zustand';
import dayjs from 'dayjs';

type CalendarState = {
  visiableMonth: string;
  setVisiableMonth: (date: string) => void;
};

const useCalendar = create<CalendarState>((set) => ({
  visiableMonth: dayjs().format('YYYY-MM-DD'),
  setVisiableMonth: (date) => {
    set(() => ({ visiableMonth: date }));
  },
}));

export default useCalendar;

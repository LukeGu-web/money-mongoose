import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MonthlyAnalysisState = {
  goal: number | null;
  setGoal: (goal: number) => void;
};

const useMonthlyAnalysis = create<MonthlyAnalysisState>()(
  persist(
    devtools((set) => ({
      goal: null,
      setGoal: (goal) => {
        set(() => ({ goal }));
      },
    })),
    {
      name: 'goal-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage), // Add this here!
    }
  )
);

export default useMonthlyAnalysis;

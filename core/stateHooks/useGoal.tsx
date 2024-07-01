import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GoalState = {
  goal: number | null;
  setGoal: (goal: number) => void;
};

const useGoal = create<GoalState>()(
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

export default useGoal;

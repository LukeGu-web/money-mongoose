import { getItem, setItem } from './storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const isFirstTime = getItem(IS_FIRST_TIME);
  const setIsFirstTime = (value: boolean) => setItem(IS_FIRST_TIME, value);
  if (isFirstTime === undefined) {
    return [true, setIsFirstTime] as const;
  }
  return [isFirstTime, setIsFirstTime] as const;
};

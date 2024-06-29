import { getItem, setItem, removeItem } from './storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const getFistTimeFlag = () => getItem<boolean>(IS_FIRST_TIME);
export const setFistTimeFlag = () => setItem(IS_FIRST_TIME, 'false');
export const removeFistTimeFlag = () => removeItem(IS_FIRST_TIME);
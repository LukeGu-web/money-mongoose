import { getItem, removeItem, setItem } from './storage';

const TOKEN = 'token';

export const getToken = () => getItem<string>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: string) => setItem<string>(TOKEN, value);

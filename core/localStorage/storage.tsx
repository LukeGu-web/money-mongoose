import AsyncStorage from '@react-native-async-storage/async-storage';
import log from 'core/logger';

export async function getItem<T>(key: string): Promise<T | undefined> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value ? JSON.parse(value) || null : null;
    }
  } catch (e) {
    log.error(e);
  }
}

export async function setItem<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    log.error(e);
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    log.error(e);
  }
}

export const getAllKeys = async () => {
  let keys: any = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  log.info(keys);
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  log.info('Done.');
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem<T>(key: string): Promise<T | undefined> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value ? JSON.parse(value) || null : null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function setItem<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
}

export const getAllKeys = async () => {
  let keys: any = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  console.log(keys);
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataToAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('AsyncStorage store error', e);
  }
};

export const getDataFromAsyncStorage = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('AsyncStorage get error', e);
  }
};

export const removeDataFromAsyncStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('AsyncStorage remove error', e);
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('AsyncStorage clear error', e);
  }
};

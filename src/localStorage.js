import AsyncStorage from '@react-native-async-storage/async-storage';


export const getData = async (key) => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log("Getting Data From Local Storage-->",data);
        return data;
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };

export const setData = async (key, value) => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.setItem(key, value);
      console.log("Seting Data To Local Storage-->",data);
      if (data !== null) {
        return data;
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };

export const clearData = async (os) => {
    // get Data from Storage
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        if (os === 'android') {
          await AsyncStorage.clear();
        }
        if (os === 'ios') {
          await AsyncStorage.multiRemove(asyncStorageKeys);
        }
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  };
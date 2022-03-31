
import * as global from "./Global";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function  storeData() {
    try {
      await AsyncStorage.setItem(global.MY_STORAGE_KEY, global.VALUE)
     // alert('Inicio correcto '+"nombre_clave:"+global.MY_STORAGE_KEY);
    } catch (e) {
      // saving error
    }
  }
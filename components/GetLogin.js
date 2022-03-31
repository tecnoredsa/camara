import * as global from "./Global";
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getData() {
    try {
        const value = await AsyncStorage.getItem(global.MY_STORAGE_KEY)
        if (value !== null) {
            global.LOGIN = "LOGUEADO";
            return (true);
            // value previously stored
        } else {
            global.LOGIN = "DESLOGUEADO";
            return (false);
        }
    } catch (e) {
        return (false);
        // error reading value
    }
}
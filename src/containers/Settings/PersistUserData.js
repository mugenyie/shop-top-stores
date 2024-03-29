import AsyncStorage from '@react-native-community/async-storage';

export const USER_PROFILE = "user_profile_key";
export const FCM_TOKEN = "fcm_token";

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        alert(e)
    }
}

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        alert(e)
    }
}

export const clear = async () => {
    await AsyncStorage.clear();
}
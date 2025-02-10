import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorage_initStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
}

export const asyncStorage_getByKey = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        // Xử lý lỗi khi lấy dữ liệu 
        return [];
    }
};

export const asyncStorage_updateByKey = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
}


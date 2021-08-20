import AsyncStorage from "@react-native-async-storage/async-storage";

export const FIRST = "FIRST";
export const NOTFIRST = "NOT_FIRST";
export const P_FIRST = "p_first";
export const V_FIRST = "v_first";

export const clearIsFirstStorage = async (name) => {
   await AsyncStorage.setItem(`@${name}`, NOTFIRST);
};

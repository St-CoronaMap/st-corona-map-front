import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export const getUniqueId = async () => {
   try {
      //유저 추가되면 유저인지 확인
      let id = await AsyncStorage.getItem("@uniqueId");
      if (!id) {
         let newId = uuid.v4();
         await AsyncStorage.setItem("@uniqueId", newId);
         return { id: newId, first: true };
      }
      return { id: id, first: true };
   } catch (err) {
      console.log(err);
   }
};

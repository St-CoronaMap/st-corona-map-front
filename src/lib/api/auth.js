import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import uuid from "react-native-uuid";
import { Address } from "./constants";

// valid 하지 않은 아이디가 이미 있음 -> 멤버 존재 x

export const getNomMemberId = async () => {
   try {
      let id = await AsyncStorage.getItem("@nomMemberId");
      if (!id) {
         // 가입 신청 후 받아오기
         // 중복이면 다시 생성 후 신청하기
         let newId = uuid.v4();
         await nonSignIn(newId);
         await AsyncStorage.setItem("@nomMemberId", newId);
         return { id: newId, first: true };
      }
      return { id: id, first: false };
   } catch (err) {
      console.log(err);
   }
};

export const nonSignIn = async (newId) => {
   try {
      await axios.post(`${Address}/api/member/register/non`, {
         deviceId: newId,
      });
   } catch (err) {
      console.log(err.response.data.message);
   }
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import uuid from "react-native-uuid";
import { Address } from "./constants";

/*
   모든 api는 token으로 이루어짐.

   따라서 비회원이더라도 token을 받아야함.

   0. 회원 auth 토큰, 비회원 아이디가 둘 다 없으면 비회원 아이디 생성
   1. 회원 auth 토큰이 있으면, 회원 auth 토큰을 우선.
      1-1. 로그인 성공하면, 토큰과 함께 프로필 정보 받음.
   2. 만약 비회원 아이디만 있거나, 회원 토큰이 invalid 할 경우, 비회원ID를 보내고 토큰을 받음.
      2-1. 만약 비회원 아이디가 invalid 할 경우 새로 생성

*/

export const getNomMemberId = async () => {
   try {
      let id = await AsyncStorage.getItem("@nomMemberId");
      if (!id) {
         // 가입 신청 후 받아오기
         let newId = uuid.v4();
         await nonSignIn(newId);
         await AsyncStorage.setItem("@nomMemberId", newId);
         return { id: newId, first: true };
      }
      return { id: id, first: false };
   } catch (err) {
      console.log(err.response.data);
   }
};

export const nonSignIn = async (newId) => {
   try {
      await axios.post(`${Address}/api/member/register/non`, {
         deviceId: newId,
      });
   } catch (err) {
      console.log(err.response.data);
   }
};

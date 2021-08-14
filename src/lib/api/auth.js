import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";
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

const setTokens = async (tokens) => {
   const tokensObj = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
   };
   axios.defaults.headers.common[
      "Authorization"
   ] = `Bearer ${tokensObj.accessToken}`;
   await AsyncStorage.setItem("@tokens", JSON.stringify(tokensObj));
   return tokensObj;
};

export const login = async (id, pw) => {
   try {
      const res = await axios.post(`${Address}/api/member/login`, {
         loginId: id,
         password: pw,
         isPC: Platform.OS === "web",
      });
      const tokens = await setTokens(res.data.response);
      return tokens;
   } catch (err) {
      throw err.response.data;
   }
};

export const reissue = async (tokens) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/reissue`,
         {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isPC: Platform.OS === "web",
         },
         { skipAuthRefresh: true }
      );
      const newTokens = await setTokens(res.data.response);
      return newTokens;
   } catch (err) {
      throw err.response.data;
   }
};

export const nonMemberLogin = async () => {
   try {
      let first = false;
      // 비회원 아이디 받아오기
      let id = await AsyncStorage.getItem("@nomMemberId");
      if (!id) {
         // 가입 신청 후 받아오기
         let newId = uuid.v4();
         const res = await nonSignUp(newId);
         await AsyncStorage.setItem("@nomMemberId", res.loginId);
         id = res.loginId;
         first = true;
      }
      //로그인
      const res = await login(id, "");
      const tokens = await setTokens(res);
      return { tokens: tokens, first: first };
   } catch (err) {
      console.log(err.response.data);
   }
};

export const getToken = async () => {
   try {
      const tokensJson = await AsyncStorage.getItem("@tokens");
      let rtObj = { tokens: JSON.parse(tokensJson), first: false };

      if (rtObj.tokens) {
         //reissue
         try {
            const res = await reissue(rtObj.tokens);
            rtObj.tokens = res;
         } catch (err) {
            // 리프레시 토큰 만료시 비회원 재로그인
            // 회원은 기존에 비회원으로 있던 기록이 나오고, 로그인은 자신이 해야함
            const res = await nonMemberLogin();
            rtObj = res;
         }
      } else {
         const res = await nonMemberLogin();
         rtObj = res;
      }
      return rtObj;
   } catch (err) {
      console.log(err.response.data);
   }
};

export const nonSignUp = async (newId) => {
   try {
      const res = await axios.post(`${Address}/api/member/signup/non`, {
         deviceId: newId,
         isPC: Platform.OS === "web",
      });
      return res.data.response;
   } catch (err) {
      console.log(err);
      console.log(err.response.data);
   }
};

export const SignUp = async (id, pw) => {
   try {
      await axios.post(`${Address}/api/member/signup/real`, {
         loginId: id,
         password: pw,
         isPC: Platform.OS === "web",
      });
      const tokens = await login(id, pw);
      return tokens;
   } catch (err) {
      console.log(err.response.data);
      // 중복 아이디 처리
      throw err.response.data;
   }
};

export const removeUser = async () => {
   try {
      await axios.delete(`${Address}/api/member/delete`);
      await logout();
   } catch (err) {
      throw err.response.data;
   }
};

export const logout = async () => {
   try {
      await AsyncStorage.setItem("@tokens", JSON.stringify({}));
      await nonMemberLogin();
   } catch (err) {
      throw err;
   }
};

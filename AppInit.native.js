import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";

import { appInit, reissue } from "./src/lib/api/auth";
import { getPlaylist } from "./src/modules/playlist";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopTabContainer from "./src/components/topTab/container/TopTabContainer";
import PlayScreen from "./src/screens/Play";
import { useDispatch, useSelector } from "react-redux";
import { setIsFirst } from "./src/modules/isFirst";

import { Platform, StyleSheet, View } from "react-native";
import HeaderName from "./src/components/headerName/HeaderName";
import Loading from "./src/components/elements/Loading";
import Snackbar from "rn-animated-snackbar";
import { clearSnackbar } from "./src/modules/snackbar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "./RootNavigation";
import { signin } from "./src/modules/auth";
import palette from "./src/lib/styles/palette";
import { Restart } from "fiction-expo-restart";
import { fontStyle } from "./src/lib/styles/stylesByPlatform.js";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { i18nTranslation } from "./src/lib/i18nTranslation";
import { IS_MOBILE_WEB } from "./src/lib/styles/variables";

const Stack = createStackNavigator();

/*
리프레시 토큰 만료
err.response?.data?.message === "다시 로그인이 필요합니다." ||
err.response?.data?.message === "Refresh Token 이 유효하지 않습니다."
*/

function AppInit() {
   const [preLoading, setPreLoading] = useState(true);
   const loading = useSelector(({ loading }) => loading);
   const snackbar = useSelector(({ snackbar }) => snackbar);
   const dispatch = useDispatch();

   useEffect(() => {
      const interceptorId = axios.interceptors.response.use(
         (res) => res,
         async (err) => {
            const originalRequest = err.config;
            if (err.response?.status === 401 && !originalRequest._retry) {
               originalRequest._retry = true;
               const tokensJson = await AsyncStorage.getItem("@tokens");
               const res = await reissue(JSON.parse(tokensJson));

               axios.defaults.headers.common.Authorization = `Bearer ${res.accessToken}`;
               originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;

               return axios(originalRequest);
            }
            return Promise.reject(err);
         }
      );
      return () => axios.interceptors.response.eject(interceptorId);
   }, []);

   const preload = async () => {
      try {
         switch (Localization.locale) {
            case "en-US":
            case "en":
               i18n.locale = "en-US";
               break;
            case "ko-KR":
            case "ko":
               i18n.locale = "ko-KR";
               break;
            default:
               i18n.locale = "en-US";
         }
         i18n.translations = i18nTranslation;

         const res = await appInit();
         dispatch(setIsFirst(res.first));
         dispatch(signin(res.userInfo));
         dispatch(getPlaylist());

         await AsyncStorage.setItem("@restart", "false");
      } catch (err) {
         console.log(err);
         const res = await AsyncStorage.getItem("@restart");
         if (
            res !== "resetNonId" &&
            err.message === "존재하지 않는 회원입니다."
         ) {
            await AsyncStorage.removeItem("@nomMemberId");
            await AsyncStorage.setItem("@restart", "resetNonId");
            Restart();
         } else if (!res || res === "false") {
            await AsyncStorage.setItem("@restart", "true");
            Restart();
         } else if (res === "resetNonId") {
            await AsyncStorage.setItem("@restart", "false");
         } else if (res === "true") {
            await AsyncStorage.setItem("@restart", "false");
         }
      }
   };

   const onFinish = () => setPreLoading(false);

   if (preLoading) {
      return (
         <AppLoading
            startAsync={preload}
            onError={console.warn}
            onFinish={onFinish}
         />
      );
   }

   return (
      <>
         <NavigationContainer
            ref={navigationRef}
            documentTitle={{ enabled: false }}>
            <View
               style={
                  Platform.OS === "web"
                     ? styles.containerWeb
                     : styles.containerNative
               }>
               <HeaderName />
               <Stack.Navigator mode="modal" initialRouteName="Main">
                  <Stack.Screen
                     name="Main"
                     component={TopTabContainer}
                     options={{ headerShown: false }}
                  />
                  <Stack.Screen
                     name="Play"
                     component={PlayScreen}
                     options={{
                        headerShown: false,
                     }}
                  />
               </Stack.Navigator>
               <Snackbar
                  visible={snackbar}
                  onDismiss={() => dispatch(clearSnackbar())}
                  text={snackbar}
                  duration={3000}
                  textStyle={[
                     { fontSize: 16, color: palette.blackBerry },
                     fontStyle,
                  ]}
                  containerStyle={styles.snackbarContainer}
               />
            </View>
         </NavigationContainer>
         <Loading loading={loading} />
      </>
   );
}

const styles = StyleSheet.create({
   containerWeb: {
      width: IS_MOBILE_WEB ? "98%" : 600,
      height: IS_MOBILE_WEB ? "98%" : "95%",
      borderRadius: 30,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   containerNative: {
      width: "100%",
      height: "100%",
   },
   snackbarContainer: {
      position: "absolute",
      bottom: 10,
      left: 10,
      width: "70%",
      backgroundColor: palette.ivory,
      borderRadius: 20,
      borderColor: palette.redRose,
      borderWidth: 3,
   },
});

export default AppInit;

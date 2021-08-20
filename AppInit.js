import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { ModalPortal } from "react-native-modals";

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
import { clearSnackbar, setSnackbar } from "./src/modules/snackbar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "./RootNavigation";
import { signin } from "./src/modules/auth";

const Stack = createStackNavigator();

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
            if (err?.response?.status === 401 && !originalRequest._retry) {
               originalRequest._retry = true;
               const tokensJson = await AsyncStorage.getItem("@tokens");
               const res = await reissue(JSON.parse(tokensJson));

               axios.defaults.headers.common.Authorization = `Bearer ${res.accessToken}`;
               originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;

               return axios(originalRequest);
            }

            /*else if (
               err?.response?.data?.message === "다시 로그인이 필요합니다." ||
               err?.response?.data?.message ===
                  "Refresh Token 이 유효하지 않습니다."
            ) {
               dispatch(
                  setSnackbar("리프레시 토큰 만료로, 앱을 재실행 시키겠습니다.")
               );
               setTimeout(() => Restart(), 3000);
               return Promise.reject(err);
            }*/
            return Promise.reject(err);
         }
      );
      return () => axios.interceptors.response.eject(interceptorId);
   }, []);

   const preload = async () => {
      const res = await appInit();
      dispatch(setIsFirst(res.first));
      dispatch(signin(res.userInfo));
      dispatch(getPlaylist());
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
               <ModalPortal />
               <Snackbar
                  visible={snackbar}
                  onDismiss={() => dispatch(clearSnackbar())}
                  text={snackbar}
                  duration={1000}
                  textStyle={{ fontSize: 16 }}
                  containerStyle={{
                     position: "absolute",
                     bottom: 10,
                     left: 10,
                     width: "70%",
                     borderRadius: 20,
                  }}
               />
            </View>
         </NavigationContainer>
         <Loading loading={loading} />
      </>
   );
}

const styles = StyleSheet.create({
   containerWeb: {
      width: 600,
      height: "95%",
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
});

export default AppInit;

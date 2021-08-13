import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { ModalPortal } from "react-native-modals";

import { getToken, reissue } from "./src/lib/api/auth";
import { getPlaylist } from "./src/modules/playlist";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopTabContainer from "./src/components/topTab/container/TopTabContainer";
import PlayScreen from "./src/screens/Play";
import { useDispatch, useSelector } from "react-redux";
import { setUniqueId } from "./src/modules/uniqueId";

import { Platform, StyleSheet, View } from "react-native";
import HeaderName from "./src/components/headerName/HeaderName";
import Loading from "./src/components/elements/Loading";
import Snackbar from "rn-animated-snackbar";
import { clearSnackbar } from "./src/modules/snackbar";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function AppInit() {
   const [preLoading, setPreLoading] = useState(true);
   const loading = useSelector(({ loading }) => loading);
   const snackbar = useSelector(({ snackbar }) => snackbar);
   const dispatch = useDispatch();

   useEffect(() => {
      const refreshAuthLogic = async (failedRequest) => {
         const tokensJson = await AsyncStorage.getItem("@tokens");
         try {
            const res = await reissue(JSON.parse(tokensJson));
            failedRequest.response.config.headers["Authorization"] =
               "Bearer " + res.accessToken;
            return Promise.resolve();
         } catch (err) {
            return Promise.reject();
         }
      };
      createAuthRefreshInterceptor(axios, refreshAuthLogic);
   }, []);
   /*
   axios.interceptors.response.use(
      (res) => res,
      async (err) => {
         if (err.response.status === 401) {
            console.log(
               "재요청&&&&&&7&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
            );
            console.log(tokens);
            await reissue(tokens).then((res) => {
               err.config.headers.Authorization = `Bearer ${res.accessToken}`;
               console.log(
                  "재요청&&&&&&7&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
               );
               return axios.request(err.config);
            });
         }
         return Promise.reject(err);
      }
   );
*/
   const preload = async () => {
      const res = await getToken();
      dispatch(setUniqueId(res));
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
         <NavigationContainer documentTitle={{ enabled: false }}>
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

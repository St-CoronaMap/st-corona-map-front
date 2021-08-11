import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { ModalPortal } from "react-native-modals";

import { getNomMemberId } from "./src/lib/api/auth";
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

const Stack = createStackNavigator();

function AppInit() {
   const [preLoading, setPreLoading] = useState(true);
   const loading = useSelector(({ loading }) => loading);
   const snackbar = useSelector(({ snackbar }) => snackbar);
   const dispatch = useDispatch();

   const preload = async () => {
      // 유저정보가 있으면 재로그인 -> 프로필정보 받아서 리덕스에 저장
      // 없으면 Nonmember
      const res = await getNomMemberId();

      // 유저면, 유저접근 식별자를 저장
      dispatch(setUniqueId(res));

      dispatch(getPlaylist(res.id));
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
                     width: "50%",
                     borderRadius: 20,
                  }}
               />
            </View>
         </NavigationContainer>
         <ModalPortal />
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

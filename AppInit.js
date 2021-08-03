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

import Spinner from "react-native-loading-spinner-overlay";
import { Dimensions, Platform, View } from "react-native";
import HeaderName from "./src/components/headerName/HeaderName";

const Stack = createStackNavigator();

function AppInit() {
   const [preLoading, setPreLoading] = useState(true);
   const loading = useSelector(({ loading }) => loading);
   const dispatch = useDispatch();

   const preload = async () => {
      const res = await getNomMemberId();
      dispatch(setUniqueId(res));

      //TODO : 처음 유저 추가시, uniqueId를 넘겨서 받아오기
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
         <NavigationContainer>
            <View
               style={{
                  width:
                     Platform.OS === "web"
                        ? 600
                        : Dimensions.get("window").width,
                  height: "100%",
               }}>
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
            </View>
         </NavigationContainer>
         <ModalPortal />
         {Platform.OS !== "web" && (
            <Spinner
               visible={loading}
               cancelable={true}
               textContent={"Loading..."}
               textStyle={{
                  color: "#FFF",
               }}
            />
         )}
      </>
   );
}

export default AppInit;

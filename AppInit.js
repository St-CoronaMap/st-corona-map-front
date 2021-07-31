import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { ModalPortal } from "react-native-modals";

import { getUniqueId } from "./src/lib/api/uniqueId";
import { setUniqueId } from "./src/modules/uniqueId";
import { getPlaylist } from "./src/modules/playlist";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopTabContainer from "./src/components/topTab/container/TopTabContainer";
import PlayScreen from "./src/screens/Play";
import { useDispatch } from "react-redux";
import { View } from "react-native";

const Stack = createStackNavigator();

function AppInit() {
   const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();

   const preload = async () => {
      const res = await getUniqueId();
      dispatch(setUniqueId(res));

      //TODO : 처음 유저 추가시, uniqueId를 넘겨서 받아오기
      dispatch(getPlaylist());
   };
   const onFinish = () => setLoading(false);
   if (loading) {
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
         </NavigationContainer>
         <ModalPortal />
      </>
   );
}

export default AppInit;

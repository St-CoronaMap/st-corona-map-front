import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import PlayRootContainer from "../components/play/container/PlayRootContainer";
import VideoEditFromPlayRootContainer from "../components/videoEdit/container/VideoEditFromPlayRootContainer";
import palette from "../lib/styles/palette";

const Stack = createStackNavigator();

export default function PlayScreen({ route, navigation }) {
   const playlist = route.params;
   return (
      <Stack.Navigator initialRouteName="PlayScreen">
         <Stack.Screen
            name="PlayScreen"
            component={PlayRootContainer}
            initialParams={{ playlistInput: playlist }}
            options={{
               headerShown: Platform.OS === "web" ? true : false,
               headerStyle: {
                  backgroundColor: palette.ivory,
                  height: 50,
               },
               headerTitleStyle: {
                  fontWeight: "800",
               },
               title: "뒤로가기",
            }}
         />
         <Stack.Screen
            name="videoEdit_play"
            component={VideoEditFromPlayRootContainer}
            options={{
               headerShown: Platform.OS === "web" ? true : false,
               headerStyle: {
                  backgroundColor: palette.ivory,
                  height: 50,
               },
               headerTitleStyle: {
                  fontWeight: "800",
               },
               title: "뒤로가기",
            }}
         />
      </Stack.Navigator>
   );
}

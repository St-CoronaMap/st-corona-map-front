import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import PlayContainer from "../components/play/container/PlayContainer";
import VideoEditFromPlay from "../components/videoEdit/container/VideoEditFromPlay";
import palette from "../lib/styles/palette";

const Stack = createStackNavigator();

export default function PlayScreen({ route, navigation }) {
   const playlist = route.params;
   return (
      <Stack.Navigator initialRouteName="PlayScreen">
         <Stack.Screen
            name="PlayScreen"
            component={PlayContainer}
            initialParams={{ playlistInput: playlist }}
            options={{
               headerShown: Platform.OS === "web" ? true : false,
               headerStyle: {
                  backgroundColor: palette.ivory,
                  height: 50,
               },

               title: "뒤로가기",
            }}
         />
         <Stack.Screen
            name="videoEdit_play"
            component={VideoEditFromPlay}
            options={{
               headerShown: Platform.OS === "web" ? true : false,
               headerStyle: {
                  backgroundColor: palette.ivory,
                  height: 50,
               },
               title: "뒤로가기",
            }}
         />
      </Stack.Navigator>
   );
}

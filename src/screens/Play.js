import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PlayContainer from "../components/play/container/PlayContainer";
import VideoEditFromPlay from "../components/videoEdit/container/VideoEditFromPlay";

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
               headerShown: false,
            }}
         />
         <Stack.Screen
            name="videoEdit_play"
            component={VideoEditFromPlay}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
}

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PlayRootContainer from "../components/play/container/PlayRootContainer";
import VideoEditFromPlayRootContainer from "../components/videoEdit/container/VideoEditFromPlayRootContainer";

import { PLAY_SCREEN, VIDEOEDIT_PLAY } from "../lib/styles/variables";

const Stack = createStackNavigator();

export default function PlayScreen({ route }) {
   const playlist = route.params;
   return (
      <Stack.Navigator initialRouteName={PLAY_SCREEN}>
         <Stack.Screen
            name={PLAY_SCREEN}
            component={PlayRootContainer}
            initialParams={{ playlistInput: playlist }}
            options={{
               headerShown: false,
            }}
         />
         <Stack.Screen
            name={VIDEOEDIT_PLAY}
            component={VideoEditFromPlayRootContainer}
            options={{
               headerShown: false,
            }}
         />
      </Stack.Navigator>
   );
}

import React from "react";
import SearchContainer from "../components/search/container/SearchContainer";
import { createStackNavigator } from "@react-navigation/stack";
import VideoEditRootContainer from "../components/videoEdit/container/VideoEditRootContainer";
import { SEARCH, VIDEOEDIT_SEARCH } from "../lib/styles/variables";

const Stack = createStackNavigator();

export default function SearchScreen({ navigation }) {
   return (
      <Stack.Navigator initialRouteName={SEARCH}>
         <Stack.Screen
            name={SEARCH}
            component={SearchContainer}
            initialParams={{ navigation: navigation }}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name={VIDEOEDIT_SEARCH}
            component={VideoEditRootContainer}
            options={{
               headerShown: false,
            }}
         />
      </Stack.Navigator>
   );
}

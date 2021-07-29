import React from "react";
import SearchContainer from "../components/search/container/SearchContainer";
import { createStackNavigator } from "@react-navigation/stack";
import VideoEditContainer from "../components/videoEdit/container/VideoEditContainer";

const Stack = createStackNavigator();

export default function SearchScreen({ navigation }) {
   return (
      <Stack.Navigator initialRouteName="Search">
         <Stack.Screen
            name="Search"
            component={SearchContainer}
            initialParams={{ navigation: navigation }}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="videoEdit_search"
            component={VideoEditContainer}
            options={{
               headerShown: false,
            }}
         />
      </Stack.Navigator>
   );
}

import React from "react";
import SearchContainer from "../components/search/container/SearchContainer";
import { createStackNavigator } from "@react-navigation/stack";
import VideoEditContainer from "../components/videoEdit/container/VideoEditContainer";
import { Platform } from "react-native";
import palette from "../lib/styles/palette";

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
               headerShown: Platform.OS === "web" ? true : false,
               title: "뒤로가기",
               headerMode: "float",
               headerStyle: {
                  backgroundColor: palette.ivory,
                  height: 50,
               },
            }}
         />
      </Stack.Navigator>
   );
}

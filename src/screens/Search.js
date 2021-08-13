import React from "react";
import SearchContainer from "../components/search/container/SearchContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import palette from "../lib/styles/palette";
import VideoEditRootContainer from "../components/videoEdit/container/VideoEditRootContainer";

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
            component={VideoEditRootContainer}
            options={{
               headerShown: Platform.OS === "web" ? true : false,
               title: "뒤로가기",
               headerMode: "float",
               headerStyle: {
                  backgroundColor: palette.ivory,
                  height: 50,
               },
               headerTitleStyle: {
                  fontWeight: "800",
               },
            }}
         />
      </Stack.Navigator>
   );
}

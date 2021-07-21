import React from "react";
import SearchContainer from "../components/search/container/SearchContainer";
import { createStackNavigator } from "@react-navigation/stack";
import AddItemContainer from "../components/search/container/AddItemContainer";
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
            name="추가"
            component={AddItemContainer}
            options={{
               headerShown: true,
               headerStatusBarHeight: 0,
               title: "뒤로가기",
               headerStyle: {
                  backgroundColor: palette.ivory,
               },
            }}
         />
      </Stack.Navigator>
   );
}

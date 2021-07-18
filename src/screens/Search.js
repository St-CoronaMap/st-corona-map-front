import React from "react";
import SearchContainer from "../components/search/container/SearchContainer";
import { createStackNavigator } from "@react-navigation/stack";
import AddItemContainer from "../components/search/container/AddItemContainer";

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
         <Stack.Screen name="추가" component={AddItemContainer} />
      </Stack.Navigator>
   );
}

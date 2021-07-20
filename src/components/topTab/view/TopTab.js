import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../../screens/Home";
import PlaylistScreen from "../../../screens/Playlist";
import Auth from "../../../screens/Auth";
import PlayScreen from "../../../screens/Play";
import SearchScreen from "../../../screens/Search";

const Tab = createMaterialTopTabNavigator();

function TopTab() {
   return (
      <Tab.Navigator initialRouteName="Home" tabBarOptions={{}}>
         <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: "홈" }}
         />
         <Tab.Screen
            name="Auth"
            component={Auth}
            options={{ tabBarLabel: "로그인" }}
         />
         <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{ tabBarLabel: "검색" }}
         />
         <Tab.Screen
            name="Playlist"
            component={PlaylistScreen}
            options={{ tabBarLabel: "재생목록" }}
         />
      </Tab.Navigator>
   );
}

export default TopTab;

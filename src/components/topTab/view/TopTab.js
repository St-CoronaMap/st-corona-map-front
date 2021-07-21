import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../../screens/Home";
import PlaylistScreen from "../../../screens/Playlist";
import Auth from "../../../screens/Auth";
import SearchScreen from "../../../screens/Search";
import { StyleSheet } from "react-native";
import palette from "../../../lib/styles/palette";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
   barStyle: {
      backgroundColor: palette.redRose,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
   },
   indicator: {
      backgroundColor: palette.blackBerry,
   },
   labelStyle: {},
});

function TopTab() {
   return (
      <Tab.Navigator
         initialRouteName="Home"
         tabBarOptions={{
            activeTintColor: palette.blackBerry,
            indicatorStyle: styles.indicator,
            labelStyle: styles.labelStyle,
            style: styles.barStyle,
         }}>
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

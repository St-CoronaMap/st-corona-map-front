import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PlaylistScreen from "../../../screens/Playlist";
import Auth from "../../../screens/Auth";
import SearchScreen from "../../../screens/Search";
import { Platform, StyleSheet } from "react-native";
import palette from "../../../lib/styles/palette";
import { TAP_HEIGHT } from "../../../lib/styles/variables";
import { fontStyle } from "../../../lib/styles/stylesByPlatform.js";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
   barStyle: {
      height: TAP_HEIGHT,
      backgroundColor: palette.redRose,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   indicator: {
      backgroundColor: palette.ivory,
      color: palette.ivory,
      ...fontStyle,
   },
});

function TopTab({ swipeEnabled, signined }) {
   return (
      <>
         <Tab.Navigator
            initialRouteName="Playlist"
            swipeEnabled={Platform.OS === "web" ? false : swipeEnabled}
            tabBarOptions={{
               activeTintColor: palette.ivory,
               indicatorStyle: styles.indicator,
               style: styles.barStyle,
            }}>
            <Tab.Screen
               name="Playlist"
               component={PlaylistScreen}
               options={{
                  tabBarLabel: "재생목록",
               }}
            />
            <Tab.Screen
               name="Search"
               component={SearchScreen}
               options={{
                  tabBarLabel: "검색",
               }}
            />
            <Tab.Screen
               name="Auth"
               component={Auth}
               options={{
                  tabBarLabel: signined ? "프로필" : "로그인",
               }}
            />
         </Tab.Navigator>
      </>
   );
}

export default TopTab;

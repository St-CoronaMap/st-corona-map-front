import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../lib/styles/palette";
import {
   HEADERNAME_HEIGHT,
   PLAY_SCREEN,
   VIDEOEDIT_PLAY,
   VIDEOEDIT_SEARCH,
} from "../../lib/styles/variables";
import * as RootNavigation from "../../../RootNavigation";
import { boldFontStyle } from "../../lib/styles/stylesByPlatform.js";

/* 상단 네비게이션 위 이름 나오는 부분 */
function HeaderName() {
   const [showGoBack, setShowGoBack] = useState("");
   useEffect(() => {
      const handleState = () => {
         switch (RootNavigation.navigationRef.current?.getCurrentRoute().name) {
            case VIDEOEDIT_SEARCH:
            case PLAY_SCREEN:
            case VIDEOEDIT_PLAY:
               setShowGoBack(true);
               return;
            default:
               setShowGoBack(false);
               return;
         }
      };
      RootNavigation.navigationRef.current?.addListener("state", handleState);
      return () =>
         RootNavigation.navigationRef.current?.removeListener(
            "state",
            handleState
         );
   }, [RootNavigation.navigationRef.current]);

   return (
      <View style={styles.container}>
         {showGoBack && (
            <Button
               onPress={() => RootNavigation.goBack()}
               icon={{
                  name: "angle-left",
                  type: "font-awesome",
                  color: "white",
               }}
               containerStyle={styles.goBackContainer}
               buttonStyle={styles.goBackButton}
            />
         )}
         <Text style={styles.text}>Your List</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      height: HEADERNAME_HEIGHT,
      backgroundColor: palette.redRose,
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      color: "white",
      fontSize: 25,
      ...boldFontStyle,
   },
   goBackContainer: {
      position: "absolute",
      left: 20,
   },
   goBackButton: {
      backgroundColor: palette.redRose,
   },
});

export default React.memo(HeaderName);

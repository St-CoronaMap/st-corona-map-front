import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../lib/styles/palette";
import { HEADERNAME_HEIGHT } from "../../lib/styles/variables";
import * as RootNavigation from "../../../RootNavigation";

/* 상단 네비게이션 위 이름 나오는 부분 */
function HeaderName() {
   return (
      <View style={styles.container}>
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

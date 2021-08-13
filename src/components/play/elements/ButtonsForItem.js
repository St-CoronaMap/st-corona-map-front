import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import { WINDOW_WIDTH } from "../../../lib/styles/variables";

function ButtonsForItem({ onPressDelete, onPressEdit, index, id }) {
   return (
      <>
         <Button
            title="수정"
            type="clear"
            containerStyle={styles(0).buttonContainer}
            buttonStyle={stylesObj.buttonStyle}
            onPress={() => onPressEdit(index)}
            titleStyle={{
               fontSize: 16,
               color: palette.blackBerry,
            }}
         />
         <Button
            title="삭제"
            type="clear"
            containerStyle={styles(1).buttonContainer}
            buttonStyle={stylesObj.buttonStyle}
            titleStyle={{
               color: palette.redRose,
               fontSize: 16,
            }}
            onPress={() => onPressDelete(index, id)}
         />
      </>
   );
}
const styles = (buttonOffset) =>
   StyleSheet.create({
      buttonContainer: {
         position: "absolute",
         right:
            Platform.OS === "web"
               ? 30 + 50 * buttonOffset
               : WINDOW_WIDTH * 0.05 + 50 * buttonOffset,
         height: "100%",
         paddingTop: 10,
         zIndex: -1,
      },
   });
const stylesObj = StyleSheet.create({
   buttonStyle: {
      height: 100,
      width: 50,
   },
});

export default ButtonsForItem;

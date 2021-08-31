import React from "react";
import { StyleSheet, View } from "react-native";
import { fontStyle } from "../../lib/styles/stylesByPlatform.js";
import palette from "../../lib/styles/palette";
import { Button } from "react-native-elements";
import { modalPadding } from "../../lib/styles/variables.js";

function CustomModalFooter({ buttons, width }) {
   return (
      <View
         style={
            stylesFunc({ width: width + modalPadding * 2 }).footerContainer
         }>
         {buttons.map((item, key) => (
            <Button
               key={`modal_button_${key}`}
               titleStyle={[styles.footerButtonText, fontStyle, item.textStyle]}
               containerStyle={
                  stylesFunc({ length: buttons.length }).buttonContainer
               }
               buttonStyle={styles.footerButton}
               title={item.text}
               onPress={item.onPress}
            />
         ))}
      </View>
   );
}

const stylesFunc = ({ length, width }) =>
   StyleSheet.create({
      buttonContainer: {
         width: length === 1 ? "100%" : "50%",
         height: 48,
      },

      footerContainer: {
         flexDirection: "row",
         justifyContent: "center",
         width: width,
         height: 48,
         alignItems: "center",
         backgroundColor: palette.ivory,
         borderBottomRightRadius: 10,
         borderBottomLeftRadius: 10,
         overflow: "hidden",
      },
   });

const styles = StyleSheet.create({
   footerButton: {
      backgroundColor: palette.ivory,
      height: 48,
   },
   footerButtonText: {
      color: palette.blackBerry,
      fontWeight: "500",
   },
});

export default CustomModalFooter;

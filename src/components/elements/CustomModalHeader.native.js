import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { fontStyle } from "../../lib/styles/stylesByPlatform.js";
import palette from "../../lib/styles/palette";
import { modalPadding } from "../../lib/styles/variables.js";

function CustomModalHeader({ props, width }) {
   return (
      <View
         {...props}
         style={stylesFunc({ width: width + modalPadding * 2 }).titleContainer}>
         <Text style={[styles.titleText, fontStyle]}>{props.title}</Text>
      </View>
   );
}

const stylesFunc = ({ width }) =>
   StyleSheet.create({
      titleContainer: {
         width: width,
         height: 48,

         alignItems: "center",
         justifyContent: "center",

         backgroundColor: palette.ivory,

         borderTopRightRadius: 10,
         borderTopLeftRadius: 10,
      },
   });

const styles = StyleSheet.create({
   titleText: {
      fontWeight: "500",
      color: palette.blackBerry,
      fontSize: 20,
   },
});

export default CustomModalHeader;

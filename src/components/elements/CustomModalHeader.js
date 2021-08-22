import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ModalTitle } from "react-native-modals";
import { fontStyle } from "../../lib/styles/stylesByPlatform.js";
import palette from "../../lib/styles/palette";

function CustomModalHeader({ props }) {
   return (
      <ModalTitle
         {...props}
         style={styles.titleContainer}
         textStyle={[styles.titleText, fontStyle]}
      />
   );
}

const styles = StyleSheet.create({
   titleContainer: {
      backgroundColor: palette.ivory,
   },
   titleText: {
      fontWeight: "500",
      color: palette.blackBerry,
   },
});

export default CustomModalHeader;

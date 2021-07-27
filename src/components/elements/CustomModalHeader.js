import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ModalTitle } from "react-native-modals";
import palette from "../../lib/styles/palette";

function CustomModalHeader({ props }) {
   return (
      <ModalTitle
         {...props}
         style={styles.titleContainer}
         textStyle={styles.titleText}
      />
   );
}

const styles = StyleSheet.create({
   titleContainer: {
      backgroundColor: palette.modalRed,
   },
   titleText: {
      color: palette.blackBerry,
   },
});

export default CustomModalHeader;

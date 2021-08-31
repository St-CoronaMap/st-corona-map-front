import React from "react";
import { StyleSheet } from "react-native";
import { ModalFooter, ModalButton } from "react-native-modals";
import { fontStyle } from "../../lib/styles/stylesByPlatform.js";
import palette from "../../lib/styles/palette";

function CustomModalFooter({ buttons }) {
   return (
      <ModalFooter>
         {buttons.map((item, key) => (
            <ModalButton
               key={`modal_button_${key}`}
               textStyle={[styles.footerButtonText, fontStyle]}
               style={styles.footerButton}
               {...item}
            />
         ))}
      </ModalFooter>
   );
}

const styles = StyleSheet.create({
   footerButton: {
      backgroundColor: palette.ivory,
   },
   footerButtonText: {
      color: palette.blackBerry,
      fontWeight: "500",
   },
});

export default CustomModalFooter;

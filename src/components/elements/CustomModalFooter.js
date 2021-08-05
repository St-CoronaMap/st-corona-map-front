import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ModalFooter, ModalButton } from "react-native-modals";
import palette from "../../lib/styles/palette";

function CustomModalFooter({ buttons }) {
   return (
      <ModalFooter>
         {buttons.map((item, key) => (
            <ModalButton
               key={`modal_button_${key}`}
               textStyle={styles.footerButtonText}
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
   },
});

export default CustomModalFooter;

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
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 3,
   },
   footerButtonText: {
      color: palette.blackBerry,
   },
});

export default CustomModalFooter;

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
               {...item}
               textStyle={styles.footerButtonText}
               style={styles.footerButton}
            />
         ))}
      </ModalFooter>
   );
}

const styles = StyleSheet.create({
   footerButton: {
      backgroundColor: palette.redRose,
      borderColor: palette.blackBerry,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
   },
   footerButtonText: {
      color: palette.blackBerry,
   },
});

export default CustomModalFooter;

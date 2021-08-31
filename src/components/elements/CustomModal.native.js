import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import palette from "../../lib/styles/palette";
import { IS_MOBILE_WEB, modalPadding, WIDTH } from "../../lib/styles/variables";
import Modal from "react-native-modal";

function CustomModal({ children, visible, title, footer }) {
   return (
      <Modal isVisible={visible} style={styles.container}>
         {title}
         <View
            style={
               styleFunc({ hasTitle: title ? true : false }).childrenContainer
            }>
            {children}
         </View>
         {footer}
      </Modal>
   );
}

const styleFunc = ({ hasTitle }) =>
   StyleSheet.create({
      childrenContainer: {
         backgroundColor: palette.ivory,
         borderTopLeftRadius: hasTitle ? 0 : 10,
         borderTopRightRadius: hasTitle ? 0 : 10,
         overflow: "hidden",
         padding: modalPadding,
      },
   });

const styles = StyleSheet.create({
   container: {
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   content: {
      height: Dimensions.get("window").height * 0.7,
      width: Platform.OS === "web" ? (IS_MOBILE_WEB ? WIDTH : 600) : WIDTH,
   },
});

export default CustomModal;

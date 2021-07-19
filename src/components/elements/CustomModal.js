import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";

function CustomModal({
   children,
   visible,
   title,
   footer,
   isFullScreen,
   rounded,
}) {
   return (
      <Modal
         visible={visible}
         modalTitle={title}
         footer={footer}
         rounded={rounded}
         hasOverlay
         modalAnimation={
            new SlideAnimation({
               slideFrom: "bottom",
            })
         }>
         <ModalContent
            children={children}
            style={isFullScreen ? styles.content : {}}
         />
      </Modal>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 1,
      width: Dimensions.get("window").width,
   },
});

export default CustomModal;

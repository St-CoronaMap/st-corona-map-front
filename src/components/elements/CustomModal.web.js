import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";
import palette from "../../lib/styles/palette";
import { IS_MOBILE_WEB, WIDTH } from "../../lib/styles/variables";

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
         }
         modalStyle={styles.container}>
         <ModalContent
            children={children}
            style={isFullScreen ? styles.content : {}}
         />
      </Modal>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: palette.ivory,
      borderRadius: 10,
      opacity: 1,
   },
   content: {
      height: Dimensions.get("window").height * 0.7,
      width: Platform.OS === "web" ? (IS_MOBILE_WEB ? WIDTH : 600) : WIDTH,
   },
});

export default CustomModal;

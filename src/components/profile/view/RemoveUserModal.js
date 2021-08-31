import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
   boldFontStyle,
   fontStyle,
} from "../../../lib/styles/stylesByPlatform.js";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import I18n from "i18n-js";

function RemoveUserModal({
   visible,
   setVisible,
   afterRemove,
   removeUserFunc,
   success,
}) {
   const footerProps = [
      {
         key: "cancel",
         text: I18n.t("cancel"),
         onPress: () => setVisible(false),
         textStyle: [{ color: palette.redRose }, boldFontStyle],
      },
      {
         key: "rmove",
         text: I18n.t("remove"),
         onPress: removeUserFunc,
         textStyle: [{ color: palette.blackBerry }, boldFontStyle],
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         text: I18n.t("ok"),
         onPress: afterRemove,
         textStyle: [{ color: palette.blackBerry }, boldFontStyle],
      },
   ];

   return (
      <CustomModal
         visible={visible}
         footer={
            <CustomModalFooter
               buttons={success ? footerOnSuccess : footerProps}
               width={300}
            />
         }>
         <View style={styles.container}>
            <Text style={fontStyle}>
               {success ? I18n.t("thankyou_for_using") : I18n.t("remove_info")}
            </Text>
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 300,
      padding: 10,
      paddingBottom: 0,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
   },
});

export default RemoveUserModal;

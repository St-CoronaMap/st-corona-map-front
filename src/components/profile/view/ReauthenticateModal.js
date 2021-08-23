import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import {
   boldFontStyle,
   fontStyle,
   inputStyle,
} from "../../../lib/styles/stylesByPlatform.js";

import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";
import I18n from "i18n-js";

function ReauthenticateModal({
   onClose,
   visible,
   reauthWithPw,
   onChange,
   errMsg,
   password,
}) {
   const titleProps = {
      title: I18n.t("reauth"),
      hasTitleBar: true,
   };
   const footerProps = [
      {
         key: "cancel",
         text: I18n.t("cancel"),
         onPress: onClose,
         textStyle: [{ color: palette.redRose }, boldFontStyle],
      },
      {
         key: "login",
         text: I18n.t("signin"),
         onPress: reauthWithPw,
         textStyle: [{ color: palette.blackBerry }, boldFontStyle],
      },
   ];
   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader props={titleProps} />}
         footer={<CustomModalFooter buttons={footerProps} />}>
         <View style={styles.container}>
            <Text style={fontStyle}>{I18n.t("input_current_password")}</Text>
            <Input
               secureTextEntry={true}
               value={password}
               errorMessage={errMsg.password}
               onChangeText={onChange}
               inputStyle={inputStyle}
            />
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 300,
      padding: 10,
      paddingTop: 20,
      paddingBottom: 0,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
   },
});

export default ReauthenticateModal;

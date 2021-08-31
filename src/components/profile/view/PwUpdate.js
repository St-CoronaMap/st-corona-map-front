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
import I18n from "i18n-js";

function PwUpdate({
   visible,
   password,
   clear,
   onChange,
   onPasswordUpdate,
   errMsg,
   success,
}) {
   const footerProps = [
      {
         key: "cancel",
         text: I18n.t("cancel"),
         onPress: () => clear(false),
         textStyle: [{ color: palette.redRose }, boldFontStyle],
      },
      {
         key: "update",
         text: I18n.t("change"),
         onPress: () => onPasswordUpdate(password),
         textStyle: [{ color: palette.blackBerry }, boldFontStyle],
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         text: I18n.t("ok"),
         onPress: () => clear(true),
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
            {success ? (
               <Text style={fontStyle}>
                  {I18n.t("change_password_success")}
               </Text>
            ) : (
               <>
                  <Text style={fontStyle}>{I18n.t("input_new_password")}</Text>
                  <Input
                     style={{ width: "80%" }}
                     secureTextEntry={true}
                     value={password}
                     errorMessage={errMsg.password}
                     onChangeText={onChange}
                     inputStyle={inputStyle}
                  />
               </>
            )}
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

export default PwUpdate;

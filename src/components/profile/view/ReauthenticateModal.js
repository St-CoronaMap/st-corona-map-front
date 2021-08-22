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

function ReauthenticateModal({
   onClose,
   visible,
   reauthWithPw,
   onChange,
   errMsg,
   password,
}) {
   const titleProps = {
      title: "재로그인",
      hasTitleBar: true,
   };
   const footerProps = [
      {
         key: "cancel",
         text: "취소",
         onPress: onClose,
         textStyle: [{ color: palette.redRose }, boldFontStyle],
      },
      {
         key: "login",
         text: "로그인",
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
            <Text style={fontStyle}>현재 비밀번호를 입력해주세요.</Text>
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

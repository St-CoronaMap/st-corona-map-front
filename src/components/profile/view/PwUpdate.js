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
         text: "취소",
         onPress: clear,
         textStyle: [{ color: palette.redRose }, boldFontStyle],
      },
      {
         key: "update",
         text: "변경",
         onPress: () => onPasswordUpdate(password),
         textStyle: [{ color: palette.blackBerry }, boldFontStyle],
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         text: "확인",
         onPress: clear,
         textStyle: [{ color: palette.blackBerry }, boldFontStyle],
      },
   ];

   return (
      <CustomModal
         visible={visible}
         footer={
            <CustomModalFooter
               buttons={success ? footerOnSuccess : footerProps}
            />
         }>
         <View style={styles.container}>
            {success ? (
               <Text style={fontStyle}>비밀번호 변경에 성공하셨습니다.</Text>
            ) : (
               <>
                  <Text style={fontStyle}>새로운 비밀번호를 입력해주세요.</Text>
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

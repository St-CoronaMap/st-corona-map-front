import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
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
         textStyle: { color: palette.redRose, fontWeight: "600" },
      },
      {
         key: "update",
         text: "변경",
         onPress: () => onPasswordUpdate(password),
         textStyle: { color: palette.blackBerry, fontWeight: "600" },
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         text: "확인",
         onPress: clear,
         textStyle: { color: palette.blackBerry, fontWeight: "600" },
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
               <Text>비밀번호 변경에 성공하셨습니다.</Text>
            ) : (
               <>
                  <Text>새로운 비밀번호를 입력해주세요.</Text>
                  <Input
                     style={{ width: "80%" }}
                     secureTextEntry={true}
                     value={password}
                     errorMessage={errMsg.password}
                     onChangeText={onChange}
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

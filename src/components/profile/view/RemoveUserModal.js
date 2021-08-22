import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
   boldFontStyle,
   fontStyle,
} from "../../../lib/styles/stylesByPlatform.js";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";

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
         text: "취소",
         onPress: () => setVisible(false),
         textStyle: [{ color: palette.redRose }, boldFontStyle],
      },
      {
         key: "rmove",
         text: "탈퇴",
         onPress: removeUserFunc,
         textStyle: [{ color: palette.blackBerry }, boldFontStyle],
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         text: "확인",
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
            />
         }>
         <View style={styles.container}>
            <Text style={fontStyle}>
               {success
                  ? "이용해주셔서 감사합니다."
                  : "회원님의 모든 정보가 삭제됩니다.\n정말로 탈퇴하시겠습니까?"}
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

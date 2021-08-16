import React from "react";
import { StyleSheet, View, Text } from "react-native";
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
         textStyle: { color: palette.redRose, fontWeight: "600" },
      },
      {
         key: "rmove",
         text: "탈퇴",
         onPress: removeUserFunc,
         textStyle: { color: palette.blackBerry, fontWeight: "600" },
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         text: "확인",
         onPress: afterRemove,
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
            <Text>
               {success
                  ? "이용해주셔서 감사합니다."
                  : "회원님의 모든 정보가 삭제됩니다.\n\n정말로 탈퇴하시겠습니까?"}
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

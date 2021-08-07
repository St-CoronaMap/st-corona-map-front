import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

function AddPlaylistModal({ visible, cancel, onChange, addPlaylist, errMsg }) {
   const titleProps = {
      title: "재생목록 추가",
      hasTitleBar: true,
   };
   const buttons = [
      {
         text: "취소",
         onPress: cancel,
         textStyle: { color: palette.redRose },
      },
      {
         text: "추가",
         onPress: addPlaylist,
      },
   ];

   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader props={titleProps} />}
         footer={<CustomModalFooter buttons={buttons} />}
         rounded>
         <View style={styles.container}>
            <Text>추가하실 재생목록의 이름을 입력해주세요.</Text>
            <Input onChangeText={onChange} errorMessage={errMsg} />
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 30,
      paddingBottom: 0,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
   },
});

export default AddPlaylistModal;

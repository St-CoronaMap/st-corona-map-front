import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import CustomModal from "../../elements/CustomModal";

function AddPlaylistModal({
   visible,
   cancel,
   name,
   onChange,
   addPlaylist,
   errMsg,
}) {
   const title = <ModalTitle title="재생목록 추가" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton text="취소" onPress={cancel} />
         <ModalButton text="추가" onPress={addPlaylist} />
      </ModalFooter>
   );

   return (
      <CustomModal visible={visible} title={title} footer={footer} rounded>
         <View style={styles.container}>
            <Text>추가하실 재생목록의 이름을 입력해주세요.</Text>
            <Input value={name} onChangeText={onChange} errorMessage={errMsg} />
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 30,
      paddingBottom: 0,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default AddPlaylistModal;

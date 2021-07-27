import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

function EditPlaylistModal({ visible, cancel, onDelete }) {
   const props = { title: "재생목록 수정", hasTitleBar: true };
   const buttons = [{ text: "취소", onPress: cancel }];
   return (
      <CustomModal
         visible={visible}
         rounded={true}
         title={<CustomModalHeader props={props} />}
         footer={<CustomModalFooter buttons={buttons} />}>
         <View style={styles.container}>
            <ListItem
               onPress={onDelete}
               underlayColor={palette.ivory}
               activeOpacity={0.5}
               containerStyle={styles.listItem}>
               <ListItem.Content style={{ alignItems: "center" }}>
                  <ListItem.Title>이름 변경</ListItem.Title>
               </ListItem.Content>
            </ListItem>
            <ListItem
               onPress={onDelete}
               underlayColor={palette.ivory}
               activeOpacity={0.5}
               containerStyle={styles.listItem}>
               <ListItem.Content style={{ alignItems: "center" }}>
                  <ListItem.Title>삭제</ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 300,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 20,
   },
   listItem: {
      backgroundColor: palette.ivory,
      height: 50,
      width: "90%",
      overflow: "hidden",
      borderColor: palette.ivory,
      borderWidth: 1,
      borderRadius: 30,
      margin: 10,
      padding: 0,

      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 3,
   },
});

export default EditPlaylistModal;

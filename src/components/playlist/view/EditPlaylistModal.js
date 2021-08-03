import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Input, ListItem } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";

function EditPlaylistModal({
   visible,
   cancel,
   onDelete,
   onEdit,
   onEditTitle,
   onChange,
   editPlaylist,
   errMsg,
}) {
   const buttons = [{ text: "취소", onPress: cancel }];
   const editTitleButtons = [
      {
         text: "취소",
         onPress: cancel,
         textStyle: { color: palette.redRose },
      },
      {
         text: "수정",
         onPress: editPlaylist,
      },
   ];
   return (
      <CustomModal
         visible={visible}
         rounded={true}
         footer={
            <CustomModalFooter
               buttons={onEditTitle ? editTitleButtons : buttons}
            />
         }>
         {!onEditTitle ? (
            <View style={styles.container}>
               <ListItem
                  onPress={onEdit}
                  underlayColor={palette.ivory}
                  activeOpacity={0.5}
                  containerStyle={styles.listItem}>
                  <ListItem.Content style={{ alignItems: "center" }}>
                     <ListItem.Title style={{ color: "#03a9f4" }}>
                        이름 변경
                     </ListItem.Title>
                  </ListItem.Content>
               </ListItem>
               <ListItem
                  onPress={onDelete}
                  underlayColor={palette.ivory}
                  activeOpacity={0.5}
                  containerStyle={styles.listItem}>
                  <ListItem.Content style={{ alignItems: "center" }}>
                     <ListItem.Title style={{ color: palette.redRose }}>
                        삭제
                     </ListItem.Title>
                  </ListItem.Content>
               </ListItem>
            </View>
         ) : (
            <View style={styles.containerEdit}>
               <Text>새로운 재생목록의 이름을 입력해주세요.</Text>
               <Input onChangeText={onChange} errorMessage={errMsg} />
            </View>
         )}
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
   containerEdit: {
      padding: 30,
      paddingBottom: 0,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
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

import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Input, ListItem } from "react-native-elements";
import { fontStyle, inputStyle } from "../../../lib/styles/stylesByPlatform.js";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import I18n from "i18n-js";

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
   const buttons = [{ text: I18n.t("cancel"), onPress: cancel }];
   const editTitleButtons = [
      {
         text: I18n.t("cancel"),
         onPress: cancel,
         textStyle: [{ color: palette.redRose }, fontStyle],
      },
      {
         text: I18n.t("edit"),
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
               width={300}
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
                     <ListItem.Title
                        style={[{ color: palette.blackBerry }, fontStyle]}>
                        {I18n.t("change_playlist_name")}
                     </ListItem.Title>
                  </ListItem.Content>
               </ListItem>
               <ListItem
                  onPress={onDelete}
                  underlayColor={palette.ivory}
                  activeOpacity={0.5}
                  containerStyle={styles.listItem}>
                  <ListItem.Content style={{ alignItems: "center" }}>
                     <ListItem.Title
                        style={[{ color: palette.redRose }, fontStyle]}>
                        {I18n.t("delete_playlist")}
                     </ListItem.Title>
                  </ListItem.Content>
               </ListItem>
            </View>
         ) : (
            <View style={styles.containerEdit}>
               <Text style={fontStyle}>
                  {I18n.t("enter_new_playlist_name")}
               </Text>
               <Input
                  onChangeText={onChange}
                  errorMessage={errMsg}
                  inputStyle={inputStyle}
               />
            </View>
         )}
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 300,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   containerEdit: {
      width: 300,
      padding: 10,
      paddingBottom: 0,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
   },
   listItem: {
      backgroundColor: palette.ivory,
      height: 50,
      width: 270,
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

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { fontStyle, inputStyle } from "../../../lib/styles/stylesByPlatform.js";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";
import I18n from "i18n-js";

function AddPlaylistModal({ visible, cancel, onChange, addPlaylist, errMsg }) {
   const titleProps = {
      title: I18n.t("add_playlist_modal_title"),
      hasTitleBar: true,
   };
   const buttons = [
      {
         text: I18n.t("cancel"),
         onPress: cancel,
         textStyle: [{ color: palette.redRose }, fontStyle],
      },
      {
         text: I18n.t("add"),
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
            <Text style={fontStyle}>{I18n.t("enter_playlist_name")}</Text>
            <Input
               onChangeText={onChange}
               errorMessage={errMsg}
               inputStyle={inputStyle}
            />
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

import React from "react";
import {
   boldFontStyle,
   fontStyle,
} from "../../../lib/styles/stylesByPlatform.js";
import palette from "../../../lib/styles/palette";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";
import AddItemContainer from "../../playlist/container/AddItemContainer";
import I18n from "i18n-js";
import { Platform } from "react-native";
import { HEIGHT, IS_MOBILE_WEB, WIDTH } from "../../../lib/styles/variables.js";
import { View } from "react-native";

const width =
   Platform.OS === "web" ? (IS_MOBILE_WEB ? WIDTH * 0.95 : 600) : WIDTH;

function SelectPlaylist({ visible, cancel, item }) {
   const titleProps = {
      title: I18n.t("select_playlist"),
      textStyle: boldFontStyle,
   };
   const buttons = [
      {
         text: I18n.t("cancel"),
         onPress: cancel,
         textStyle: [{ color: palette.redRose }, fontStyle],
      },
   ];

   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader props={titleProps} width={width} />}
         footer={<CustomModalFooter buttons={buttons} width={width} />}
         rounded={false}
         isFullScreen>
         <View
            style={{
               width: width,
               height: HEIGHT * 0.7,
               backgroundColor: palette.ivory,
            }}>
            <AddItemContainer item={item} afterAdd={cancel} />
         </View>
      </CustomModal>
   );
}

export default React.memo(SelectPlaylist);

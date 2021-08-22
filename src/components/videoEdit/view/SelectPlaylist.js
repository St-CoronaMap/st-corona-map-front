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

function SelectPlaylist({ visible, cancel, item }) {
   const titleProps = { title: "재생목록 선택", textStyle: boldFontStyle };
   const buttons = [
      {
         text: "취소",
         onPress: cancel,
         textStyle: [{ color: palette.redRose }, fontStyle],
      },
   ];

   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader props={titleProps} />}
         footer={<CustomModalFooter buttons={buttons} />}
         rounded={false}
         isFullScreen>
         <AddItemContainer item={item} afterAdd={cancel} />
      </CustomModal>
   );
}

export default React.memo(SelectPlaylist);

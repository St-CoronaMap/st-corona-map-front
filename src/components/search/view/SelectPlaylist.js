import React from "react";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";
import AddItemContainer from "../../playlist/container/AddItemContainer";

function SelectPlaylist({ visible, cancel, item }) {
   const titleProps = { title: "재생목록 선택" };
   const buttons = [
      {
         text: "취소",
         onPress: cancel,
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

export default SelectPlaylist;

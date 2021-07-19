import React from "react";
import { ModalButton, ModalFooter, ModalTitle } from "react-native-modals";
import CustomModal from "../../elements/CustomModal";
import AddItemContainer from "../../playlist/container/AddItemContainer";

function SelectPlaylist({ visible, cancel, item }) {
   const title = <ModalTitle title="재생목록 선택" hasTitleBar />;
   const footer = (
      <ModalFooter>
         <ModalButton text="취소" onPress={cancel} />
      </ModalFooter>
   );

   return (
      <CustomModal
         visible={visible}
         title={title}
         footer={footer}
         rounded={false}
         isFullScreen>
         <AddItemContainer item={item} afterAdd={cancel} />
      </CustomModal>
   );
}

export default SelectPlaylist;

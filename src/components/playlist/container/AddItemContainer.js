import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../modules/playlist";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";

function AddItemContainer({ item, afterAdd }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
   const playlist = useSelector(({ playlist }) => playlist);
   const dispatch = useDispatch();

   const addItemCallback = (list) => {
      console.log(list);
      dispatch(addItem(list.id, item));
      afterAdd();
   };

   const onPressVisible = () => {
      setVisibleAddPlaylist(true);
   };
   const cancel = () => {
      setVisibleAddPlaylist(false);
   };

   return (
      <>
         <Playlist
            playlist={playlist}
            listPressCallback={addItemCallback}
            onPressVisible={onPressVisible}
         />
         <AddPlaylistModalContainer
            visible={visibleAddPlaylist}
            cancel={cancel}
         />
      </>
   );
}

export default AddItemContainer;

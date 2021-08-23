import I18n from "i18n-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideo } from "../../../lib/api/videos";
import { setLoading, setUnloading } from "../../../modules/loading";
import { setThumbnail } from "../../../modules/playlist";
import { setSnackbar } from "../../../modules/snackbar";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";

function AddItemContainer({ item, afterAdd }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
   const playlist = useSelector(({ playlist }) => playlist);
   const dispatch = useDispatch();

   const addItemCallback = async (list) => {
      dispatch(setLoading());
      try {
         await addVideo(list.id, item);
         if (!list.thumbnail) {
            dispatch(setThumbnail(list.id, item.thumbnail));
         }
         afterAdd();
      } catch (err) {
         dispatch(setSnackbar(I18n.t("server_error")));
      }
      dispatch(setUnloading());
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

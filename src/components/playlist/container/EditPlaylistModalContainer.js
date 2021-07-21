import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePlaylistLocal } from "../../../lib/api/playlist";
import { getPlaylist } from "../../../modules/playlist";
import EditPlaylistModal from "../view/EditPlaylistModal";

function EditPlaylistModalContainer({
   visible,
   cancel,
   edittingPlaylist,
   playlist,
}) {
   const dispatch = useDispatch();
   const onDelete = useCallback(async () => {
      await deletePlaylistLocal(playlist, edittingPlaylist.id);
      dispatch(getPlaylist());
      cancel();
   }, [playlist]);

   return (
      <EditPlaylistModal
         cancel={cancel}
         visible={visible}
         onDelete={onDelete}
         edittingPlaylist={edittingPlaylist}
      />
   );
}

export default EditPlaylistModalContainer;

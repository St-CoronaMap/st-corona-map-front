import I18n from "i18n-js";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePlaylist, editPlaylist } from "../../../lib/api/playlist";
import { setLoading, setUnloading } from "../../../modules/loading";
import { getPlaylist } from "../../../modules/playlist";
import { setSnackbar } from "../../../modules/snackbar";
import EditPlaylistModal from "../view/EditPlaylistModal";

function EditPlaylistModalContainer({ visible, cancel, edittingPlaylist }) {
   const [onEditTitle, setOnEditTitle] = useState(false);
   const [name, setName] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const dispatch = useDispatch();

   const onDelete = useCallback(async () => {
      dispatch(setLoading());
      try {
         await deletePlaylist(edittingPlaylist.id);
         dispatch(getPlaylist(() => dispatch(setUnloading())));
         cancel();
      } catch (err) {
         dispatch(setSnackbar(I18n.t("server_error")));
         dispatch(setUnloading());
      }
   }, [edittingPlaylist]);

   const editPlaylistCallback = () => {
      if (!name) {
         setErrMsg(I18n.t("blank_playlist_name"));
         return;
      }
      if (name[0] === " " || name[name.length - 1] === " ") {
         setErrMsg(I18n.t("playlist_name_format"));
         return;
      }
      if (name.length > 20) {
         setErrMsg(I18n.t("playlist_name_length"));
         return;
      }
      callEditPlaylist(name);
   };

   const callEditPlaylist = useCallback(
      async (name) => {
         dispatch(setLoading());
         try {
            await editPlaylist({
               id: edittingPlaylist.id,
               title: name,
            });
            dispatch(getPlaylist(() => dispatch(setUnloading())));
            cancelCallback();
         } catch (err) {
            dispatch(setSnackbar(I18n.t("server_error")));
            dispatch(setUnloading());
         }
      },
      [edittingPlaylist]
   );

   const onEdit = useCallback(() => {
      setOnEditTitle(true);
   }, []);

   const onChange = useCallback(
      (v) => {
         if (errMsg) {
            setErrMsg("");
         }
         setName(v);
      },
      [errMsg]
   );

   const cancelCallback = useCallback(() => {
      setOnEditTitle(false);
      cancel();
   }, []);

   return (
      <EditPlaylistModal
         cancel={cancelCallback}
         visible={visible}
         onDelete={onDelete}
         onEdit={onEdit}
         onEditTitle={onEditTitle}
         onChange={onChange}
         editPlaylist={editPlaylistCallback}
         errMsg={errMsg}
      />
   );
}

export default React.memo(EditPlaylistModalContainer);

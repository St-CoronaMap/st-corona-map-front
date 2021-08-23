import I18n from "i18n-js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaylist } from "../../../lib/api/playlist";
import { setLoading, setUnloading } from "../../../modules/loading";
import { getPlaylist } from "../../../modules/playlist";
import { setSnackbar } from "../../../modules/snackbar";
import AddPlaylistModal from "../view/AddPlaylistModal";

function AddPlaylistModalContainer({ visible, cancel }) {
   const [name, setName] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const dispatch = useDispatch();
   const onChange = (v) => {
      if (errMsg) {
         setErrMsg("");
      }
      setName(v);
   };
   const addPlaylistCallback = () => {
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
      callAddPlaylist(name);
   };

   const callAddPlaylist = async (name) => {
      dispatch(setLoading());
      try {
         await addPlaylist({
            title: name,
            isPublic: false,
            category: "OTHER",
         });
         dispatch(getPlaylist(() => dispatch(setUnloading())));
         cancel();
      } catch (err) {
         if (err.message === "비회원 playlist 제한을 초과하였습니다.") {
            dispatch(setSnackbar(I18n.t("nonmember_playlist_limit")));
         } else {
            dispatch(setSnackbar(I18n.t("server_error")));
         }
         dispatch(setUnloading());
      }
   };

   return (
      <AddPlaylistModal
         visible={visible}
         cancel={cancel}
         addPlaylist={addPlaylistCallback}
         errMsg={errMsg}
         name={name}
         onChange={onChange}
      />
   );
}

export default React.memo(AddPlaylistModalContainer);

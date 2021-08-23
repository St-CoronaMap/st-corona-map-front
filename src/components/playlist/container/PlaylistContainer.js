import React, { useCallback, useState } from "react";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";
import { useDispatch, useSelector } from "react-redux";
import EditPlaylistModalContainer from "./EditPlaylistModalContainer";
import { getVideoList } from "../../../lib/api/videos";
import { setLoading, setUnloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { clearIsFirst } from "../../../modules/isFirst";
import { FIRST, P_FIRST } from "../../../lib/api/isFirstStorage";
import I18n from "i18n-js";

function PlaylistContainer({ navigation }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
   const [visibleEditPlaylist, setVisibleEditPlaylist] = useState(false);
   const [edittingPlaylist, setEdittingPlaylist] = useState({});
   const playlist = useSelector(({ playlist }) => playlist);
   const isFirst = useSelector(({ isFirst }) => isFirst[P_FIRST] === FIRST);
   const dispatch = useDispatch();

   const enterPlaylist = async (list) => {
      dispatch(setLoading());
      try {
         const res = await getVideoList(list.id);
         dispatch(setUnloading());
         if (res.length === 0) {
            dispatch(setSnackbar(I18n.t("blank_playlist")));
            return;
         }
         navigation.navigate("Play", {
            id: list.id,
            items: res.sort((a, b) => a.sequence - b.sequence),
         });
      } catch (err) {
         dispatch(setSnackbar(I18n.t("server_error")));
         dispatch(setUnloading());
      }
   };
   const onPressVisible = useCallback(() => {
      setVisibleAddPlaylist(true);
   }, []);
   const cancelAddPlaylist = useCallback(() => {
      setVisibleAddPlaylist(false);
   }, []);
   const onPressVisibleEdit = useCallback((item) => {
      setVisibleEditPlaylist(true);
      setEdittingPlaylist(item);
   }, []);
   const cancelEditPlaylist = useCallback(() => {
      setVisibleEditPlaylist(false);
   }, []);
   const closeTootip = useCallback(() => {
      dispatch(clearIsFirst());
   }, []);

   const clearIsFirstP = useCallback(() => {
      dispatch(clearIsFirst(P_FIRST));
   }, []);

   return (
      <>
         <Playlist
            playlist={playlist}
            listPressCallback={enterPlaylist}
            onPressVisible={onPressVisible}
            onPressVisibleEdit={onPressVisibleEdit}
            isFirst={isFirst}
            closeTootip={closeTootip}
            clearIsFirstP={clearIsFirstP}
         />
         <AddPlaylistModalContainer
            visible={visibleAddPlaylist}
            cancel={cancelAddPlaylist}
            playlist={playlist}
         />
         <EditPlaylistModalContainer
            visible={visibleEditPlaylist}
            cancel={cancelEditPlaylist}
            edittingPlaylist={edittingPlaylist}
         />
      </>
   );
}

export default PlaylistContainer;

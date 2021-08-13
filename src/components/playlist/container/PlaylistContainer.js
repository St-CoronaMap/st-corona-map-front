import React, { useCallback, useState } from "react";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";
import { useDispatch, useSelector } from "react-redux";
import EditPlaylistModalContainer from "./EditPlaylistModalContainer";
import { getVideoList } from "../../../lib/api/videos";
import { setLoading, setUnloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";

function PlaylistContainer({ navigation }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
   const [visibleEditPlaylist, setVisibleEditPlaylist] = useState(false);
   const [edittingPlaylist, setEdittingPlaylist] = useState({});
   const playlist = useSelector(({ playlist }) => playlist);
   const firstTime = useSelector(({ uniqueId }) => uniqueId.first);
   const dispatch = useDispatch();

   const enterPlaylist = async (list) => {
      // dispatch(setLoading());
      try {
         const res = await getVideoList(list.id);
         //dispatch(setUnloading());
         if (res.length === 0) {
            dispatch(setSnackbar("재생목록이 비어있습니다."));
            return;
         }
         navigation.navigate("Play", {
            id: list.id,
            items: res.sort((a, b) => a.sequence - b.sequence),
         });
      } catch (err) {
         /*
         dispatch(
            setSnackbar(
               "서버 오류로 작업에 실패했습니다. \n다시 시도해 주세요."
            )
         );
        dispatch(setUnloading());*/
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

   return (
      <>
         <Playlist
            playlist={playlist}
            listPressCallback={enterPlaylist}
            onPressVisible={onPressVisible}
            onPressVisibleEdit={onPressVisibleEdit}
            firstTime={firstTime}
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

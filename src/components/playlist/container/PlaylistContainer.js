import React, { useCallback, useEffect, useState } from "react";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";
import Snackbar from "rn-animated-snackbar";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "../../../modules/playlist";
import EditPlaylistModalContainer from "./EditPlaylistModalContainer";

function PlaylistContainer({ navigation }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
   const [visibleEditPlaylist, setVisibleEditPlaylist] = useState(false);
   const [edittingPlaylist, setEdittingPlaylist] = useState({});
   const [visible, setVisible] = useState(false);
   const playlist = useSelector(({ playlist }) => playlist);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getPlaylist());
   }, []);

   const enterPlaylist = (item) => {
      if (item.items.length === 0) {
         setVisible(true);
         return;
      }
      navigation.navigate("Play", { playlist: item });
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
         />
         <AddPlaylistModalContainer
            visible={visibleAddPlaylist}
            cancel={cancelAddPlaylist}
            playlist={playlist}
         />
         <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            text="재생목록이 비어있습니다."
            duration={1000}
            containerStyle={{
               position: "absolute",
               bottom: 10,
            }}
         />
         <EditPlaylistModalContainer
            visible={visibleEditPlaylist}
            cancel={cancelEditPlaylist}
            edittingPlaylist={edittingPlaylist}
            playlist={playlist}
         />
      </>
   );
}

export default PlaylistContainer;

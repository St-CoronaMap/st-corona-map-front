import React, { useState } from "react";
import { useSelector } from "react-redux";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";

function PlaylistContainer({ navigation }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
   const playlist = useSelector(({ playlist }) => playlist);

   const enterPlaylist = (item) => {
      console.log(item);
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
            listPressCallback={enterPlaylist}
            onPressVisible={onPressVisible}
         />
         <AddPlaylistModalContainer
            visible={visibleAddPlaylist}
            cancel={cancel}
         />
      </>
   );
}

export default PlaylistContainer;

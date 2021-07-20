import React, { useState } from "react";
import { useSelector } from "react-redux";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";
import Snackbar from "rn-animated-snackbar";
import { Dimensions } from "react-native";

function PlaylistContainer({ navigation }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
   const [visible, setVisible] = useState(false);
   const playlist = useSelector(({ playlist }) => playlist);

   const enterPlaylist = (item) => {
      if (item.items.length === 0) {
         setVisible(true);
         return;
      }
      navigation.jumpTo("Play", { playlist: item });
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
      </>
   );
}

export default PlaylistContainer;

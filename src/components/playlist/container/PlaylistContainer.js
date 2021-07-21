import React, { useEffect, useState } from "react";
import Playlist from "../view/Playlist";
import AddPlaylistModalContainer from "./AddPlaylistModalContainer";
import Snackbar from "rn-animated-snackbar";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "../../../modules/playlist";

function PlaylistContainer({ navigation }) {
   const [visibleAddPlaylist, setVisibleAddPlaylist] = useState(false);
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
      </>
   );
}

export default PlaylistContainer;

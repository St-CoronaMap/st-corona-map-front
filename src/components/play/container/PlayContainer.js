import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeOrder, deleteVideo } from "../../../lib/api/videos";
import { clearThumbnail, setThumbnail } from "../../../modules/playlist";
import Play from "../view/Play";

function PlayContainer({ route, navigation }) {
   const [playing, setPlaying] = useState(true);
   const [playlist, setPlaylist] = useState(route.params.playlistInput);
   const playerRef = useRef();
   const [cur, setCur] = useState(0);
   const [vol, setVol] = useState(50);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!route.params.isCurItem) {
         setPlaying(true);
      }
      setPlaylist(route.params.playlistInput);
   }, [route]);

   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);

   const onReady = useCallback(() => {
      setPlaying(true);
   }, []);

   const handleStateChange = useCallback(
      (e) => {
         if (e === "ended") {
            setPlaying(false);
            if (cur === playlist?.items.length - 1) {
               setCur(0);
               if (playlist?.items.length === 1) {
                  setPlaying(true);
                  playerRef.current?.seekTo(playlist?.items[0].start, true);
               }
            } else {
               setCur((prev) => prev + 1);
            }
         }
      },
      [cur]
   );

   const onPressItem = useCallback(
      (idx) => {
         if (cur !== idx) {
            setPlaying(false);
         }
         setCur(idx);
      },
      [cur]
   );

   const changeVol = useCallback((v) => {
      setVol(v);
   }, []);

   const pressBackward = useCallback(() => {
      if (playlist?.items.length === 1) {
         return;
      }
      setPlaying(false);
      if (cur === 0) {
         setCur(playlist?.items.length - 1);
      } else {
         setCur((prev) => prev - 1);
      }
   }, [cur, playlist.items.length]);

   const pressForwardward = useCallback(() => {
      if (playlist.items.length === 1) {
         return;
      }
      setPlaying(false);
      if (cur === playlist?.items.length - 1) {
         setCur(0);
      } else {
         setCur((prev) => prev + 1);
      }
   }, [cur, playlist.items.length]);

   const changePlaylistOrder = useCallback(
      async ({ data, from, to }) => {
         if (from === to) {
            return;
         }
         await changeOrder(playlist.id, data);
         setPlaylist((prev) => ({ id: prev.id, items: data }));
         if ((from >= cur && to <= cur) || (from <= cur && to >= cur)) {
            setPlaying(false);
         }
      },
      [cur, playlist.id]
   );

   const onPressEditVideo = useCallback(
      (index) => {
         setPlaying(false);
         navigation.navigate("videoEdit_play", {
            item: playlist.items[index],
            isCurItem: index === cur,
            from: "play",
            playlist: playlist,
         });
      },
      [cur, playlist]
   );

   const onPressDeleteVideo = useCallback(
      async (index, id) => {
         await deleteVideo(id);
         if (playlist.items.length === 1) {
            navigation.navigate("Playlist");
            dispatch(clearThumbnail(playlist.id));
         } else {
            if (index === 0) {
               dispatch(setThumbnail(playlist.id, playlist.items[1].thumbnail));
            }
            setPlaylist((prev) => ({
               id: prev.id,
               items: prev.items.filter((item) => item.id !== id),
            }));
            if (cur !== 0 && index <= cur) {
               setCur((prev) => prev - 1);
            }
            if (index === cur) {
               setPlaying(false);
            }
         }
      },
      [cur, playlist]
   );

   return (
      <Play
         onPressItem={onPressItem}
         playlist={playlist}
         changePlaylistOrder={changePlaylistOrder}
         onPressEditVideo={onPressEditVideo}
         onPressDeleteVideo={onPressDeleteVideo}
         playing={playing}
         playerRef={playerRef}
         togglePlaying={togglePlaying}
         handleStateChange={handleStateChange}
         cur={cur}
         vol={vol}
         changeVol={changeVol}
         onReady={onReady}
         pressBackward={pressBackward}
         pressForwardward={pressForwardward}
      />
   );
}

export default PlayContainer;

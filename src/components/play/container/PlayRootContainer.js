import I18n from "i18n-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { changeOrder, deleteVideo } from "../../../lib/api/videos";
import { setLoading, setUnloading } from "../../../modules/loading";
import { clearThumbnail, setThumbnail } from "../../../modules/playlist";
import { setSnackbar } from "../../../modules/snackbar";
import PlayContainer from "./PlayContainer";

function PlayRootContainer({ route, navigation }) {
   const [playing, setPlaying] = useState(true);
   const [playingByPlayer, setPlayingByPlayer] = useState(true);
   const [prevVideoId, setPrevVideoId] = useState(0);
   const [playlist, setPlaylist] = useState(route.params.playlistInput);
   const playerRef = useRef();
   const [cur, setCur] = useState(0);
   const [vol, setVol] = useState(50);
   const dispatch = useDispatch();

   useEffect(() => {
      if (prevVideoId === playlist.items[cur]?.videoId) {
         playerRef.current?.seekTo(
            playlist.items[cur]?.start,
            Platform.OS === "web" ? "seconds" : true
         );
      }
      setPrevVideoId(playlist.items[cur]?.videoId);
   }, [cur]);

   const togglePlaying = useCallback(() => {
      if (!playingByPlayer && playing) {
         setPlaying(false);
         setPlayingByPlayer(true);
         setTimeout(() => setPlaying(true), 0);
      } else {
         setPlayingByPlayer((prev) => !prev);
         setPlaying((prev) => !prev);
      }
   }, [playing, playingByPlayer]);

   const changeVol = useCallback((v) => {
      setVol(v);
   }, []);

   const onPressDeleteVideo = useCallback(
      async (index, id) => {
         dispatch(setLoading());
         try {
            await deleteVideo(id);
            if (playlist.items.length === 1) {
               dispatch(clearThumbnail(playlist.id));
               navigation.navigate("Playlist");
            } else {
               if (index === 0) {
                  dispatch(
                     setThumbnail(playlist.id, playlist.items[1].thumbnail)
                  );
               }
               setPlaylist((prev) => ({
                  id: prev.id,
                  items: prev.items.filter((item) => item.id !== id),
               }));
               if (cur !== 0 && index <= cur) {
                  setCur((prev) => prev - 1);
               }
            }
         } catch (err) {
            dispatch(setSnackbar(I18n.t("server_error")));
         }
         dispatch(setUnloading());
      },
      [cur, playlist]
   );

   const onPressEditVideo = useCallback(
      (index) => {
         setPlaying(false);
         navigation.navigate("videoEdit_play", {
            item: playlist.items[index],
            from: "play",
            playlist: playlist,
            isCurItem: cur === index,
         });
      },
      [cur, playlist]
   );

   const changePlaylistOrder = useCallback(
      async ({ data, from, to }) => {
         if (from === to) {
            return;
         }
         dispatch(setLoading());
         try {
            await changeOrder(playlist.id, data);
            setPlaylist((prev) => ({ id: prev.id, items: data }));
         } catch (err) {
            dispatch(setSnackbar(I18n.t("server_error")));
         }
         dispatch(setUnloading());
      },
      [cur, playlist.id]
   );

   const onPressItem = useCallback((idx) => {
      setCur(idx);
   }, []);

   const pressBackward = useCallback(() => {
      if (playlist?.items.length === 1) {
         return;
      }
      setCur((prev) => (cur === 0 ? playlist?.items.length - 1 : prev - 1));
   }, [cur, playlist.items.length]);

   const pressForwardward = useCallback(() => {
      if (playlist.items.length === 1) {
         return;
      }
      setCur((prev) => (playlist?.items.length - 1 === cur ? 0 : prev + 1));
   }, [cur, playlist.items.length]);

   return (
      <PlayContainer
         route={route}
         playing={playing}
         setPlaying={setPlaying}
         playingByPlayer={playingByPlayer}
         setPlayingByPlayer={setPlayingByPlayer}
         playlist={playlist}
         setPlaylist={setPlaylist}
         playerRef={playerRef}
         togglePlaying={togglePlaying}
         cur={cur}
         setCur={setCur}
         vol={vol}
         changeVol={changeVol}
         onPressDeleteVideo={onPressDeleteVideo}
         onPressEditVideo={onPressEditVideo}
         changePlaylistOrder={changePlaylistOrder}
         onPressItem={onPressItem}
         pressBackward={pressBackward}
         pressForwardward={pressForwardward}
      />
   );
}

export default PlayRootContainer;

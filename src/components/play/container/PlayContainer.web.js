import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeOrder, deleteVideo } from "../../../lib/api/videos";
import { setInPlay, setOutPlay } from "../../../modules/isPlay";
import { setLoading, setUnloading } from "../../../modules/loading";
import { clearThumbnail, setThumbnail } from "../../../modules/playlist";
import Play from "../view/Play";

function PlayContainer({ route, navigation }) {
   const [playing, setPlaying] = useState(true);
   const [playlist, setPlaylist] = useState(route.params.playlistInput);
   const [prevVideoId, setPrevVideoId] = useState(0);
   const playerRef = useRef();
   const [cur, setCur] = useState(0);
   const [vol, setVol] = useState(50);
   const dispatch = useDispatch();

   // 백그라운드 재생 막기
   useEffect(() => {
      dispatch(setInPlay());
      return () => dispatch(setOutPlay());
   }, []);

   useEffect(() => {
      if (route.params.from === "play") {
         setPlaying(true);
      }
      setPlaylist(route.params.playlistInput);
   }, [route]);

   useEffect(() => {
      if (prevVideoId === playlist.items[cur]?.videoId) {
         playerRef.current?.seekTo(playlist.items[cur]?.start, "seconds");
      }
      setPrevVideoId(playlist.items[cur]?.videoId);
   }, [cur]);

   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);

   const onStart = useCallback(() => {
      playerRef.current?.seekTo(playlist.items[cur]?.start, "seconds");
   }, [playlist.items, cur]);

   const onProgress = useCallback(
      (playedSeconds) => {
         if (playedSeconds >= playlist.items[cur]?.end) {
            setCur((prev) =>
               playlist?.items.length - 1 === cur ? 0 : prev + 1
            );
            if (playlist?.items.length === 1) {
               playerRef.current?.seekTo(playlist?.items[0].start, "seconds");
            }
            setPlaying(true);
         }
      },
      [cur, playlist]
   );
   const onEnded = useCallback(() => {
      setCur((prev) => (playlist?.items.length - 1 === cur ? 0 : prev + 1));
      if (playlist?.items.length === 1) {
         playerRef.current?.seekTo(playlist?.items[0].start, "seconds");
      }
   }, [cur, playlist]);

   const onPressItem = useCallback(
      (idx) => {
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
      setCur((prev) => (cur === 0 ? playlist?.items.length - 1 : prev - 1));
   }, [cur, playlist.items.length]);

   const pressForwardward = useCallback(() => {
      if (playlist.items.length === 1) {
         return;
      }
      setCur((prev) => (playlist?.items.length - 1 === cur ? 0 : prev + 1));
   }, [cur, playlist.items.length]);

   const changePlaylistOrder = useCallback(
      async ({ data, from, to }) => {
         if (from === to) {
            return;
         }
         dispatch(setLoading());
         await changeOrder(playlist.id, data);
         setPlaylist((prev) => ({ id: prev.id, items: data }));
         dispatch(setUnloading());
      },
      [cur, playlist.id]
   );

   const onPressEditVideo = useCallback(
      (index) => {
         setPlaying(false);
         navigation.navigate("videoEdit_play", {
            item: playlist.items[index],
            from: "play",
            playlist: playlist,
         });
      },
      [cur, playlist]
   );

   const onPressDeleteVideo = useCallback(
      async (index, id) => {
         dispatch(setLoading());
         await deleteVideo(id);
         if (playlist.items.length === 1) {
            dispatch(clearThumbnail(playlist.id));
            navigation.navigate("Playlist");
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
         }
         dispatch(setUnloading());
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
         cur={cur}
         vol={vol}
         changeVol={changeVol}
         pressBackward={pressBackward}
         pressForwardward={pressForwardward}
         setPlaying={setPlaying}
         onStart={onStart}
         onEnded={onEnded}
         onProgress={onProgress}
      />
   );
}

export default PlayContainer;

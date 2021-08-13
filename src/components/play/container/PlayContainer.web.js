import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInPlay, setOutPlay } from "../../../modules/isPlay";
import Play from "../view/Play";

function PlayContainer({
   route,
   playing,
   setPlaying,
   playlist,
   setPlaylist,
   playingByPlayer,
   setPlayingByPlayer,
   playerRef,
   togglePlaying,
   cur,
   setCur,
   vol,
   changeVol,
   onPressDeleteVideo,
   onPressEditVideo,
   changePlaylistOrder,
   onPressItem,
   pressForwardward,
   pressBackward,
}) {
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

   const onStart = useCallback(() => {
      playerRef.current?.seekTo(playlist.items[cur]?.start, "seconds");
   }, [playlist.items, cur]);

   const onProgress = useCallback(
      (playedSeconds) => {
         if (playedSeconds >= playlist.items[cur]?.end) {
            setCur((prev) =>
               playlist?.items.length - 1 === prev ? 0 : prev + 1
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
      setCur((prev) => (playlist?.items.length - 1 === prev ? 0 : prev + 1));
      if (playlist?.items.length === 1) {
         playerRef.current?.seekTo(playlist?.items[0].start, "seconds");
      }
   }, [playlist]);

   return (
      <Play
         onPressItem={onPressItem}
         playlist={playlist}
         changePlaylistOrder={changePlaylistOrder}
         onPressEditVideo={onPressEditVideo}
         onPressDeleteVideo={onPressDeleteVideo}
         playing={playing}
         playingByPlayer={playingByPlayer}
         setPlayingByPlayer={setPlayingByPlayer}
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

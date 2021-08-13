import React, { useCallback, useEffect, useState } from "react";
import Play from "../view/Play";

function PlayContainer({
   route,
   playing,
   setPlaying,
   playingByPlayer,
   setPlayingByPlayer,
   playlist,
   setPlaylist,
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
   // ended 상태가 두번 날라와서 다다음 상태로 넘어가는 걸 막기위한 state
   const [block, setBlock] = useState(false);

   // 수정에서 넘어왔을때.
   useEffect(() => {
      if (!route.params.isCurItem) {
         setPlaying(true);
      }
      setPlaylist(route.params.playlistInput);
   }, [route]);

   const handleEnd = useCallback(() => {
      if (playlist.items.length === 1) {
         playerRef.current?.seekTo(playlist?.items[0].start, true);
      } else {
         setCur((prev) => (prev === playlist.items?.length - 1 ? 0 : prev + 1));
      }
   }, [playlist.items]);

   useEffect(() => {
      const handleLapse = async () => {
         const time = await playerRef.current?.getCurrentTime();
         if (playlist.items[cur]?.end <= time) {
            handleEnd();
         }
      };
      const intervalId = setInterval(handleLapse, 500);
      return () => clearInterval(intervalId);
   }, [cur, playlist.items]);

   const onReady = useCallback(() => {
      playerRef.current?.seekTo(playlist?.items[cur].start, true);
      setBlock(false);
      setPlaying(true);
   }, [cur]);

   const handleStateChange = useCallback(
      (e) => {
         if (e === "ended" && !block) {
            setBlock(true);
            handleEnd();
         } else if (e === "paused") {
            setPlayingByPlayer(false);
         } else if (e === "playing") {
            setPlayingByPlayer(true);
            setPlaying(true);
         }
      },
      [playlist.items, block]
   );

   return (
      <Play
         onPressItem={onPressItem}
         playlist={playlist}
         changePlaylistOrder={changePlaylistOrder}
         onPressEditVideo={onPressEditVideo}
         onPressDeleteVideo={onPressDeleteVideo}
         playing={playing}
         playingByPlayer={playingByPlayer}
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

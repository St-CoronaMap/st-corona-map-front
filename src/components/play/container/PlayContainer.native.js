import React, { useCallback, useEffect, useState } from "react";
import Play from "../view/Play";

function PlayContainer({
   route,
   playing,
   setPlaying,
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
   const [block, setBlock] = useState(false);
   // 수정에서 넘어왔을때. 새로 다시 받아오지는 않음.
   useEffect(() => {
      if (!route.params.isCurItem) {
         setPlaying(true);
      }
      setPlaylist(route.params.playlistInput);
   }, [route]);

   const onReady = useCallback(() => {
      setBlock(false);
      setPlaying(false);
      setPlaying(true);
   }, []);

   const handleStateChange = useCallback(
      (e) => {
         if (e === "ended" && !block) {
            setBlock(true);
            setCur((prev) =>
               prev === playlist.items?.length - 1 ? 0 : prev + 1
            );
            if (playlist?.items.length === 1) {
               playerRef.current?.seekTo(playlist?.items[0].start, true);
            }
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

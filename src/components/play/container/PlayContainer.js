import React, { useCallback, useRef, useState } from "react";
import Play from "../view/Play";

function PlayContainer({ playlist }) {
   const [playing, setPlaying] = useState(true);
   const playerRef = useRef();
   const [cur, setCur] = useState(0);
   const [vol, setVol] = useState(80);

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
            if (cur === playlist.items.length - 1) {
               setCur(0);
               if (playlist.items.length === 1) {
                  setPlaying(true);
                  playerRef.current?.seekTo(playlist.items[0].lapse[0], true);
               }
            } else {
               setCur((prev) => prev + 1);
            }
         }
      },
      [cur]
   );
   const onPressItem = useCallback(
      (item, idx) => {
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
      if (playlist.items.length === 1) {
         return;
      }
      setPlaying(false);
      if (cur === 0) {
         setCur(playlist.items.length - 1);
      } else {
         setCur((prev) => prev - 1);
      }
   }, [cur]);
   const pressForwardward = useCallback(() => {
      if (playlist.items.length === 1) {
         return;
      }
      setPlaying(false);
      if (cur === playlist.items.length - 1) {
         setCur(0);
      } else {
         setCur((prev) => prev + 1);
      }
   }, [cur]);
   return (
      <Play
         onPressItem={onPressItem}
         playlist={playlist}
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

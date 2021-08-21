import React, { useCallback } from "react";
import VideoEdit from "../view/VideoEdit";
import { copilot } from "react-native-copilot";

function VideoEditFromPlay({
   item,
   playing,
   playingByPlayer,
   setPlayingByPlayer,
   playerRef,
   lapse,
   endTime,
   selectedLapsed,
   loaded,
   setPlaying,
   checkItem,
   setLapse,
   togglePlaying,
   volumneChange,
   vol,
   onReady,
   lapseLowCounter,
   lapseHighCounter,
   onSelectLapse,
}) {
   const handleValueChange = useCallback(([low, high]) => {
      if (low < high) {
         setLapse((prev) => {
            if (low != prev[0]) {
               playerRef.current?.seekTo(low, "seconds");
            } else if (high != prev[1]) {
               playerRef.current?.seekTo(high, "seconds");
            }
            return [low, high];
         });
      }
   }, []);

   const onStart = useCallback(() => {
      playerRef.current?.seekTo(selectedLapsed[0], "seconds");
   }, [selectedLapsed]);

   const handleOnProgress = useCallback(
      (playedSeconds, cur) => {
         if (
            playedSeconds <= selectedLapsed[1] &&
            selectedLapsed[1] <= playedSeconds + 1
         ) {
            playerRef.current?.seekTo(selectedLapsed[0], "seconds");
         }
      },
      [selectedLapsed]
   );

   return (
      <VideoEdit
         item={item}
         playing={playing}
         playingByPlayer={playingByPlayer}
         setPlayingByPlayer={setPlayingByPlayer}
         playerRef={playerRef}
         lapse={lapse}
         handleValueChange={handleValueChange}
         endTime={endTime}
         selectedLapsed={selectedLapsed}
         loaded={loaded}
         setPlaying={setPlaying}
         onSelectLapse={onSelectLapse}
         checkItem={checkItem}
         lapseLowCounter={lapseLowCounter}
         lapseHighCounter={lapseHighCounter}
         handleOnProgress={handleOnProgress}
         onStart={onStart}
         togglePlaying={togglePlaying}
         volumneChange={volumneChange}
         vol={vol}
         onReady={onReady}
      />
   );
}

export default copilot()(VideoEditFromPlay);

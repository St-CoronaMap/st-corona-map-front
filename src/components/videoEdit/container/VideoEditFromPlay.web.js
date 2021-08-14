import React, { useCallback } from "react";
import VideoEdit from "../view/VideoEdit";
import { copilot } from "react-native-copilot";

function VideoEditFromPlay({
   navigation,
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
   setSelectedLapsed,
   checkItem,
   setLapse,
   togglePlaying,
   volumneChange,
   vol,
   onReady,
}) {
   let count = 0,
      saveLow = 0;
   const handleValueChange = useCallback(([low, high]) => {
      if (count >= 1) {
         if (low < high) {
            setLapse([low, high]);

            if (low != saveLow) playerRef.current?.seekTo(low, "seconds");
            else playerRef.current?.seekTo(high, "seconds");
            saveLow = low;
         }
      } else if (count < 3) {
         count++;
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

   const lapseLowCounter = useCallback((v) => {
      playerRef.current?.seekTo(v, "seconds");
      setLapse((prev) => [v, prev[1]]);
   }, []);
   const lapseHighCounter = useCallback((v) => {
      playerRef.current?.seekTo(v, "seconds");
      setLapse((prev) => [prev[0], v]);
   }, []);

   const onSelectLapse = useCallback(() => {
      setSelectedLapsed(lapse);
      playerRef.current?.seekTo(lapse[0], "seconds");
   }, [lapse]);

   return (
      <VideoEdit
         item={item}
         playing={playing}
         playingByPlayer={playingByPlayer}
         setPlayingByPlayer={setPlayingByPlayer}
         playerRef={playerRef}
         navigation={navigation}
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

import React, { useCallback } from "react";
import { copilot } from "react-native-copilot";
import VideoEdit from "../view/VideoEdit";

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
   const handleValueChange = useCallback((low, high) => {
      if (count >= 3) {
         if (low < high) {
            setLapse([low, high]);

            if (low != saveLow) playerRef.current?.seekTo(low, true);
            else playerRef.current?.seekTo(high, true);
            saveLow = low;
         }
      } else if (count < 3) {
         count++;
      }
   }, []);

   const lapseLowCounter = useCallback((v) => {
      setLapse((prev) => [v, prev[1]]);
   }, []);
   const lapseHighCounter = useCallback((v) => {
      setLapse((prev) => [prev[0], v]);
   }, []);

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
         setSelectedLapsed={setSelectedLapsed}
         checkItem={checkItem}
         lapseLowCounter={lapseLowCounter}
         lapseHighCounter={lapseHighCounter}
         togglePlaying={togglePlaying}
         volumneChange={volumneChange}
         vol={vol}
         onReady={onReady}
      />
   );
}

export default copilot()(VideoEditFromPlay);

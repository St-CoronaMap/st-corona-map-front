import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import VideoEdit from "../view/VideoEdit";
import {
   TourGuideProvider, // Main provider
} from "rn-tourguide";
import CustomTootip from "../../elements/CustomTootip";

function VideoEditContainer({
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
   clearIsFirstV,
   isFirst,
   lapseLowCounter,
   lapseHighCounter,
   onSelectLapse,
}) {
   const isPlay = useSelector(({ isPlay }) => isPlay);

   useEffect(() => {
      setPlaying(false);
   }, [isPlay]);

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

   return (
      <TourGuideProvider
         tooltipComponent={(props) => (
            <CustomTootip
               {...props}
               text={[
                  "슬라이더와 버튼을 통해 원하시는 범위를 조절하시고, \n 적용버튼을 눌러서 확인하세요.",
                  "마음에 드신다면, 이 버튼을 눌러 재생목록에 추가하세요!",
               ]}
            />
         )}>
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
            isFirst={isFirst}
            clearIsFirstV={clearIsFirstV}
         />
      </TourGuideProvider>
   );
}

export default VideoEditContainer;

import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import palette from "../../../lib/styles/palette";
import ControlVideo from "../elements/ControlVideo";
import SecondController from "../elements/SecondController";
import Summary from "../elements/Summary";
import ReactPlayer from "react-player";
const PLAYER_HEIGHT = 300;

function VideoEdit({
   item,
   playerRef,
   playing,
   lapse,
   selectedLapsed,
   endTime,
   loaded,
   setLoaded,
   setPlaying,
   onSelectLapse,
   checkItem,
   lapseLowCounter,
   lapseHighCounter,
   handleValueChange,
   onStart,
   handleOnProgress,
}) {
   const [vol, setVol] = useState(50);

   const onReady = useCallback(() => {
      setLoaded(true);
      setPlaying(true);
   }, []);
   const onEnded = useCallback(() => {
      playerRef.current?.seekTo(selectedLapsed[0], "seconds");
   }, [selectedLapsed[0]]);

   return (
      <View style={styles.container}>
         <View style={styles.playerContainer}>
            <ReactPlayer
               ref={playerRef}
               url={`https://www.youtube.com/watch?v=${item?.videoId}`}
               width={534}
               height={PLAYER_HEIGHT}
               playing={playing}
               volume={vol / 100}
               onReady={onReady}
               onPause={() => setPlaying(false)}
               onPlay={() => setPlaying(true)}
               onEnded={onEnded}
               onProgress={({ playedSeconds }) =>
                  handleOnProgress(playedSeconds)
               }
               onStart={onStart}
            />
         </View>
         <ScrollView>
            <Summary item={item} />
            {loaded && lapse[1] && (
               <SecondController
                  lapse={lapse}
                  lapseLowCounter={lapseLowCounter}
                  lapseHighCounter={lapseHighCounter}
                  handleValueChange={handleValueChange}
                  endTime={endTime}
                  onSelectLapse={onSelectLapse}
                  setPlaying={setPlaying}
               />
            )}
         </ScrollView>
         <ControlVideo
            vol={vol}
            setVol={setVol}
            setPlaying={setPlaying}
            playing={playing}
            checkItem={checkItem}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
      borderColor: palette.deepCoolGray,
      borderLeftWidth: 1,
      borderRightWidth: 1,
   },
   playerContainer: {
      backgroundColor: "black",
      alignItems: "center",
   },
});

export default VideoEdit;

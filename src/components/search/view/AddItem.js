import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { ScrollView } from "react-native-gesture-handler";
import palette from "../../../lib/styles/palette";
import ControlVideo from "../elements/ControlVideo";
import SecondController from "../elements/SecondController";
import Summary from "../elements/Summary";

const PLAYER_HEIGHT = 9 * (Dimensions.get("window").width / 16);

function AddItem({
   item,
   playerRef,
   playing,
   lapse,
   selectedLapsed,
   handleValueChange,
   endTime,
   loaded,
   setLoaded,
   setPlaying,
   setSelectedLapsed,
   checkItem,
   lapseLowCounter,
   lapseHighCounter,
}) {
   const [vol, setVol] = useState(50);

   const onReady = useCallback(() => {
      setLoaded(true);
      setPlaying(true);
   }, []);
   const onChangeState = useCallback(
      (e) => {
         if (e === "paused") {
            setPlaying(false);
         } else if (e === "playing") {
            setPlaying(true);
         } else if (e === "ended") {
            playerRef.current?.seekTo(selectedLapsed[0], true);
            setPlaying(true);
         }
      },
      [selectedLapsed]
   );
   return (
      <View style={styles.container}>
         <View>
            <YoutubePlayer
               ref={playerRef}
               play={playing}
               forceAndroidAutoplay={true}
               height={PLAYER_HEIGHT}
               videoId={item.id}
               onReady={onReady}
               volume={vol}
               onChangeState={onChangeState}
               webViewStyle={{ backgroundColor: "black" }}
               initialPlayerParams={{
                  start: selectedLapsed[0],
                  end: selectedLapsed[1],
                  controls: false,
               }}
            />
         </View>
         <ScrollView>
            <Summary item={item} />
            {loaded && (
               <SecondController
                  lapse={lapse}
                  lapseLowCounter={lapseLowCounter}
                  lapseHighCounter={lapseHighCounter}
                  handleValueChange={handleValueChange}
                  endTime={endTime}
                  setSelectedLapsed={setSelectedLapsed}
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
});

export default AddItem;

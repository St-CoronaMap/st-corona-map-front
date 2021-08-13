import React, { useCallback, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { ScrollView } from "react-native-gesture-handler";
import palette from "../../../lib/styles/palette";
import ControlVideo from "../elements/ControlVideo";
import SecondController from "../elements/SecondController";
import Summary from "../elements/Summary";
const PLAYER_HEIGHT = 9 * (Dimensions.get("window").width / 16);

function VideoEdit({
   item,
   playerRef,
   playing,
   lapse,
   selectedLapsed,
   handleValueChange,
   endTime,
   loaded,
   setPlaying,
   setSelectedLapsed,
   checkItem,
   lapseLowCounter,
   lapseHighCounter,
   playingByPlayer,
   setPlayingByPlayer,
   togglePlaying,
   volumneChange,
   vol,
   onReady,
   onSelectLapse,
}) {
   const onChangeState = useCallback(
      (e) => {
         if (e === "ended") {
            playerRef.current?.seekTo(selectedLapsed[0], true);
         } else if (e === "paused") {
            setPlayingByPlayer(false);
         } else if (e === "playing") {
            setPlayingByPlayer(true);
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
               height={PLAYER_HEIGHT}
               videoId={item?.videoId}
               onReady={onReady}
               volume={vol}
               onChangeState={onChangeState}
               webViewStyle={{ backgroundColor: "black", opacity: 0.99 }}
            />
         </View>
         <ScrollView>
            <Summary item={item} />
            {loaded && lapse[1] ? (
               <SecondController
                  lapse={lapse}
                  lapseLowCounter={lapseLowCounter}
                  lapseHighCounter={lapseHighCounter}
                  handleValueChange={handleValueChange}
                  endTime={endTime}
                  onSelectLapse={onSelectLapse}
               />
            ) : (
               <></>
            )}
         </ScrollView>
         <ControlVideo
            vol={vol}
            playing={playing}
            playingByPlayer={playingByPlayer}
            checkItem={checkItem}
            togglePlaying={togglePlaying}
            volumneChange={volumneChange}
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

export default VideoEdit;

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
   playingByPlayer,
   lapse,
   handleValueChange,
   endTime,
   loaded,
   checkItem,
   lapseLowCounter,
   lapseHighCounter,
   togglePlaying,
   volumneChange,
   vol,
   onReady,
   onSelectLapse,
   onChangeState,
}) {
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
            {loaded && endTime ? (
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

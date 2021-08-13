import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import palette from "../../../lib/styles/palette";
import {
   CONTROLBAR_HEIGHT,
   HEADERNAME_HEIGHT,
   WINDOW_HEIGHT,
} from "../../../lib/styles/variables";
import ControlBar from "../elements/ControlBar";
import VideoList from "../elements/VideoList";
import ReactPlayer from "react-player";
const PLAYER_HEIGHT = 300;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
   },
   playerContainer: {
      backgroundColor: "black",
      alignItems: "center",
   },
});

function Play({
   playlist,
   changePlaylistOrder,
   onPressEditVideo,
   onPressDeleteVideo,
   playerRef,
   playing,
   cur,
   togglePlaying,
   onPressItem,
   changeVol,
   vol,
   pressBackward,
   pressForwardward,
   setPlaying,
   onStart,
   onEnded,
   onProgress,
   playingByPlayer,
   setPlayingByPlayer,
}) {
   const youtubePlayerWrap = (cur) => {
      return (
         <ReactPlayer
            ref={playerRef}
            url={`https://www.youtube.com/watch?v=${playlist.items[cur]?.videoId}`}
            width={534}
            height={PLAYER_HEIGHT}
            playing={playing}
            volume={vol / 100}
            controls={true}
            onStart={onStart}
            onPause={() => {
               setPlayingByPlayer(false);
            }}
            onPlay={() => {
               setPlayingByPlayer(true);
               setPlaying(true);
            }}
            onProgress={({ playedSeconds }) => onProgress(playedSeconds)}
            onEnded={onEnded}
         />
      );
   };
   return (
      <View style={styles.container}>
         <View style={styles.playerContainer}>{youtubePlayerWrap(cur)}</View>
         <View
            style={{
               height:
                  WINDOW_HEIGHT * 0.95 -
                  PLAYER_HEIGHT -
                  CONTROLBAR_HEIGHT -
                  HEADERNAME_HEIGHT -
                  50 -
                  Math.random(),
            }}>
            <ScrollView>
               <VideoList
                  playlist={playlist}
                  changePlaylistOrder={changePlaylistOrder}
                  onPressEditVideo={onPressEditVideo}
                  onPressDeleteVideo={onPressDeleteVideo}
                  onPressItem={onPressItem}
                  cur={cur}
               />
            </ScrollView>
         </View>
         <ControlBar
            vol={vol}
            changeVol={changeVol}
            togglePlaying={togglePlaying}
            pressBackward={pressBackward}
            pressForwardward={pressForwardward}
            playing={playing}
            playingByPlayer={playingByPlayer}
         />
      </View>
   );
}

export default Play;

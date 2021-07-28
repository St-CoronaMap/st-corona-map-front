import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
import palette from "../../../lib/styles/palette";
import { YOUTUBE_HEIGHT } from "../../../lib/styles/variables";
import seperateSecond from "../../../lib/utils/seperateSecond";
import ControlBar from "../elements/ControlBar";
import VideoList from "../elements/VideoList";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
   },
});

function Play({
   playlist,
   changePlaylistOrder,
   playerRef,
   playing,
   cur,
   onReady,
   handleStateChange,
   togglePlaying,
   onPressItem,
   changeVol,
   vol,
   pressBackward,
   pressForwardward,
}) {
   const youtubePlayerWrap = (cur) => {
      return (
         <YoutubePlayer
            ref={playerRef}
            play={playing}
            volume={vol}
            forceAndroidAutoplay
            height={YOUTUBE_HEIGHT}
            onReady={onReady}
            webViewStyle={{
               backgroundColor: "black",
               opacity: 0.99,
            }}
            videoId={playlist.items[cur].id}
            onChangeState={handleStateChange}
            initialPlayerParams={{
               start: playlist.items[cur].lapse[0],
               end: playlist.items[cur].lapse[1],
            }}
         />
      );
   };
   return (
      <View style={styles.container}>
         <View>{youtubePlayerWrap(cur)}</View>
         <VideoList
            playlist={playlist}
            changePlaylistOrder={changePlaylistOrder}
            onPressItem={onPressItem}
            cur={cur}
         />
         <ControlBar
            vol={vol}
            changeVol={changeVol}
            togglePlaying={togglePlaying}
            pressBackward={pressBackward}
            pressForwardward={pressForwardward}
            playing={playing}
         />
      </View>
   );
}

export default Play;

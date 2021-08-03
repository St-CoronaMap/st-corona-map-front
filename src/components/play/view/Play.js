import React from "react";
import {
   View,
   StyleSheet,
   Dimensions,
   Text,
   Image,
   Platform,
} from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
import palette from "../../../lib/styles/palette";
import {
   CONTROLBAR_HEIGHT,
   HEADERNAME_HEIGHT,
   WINDOW_HEIGHT,
   YOUTUBE_HEIGHT,
} from "../../../lib/styles/variables";
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
   onPressEditVideo,
   onPressDeleteVideo,
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
            height={YOUTUBE_HEIGHT}
            onReady={onReady}
            webViewStyle={{
               backgroundColor: "black",
               opacity: 0.99,
            }}
            videoId={playlist.items[cur].videoId}
            onChangeState={handleStateChange}
            initialPlayerParams={{
               start: playlist.items[cur].start,
               end: playlist.items[cur].end,
            }}
         />
      );
   };
   return (
      <View style={styles.container}>
         <View>{youtubePlayerWrap(cur)}</View>
         <View
            style={{
               height:
                  WINDOW_HEIGHT -
                  YOUTUBE_HEIGHT -
                  CONTROLBAR_HEIGHT -
                  HEADERNAME_HEIGHT -
                  Math.random(),
            }}>
            <VideoList
               playlist={playlist}
               changePlaylistOrder={changePlaylistOrder}
               onPressEditVideo={onPressEditVideo}
               onPressDeleteVideo={onPressDeleteVideo}
               onPressItem={onPressItem}
               cur={cur}
            />
         </View>
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

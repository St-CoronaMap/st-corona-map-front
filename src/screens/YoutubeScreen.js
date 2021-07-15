import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   player: {
      flex: 1,
   },
   control: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});

const playlist = ["WMweEpGlu_U", "gdZLi9oWNZg", "CuklIb9d3fI"];
const time = [
   { start: 36, end: 45 },
   { start: 65, end: 74 },
   { start: 53, end: 60 },
];

export default function YoutubeScreen() {
   const [playing, setPlaying] = useState(true);
   const playerRef = useRef();
   const [cur, setCur] = useState(0);

   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);

   const handleStateChange = useCallback((e) => {
      if (e === "ended" && cur != playlist.length - 1) {
         setPlaying(false);
         setCur((prev) => prev + 1);
      }
   });
   const youtubePlayerWrap = (cur) => {
      return (
         <YoutubePlayer
            ref={playerRef}
            play={playing}
            forceAndroidAutoplay={true}
            height={400}
            onReady={() => {
               setPlaying(true);
            }}
            videoId={playlist[cur]}
            onChangeState={handleStateChange}
            initialPlayerParams={{
               start: time[cur].start,
               end: time[cur].end,
            }}
         />
      );
   };

   return (
      <View style={styles.container}>
         <View style={styles.player}>{youtubePlayerWrap(cur)}</View>
         <View style={styles.control}>
            <Button
               title={playing ? "pause" : "play"}
               onPress={togglePlaying}
            />
         </View>
      </View>
   );
}

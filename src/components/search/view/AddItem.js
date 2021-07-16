import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

function AddItem({ item, playerRef, playing, togglePlaying }) {
   return (
      <View style={styles.container}>
         <View style={styles.player}>
            <YoutubePlayer
               ref={playerRef}
               play={playing}
               forceAndroidAutoplay={true}
               height={400}
               videoId={item.id}
            />
         </View>
         <View style={styles.control}>
            <Button
               title={playing ? "pause" : "play"}
               onPress={togglePlaying}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   player: {
      flex: 1,
   },
   control: {
      flex: 4,
      justifyContent: "center",
      alignItems: "center",
   },
});

export default AddItem;

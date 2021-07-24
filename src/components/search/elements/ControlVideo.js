import Slider from "@react-native-community/slider";
import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";

function ControlVideo({ vol, setVol, setPlaying, playing, checkItem }) {
   const volumneChange = useCallback((v) => setVol(v), []);
   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);
   return (
      <View style={styles.control}>
         <Slider
            style={{ width: 120 }}
            minimumValue={0}
            maximumValue={100}
            value={vol}
            thumbTintColor={palette.blackBerry}
            minimumTrackTintColor={palette.blackBerry}
            maximumTrackTintColor={palette.lightPink}
            onValueChange={volumneChange}
         />
         <View style={styles.buttonContainer}>
            <Button
               icon={{
                  name: `${playing ? "pause" : "play"}`,
                  type: "font-awesome",
                  color: palette.blackBerry,
               }}
               onPress={togglePlaying}
               containerStyle={styles.pauseButton}
               buttonStyle={styles.pauseButton}
               raised
            />
         </View>
         <View style={styles.buttonContainer}>
            <Button
               icon={{
                  name: "plus",
                  type: "font-awesome",
               }}
               containerStyle={styles.pauseButton}
               buttonStyle={styles.pauseButton}
               raised
               onPress={checkItem}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   control: {
      position: "absolute",
      bottom: 0,
      height: 80,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: palette.redRose,
   },
   pauseButton: {
      width: 60,
      height: 60,
      borderRadius: 35,
      backgroundColor: palette.deepRedRose,
   },
   buttonContainer: {
      width: 120,
      justifyContent: "flex-end",
      alignItems: "center",
   },
});

export default React.memo(ControlVideo);

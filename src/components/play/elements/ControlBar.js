import React from "react";
import { StyleSheet, View, Text } from "react-native";
import palette from "../../../lib/styles/palette";
import Slider from "@react-native-community/slider";
import { Button } from "react-native-elements";
import { CONTROLBAR_HEIGHT } from "../../../lib/styles/variables";

function ControlBar({
   vol,
   changeVol,
   togglePlaying,
   pressBackward,
   pressForwardward,
   playing,
}) {
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
            onValueChange={changeVol}
         />
         <View
            style={{
               width: 120,
               justifyContent: "flex-end",
               alignItems: "center",
            }}>
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
         <View style={styles.forwardBackContainer}>
            <Button
               icon={{
                  name: "backward",
                  type: "font-awesome",
                  color: palette.blackBerry,
               }}
               containerStyle={styles.forwardBackButton}
               buttonStyle={styles.forwardBackButton}
               raised
               onPress={pressBackward}
            />
            <Button
               icon={{
                  name: "forward",
                  type: "font-awesome",
                  color: palette.blackBerry,
               }}
               containerStyle={styles.forwardBackButton}
               buttonStyle={styles.forwardBackButton}
               raised
               onPress={pressForwardward}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   control: {
      position: "absolute",
      bottom: 0,
      height: CONTROLBAR_HEIGHT,
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
   forwardBackContainer: {
      width: 120,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   forwardBackButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: palette.deepRedRose,
   },
});

export default React.memo(ControlBar);

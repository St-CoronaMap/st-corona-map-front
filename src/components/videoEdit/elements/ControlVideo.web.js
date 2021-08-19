import Slider from "@react-native-community/slider";
import React, { useCallback } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { TourGuideZoneByPosition } from "rn-tourguide";
import palette from "../../../lib/styles/palette";
import TourGuide from "./TourGuide";

function ControlVideo({
   vol,
   volumneChange,
   playing,
   checkItem,
   playingByPlayer,
   togglePlaying,
}) {
   return (
      <View style={styles.control}>
         <TourGuideZoneByPosition
            zone={2}
            isTourGuide
            right={(Dimensions.get("window").width - 600) / 2 - 440}
            bottom={168}
            width={120}
            height={80}
         />
         <View style={styles.buttonContainer}>
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
         </View>
         <View style={styles.buttonContainer}>
            <Button
               icon={{
                  name: `${playing && playingByPlayer ? "pause" : "play"}`,
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

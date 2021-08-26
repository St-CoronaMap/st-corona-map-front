import React from "react";
import { StyleSheet, View, Text } from "react-native";
import palette from "../../../lib/styles/palette";
import { Button } from "react-native-elements";
import {
   CONTROLBAR_HEIGHT,
   IS_MOBILE_WEB,
} from "../../../lib/styles/variables";
import ForwardBackButton from "./ForwardBackButton";
import VolumeSlider from "./VolumeSlider";

function ControlBar({
   vol,
   changeVol,
   togglePlaying,
   pressBackward,
   pressForwardward,
   playing,
   playingByPlayer,
}) {
   return (
      <View style={styles.control}>
         <VolumeSlider vol={vol} changeVol={changeVol} />
         <View style={styles.pauseButtonCotnainer}>
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
         <ForwardBackButton
            pressBackward={pressBackward}
            pressForwardward={pressForwardward}
         />
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
   pauseButtonCotnainer: {
      width: IS_MOBILE_WEB ? "30%" : 120,
      justifyContent: "flex-end",
      alignItems: "center",
   },
   pauseButton: {
      width: 60,
      height: 60,
      borderRadius: 35,
      backgroundColor: palette.deepRedRose,
   },
});

export default React.memo(ControlBar);

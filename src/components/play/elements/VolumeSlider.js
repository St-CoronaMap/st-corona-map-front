import React from "react";
import palette from "../../../lib/styles/palette";
import Slider from "@react-native-community/slider";
import { View } from "react-native";

function VolumeSlider({ vol, changeVol }) {
   return (
      <View
         style={{
            width: 120,
            justifyContent: "flex-end",
            alignItems: "center",
         }}>
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
      </View>
   );
}

export default React.memo(VolumeSlider);

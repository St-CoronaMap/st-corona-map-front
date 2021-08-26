import React from "react";
import palette from "../../../lib/styles/palette";
import Slider from "@react-native-community/slider";
import { View } from "react-native";
import { IS_MOBILE_WEB } from "../../../lib/styles/variables";

function VolumeSlider({ vol, changeVol }) {
   return (
      <View
         style={{
            width: IS_MOBILE_WEB ? "30%" : 120,
            justifyContent: "flex-end",
            alignItems: "center",
         }}>
         <Slider
            style={{ width: "100%" }}
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

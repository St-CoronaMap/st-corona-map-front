import React from "react";
import palette from "../../../lib/styles/palette";
import Slider from "@react-native-community/slider";

function VolumeSlider({ vol, changeVol }) {
   return (
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
   );
}

export default React.memo(VolumeSlider);

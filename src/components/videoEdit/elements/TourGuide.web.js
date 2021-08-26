import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import {
   TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
} from "rn-tourguide";
import {
   CONTROLBAR_HEIGHT,
   IS_MOBILE_WEB,
   WEB_COPILOT_BOTTOM,
   WEB_COPLIOT_RIGHT_OFFSET,
   WIDTH,
} from "../../../lib/styles/variables";

export function TourGuide_Seconds() {
   return (
      <TourGuideZoneByPosition
         zone={1}
         isTourGuide
         right={(WIDTH - WEB_COPLIOT_RIGHT_OFFSET) / 2}
         bottom={WEB_COPILOT_BOTTOM - 103}
         width={WIDTH}
         height={500}
      />
   );
}

export function TourGuide_ControllBar() {
   return (
      <TourGuideZoneByPosition
         zone={2}
         isTourGuide
         right={
            (WIDTH - WEB_COPLIOT_RIGHT_OFFSET) / 2 -
            (IS_MOBILE_WEB ? WIDTH * 0.7 : 440)
         }
         bottom={WEB_COPILOT_BOTTOM - 3}
         width={120}
         height={CONTROLBAR_HEIGHT}
      />
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

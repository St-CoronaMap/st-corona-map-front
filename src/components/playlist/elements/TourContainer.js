import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import {
   TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
   useTourGuideController, // hook to start, etc.
} from "rn-tourguide";
import {
   IS_MOBILE_WEB,
   WEB_COPILOT_BOTTOM,
   WIDTH,
} from "../../../lib/styles/variables";

function TourContainer({ length, isFirst, clearIsFirstP }) {
   const {
      start, // a function to start the tourguide
      canStart,
   } = useTourGuideController();

   useEffect(() => {
      if (isFirst && canStart && length >= 1) {
         start();
         clearIsFirstP();
      }
   }, [canStart, length, isFirst]);

   return (
      <TourGuideZoneByPosition
         zone={1}
         isTourGuide
         bottom={WEB_COPILOT_BOTTOM}
         right={
            (Dimensions.get("window").width - IS_MOBILE_WEB ? WIDTH : 600) / 2
         }
         width={Dimensions.get("window").width}
         height={240}
      />
   );
}

const styles = StyleSheet.create({
   container: {
      width: 600,
      position: "absolute",
      left: -300,
   },
});

export default TourContainer;

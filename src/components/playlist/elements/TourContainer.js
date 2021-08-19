import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View, Text } from "react-native";

import {
   TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
   useTourGuideController, // hook to start, etc.
} from "rn-tourguide";

function TourContainer({ length, isFirst }) {
   const {
      start, // a function to start the tourguide
      canStart,
   } = useTourGuideController();

   useEffect(() => {
      if (isFirst && canStart && length >= 1) start();
   }, [canStart, length, isFirst]);

   return (
      <TourGuideZoneByPosition
         zone={1}
         isTourGuide
         bottom={120}
         right={(Dimensions.get("window").width - 600) / 2}
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

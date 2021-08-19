import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import {
   TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
} from "rn-tourguide";

function TourGuide() {
   return (
      <>
         <TourGuideZoneByPosition
            zone={1}
            isTourGuide
            right={(Dimensions.get("window").width - 600) / 2}
            bottom={65}
            width={Dimensions.get("window").width}
            height={"100%"}
            text="슬라이더와 버튼을 통해 원하시는 범위를 조절하세요."
         />
      </>
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

export default TourGuide;

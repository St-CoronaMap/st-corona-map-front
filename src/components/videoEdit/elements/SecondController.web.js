import React from "react";
import { StyleSheet, View, Text } from "react-native";
import seperateSecond from "../../../lib/utils/seperateSecond";
import {
   CustomCounterLeft,
   CustomCounterRight,
} from "../../elements/CustomCounter";

import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import { RangeSlider } from "@sharcoux/slider";
import {
   boldFontStyle,
   fontStyle,
} from "../../../lib/styles/stylesByPlatform.js";
import I18n from "i18n-js";

function SecondController({
   lapse,
   lapseLowCounter,
   lapseHighCounter,
   handleValueChange,
   endTime,
   onSelectLapse,
}) {
   return (
      <View style={styles.lapseContainer}>
         <View>
            <View style={styles.sliderContainer}>
               <View style={{ height: 30 }}>
                  <RangeSlider
                     range={lapse}
                     minimumValue={0}
                     maximumValue={endTime}
                     minimumRange={1}
                     step={1}
                     onValueChange={handleValueChange}
                     inboundColor={palette.redRose}
                     outboundColor="#7f7f7f"
                     thumbStyle={styles.thumbStyle}
                     thumbSize={24}
                  />
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                  }}>
                  <Text style={fontStyle}>{seperateSecond(lapse[0])}</Text>
                  <Text style={fontStyle}>{seperateSecond(lapse[1])}</Text>
               </View>
            </View>
            <View style={styles.counterButtonContainer}>
               <CustomCounterLeft
                  value={lapse[0]}
                  min={0}
                  max={lapse[1] - 1}
                  onPress={lapseLowCounter}
               />
               <CustomCounterRight
                  value={lapse[1]}
                  min={lapse[0] + 1}
                  max={endTime}
                  onPress={lapseHighCounter}
               />
            </View>
         </View>
         <View
            style={{
               width: "100%",
               alignItems: "center",
               marginTop: 10,
               paddingBottom: 10,
            }}>
            <Button
               title={I18n.t("apply")}
               containerStyle={styles.applyButtonContainer}
               buttonStyle={styles.applyButton}
               titleStyle={styles.applyButtonTitle}
               type="outline"
               onPress={onSelectLapse}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   lapseContainer: {
      alignContent: "center",
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingTop: 10,
      paddingBottom: "10%",
   },
   counterButtonContainer: {
      flexDirection: "row",
      marginTop: 10,
      alignItems: "center",
      justifyContent: "space-evenly",
   },
   sliderContainer: {
      flex: 1,
   },
   applyButtonContainer: {
      width: 100,
      marginTop: 10,
      backgroundColor: "white",
      borderWidth: 0,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      shadowOffset: {
         width: 0,
         height: 1,
      },
   },
   applyButton: {
      backgroundColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: palette.blackBerry,
   },
   applyButtonTitle: {
      color: palette.blackBerry,
      ...boldFontStyle,
   },
   thumbStyle: {
      width: 12 * 2,
      height: 12 * 2,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: palette.blackBerry,
      backgroundColor: palette.ivory,
   },
});

export default React.memo(SecondController);

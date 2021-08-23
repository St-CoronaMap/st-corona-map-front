import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import seperateSecond from "../../../lib/utils/seperateSecond";
import {
   CustomCounterLeft,
   CustomCounterRight,
} from "../../elements/CustomCounter";
import RangeSlider from "rn-range-slider";

import Label from "../../elements/Label";
import Notch from "../../elements/Notch";
import Rail from "../../elements/Rail";
import RailSelected from "../../elements/RailSelected";
import Thumb from "../../elements/Thumb";
import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";

import { walkthroughable, CopilotStep } from "react-native-copilot";
import I18n from "i18n-js";

const CopilotView = walkthroughable(View);

function SecondController({
   lapse,
   lapseLowCounter,
   lapseHighCounter,
   handleValueChange,
   endTime,
   onSelectLapse,
}) {
   const renderThumb = useCallback(() => <Thumb />, []);
   const renderRail = useCallback(() => <Rail />, []);
   const renderRailSelected = useCallback(() => <RailSelected />, []);
   const renderLabel = useCallback((value) => <Label text={value} />, []);
   const renderNotch = useCallback(() => <Notch />, []);

   return (
      <View style={styles.lapseContainer}>
         <CopilotStep
            text={I18n.t("videoEdit_step_1")}
            order={1}
            name="lapse_controll">
            <CopilotView>
               <View style={styles.sliderContainer}>
                  <RangeSlider
                     min={0}
                     floatingLabel
                     max={endTime === 0 ? 10 : endTime}
                     low={lapse[0]}
                     high={lapse[1]}
                     step={1}
                     renderThumb={renderThumb}
                     renderRail={renderRail}
                     renderRailSelected={renderRailSelected}
                     renderLabel={renderLabel}
                     renderNotch={renderNotch}
                     onValueChanged={handleValueChange}
                  />
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                     }}>
                     <Text>{seperateSecond(lapse[0])}</Text>
                     <Text>{seperateSecond(lapse[1])}</Text>
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
            </CopilotView>
         </CopilotStep>

         <CopilotStep
            text={I18n.t("videoEdit_step_2")}
            order={2}
            name="apply_button">
            <CopilotView
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
            </CopilotView>
         </CopilotStep>
      </View>
   );
}

const styles = StyleSheet.create({
   counterButtonContainer: {
      flexDirection: "row",
      marginTop: 10,
      alignItems: "center",
      justifyContent: "space-evenly",
   },
   sliderContainer: {
      flex: 1,
   },
   lapseContainer: {
      flex: 6,
      alignContent: "center",
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingTop: 10,
      paddingBottom: "10%",
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
      elevation: 2,
   },
   applyButton: {
      backgroundColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: palette.blackBerry,
   },
   applyButtonTitle: {
      color: palette.blackBerry,
   },
});

export default React.memo(SecondController);

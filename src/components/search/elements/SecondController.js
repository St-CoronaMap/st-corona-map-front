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

const CopilotView = walkthroughable(View);

function SecondController({
   lapse,
   lapseLowCounter,
   lapseHighCounter,
   handleValueChange,
   endTime,
   setSelectedLapsed,
   setPlaying,
}) {
   const renderThumb = useCallback(() => <Thumb />, []);
   const renderRail = useCallback(() => <Rail />, []);
   const renderRailSelected = useCallback(() => <RailSelected />, []);
   const renderLabel = useCallback((value) => <Label text={value} />, []);
   const renderNotch = useCallback(() => <Notch />, []);

   return (
      <View style={styles.lapseContainer}>
         <CopilotStep
            text="슬라이더와 버튼을 통해 원하시는 범위를 조절하세요."
            order={1}
            name="lapse_controll">
            <CopilotView>
               <View style={styles.sliderContainer}>
                  <RangeSlider
                     min={0}
                     floatingLabel
                     max={endTime}
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
            text="조절을 하신 후, 이 버튼을 누르셔서 확인하세요."
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
                  title="적용"
                  containerStyle={styles.applyButtonContainer}
                  buttonStyle={styles.applyButton}
                  titleStyle={styles.applyButtonTitle}
                  type="outline"
                  onPress={() => {
                     setSelectedLapsed(lapse);
                     setPlaying(false);
                  }}
                  raised
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
   },
   applyButton: {
      backgroundColor: palette.redRose,
   },
   applyButtonTitle: {
      color: palette.blackBerry,
   },
});

export default React.memo(SecondController);

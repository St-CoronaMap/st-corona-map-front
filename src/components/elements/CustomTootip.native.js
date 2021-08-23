import I18n from "i18n-js";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../lib/styles/palette";

export const STEP_NUMBER_RADIUS = 14;
export const STEP_NUMBER_DIAMETER = STEP_NUMBER_RADIUS * 2;
export const ZINDEX = 100;
export const MARGIN = 13;
export const OFFSET_WIDTH = 4;
export const ARROW_SIZE = 6;

const styles = StyleSheet.create({
   tooltipContainer: {
      flex: 1,
   },
   button: {
      padding: 10,
   },
   buttonText: {
      color: palette.coral,
   },
   bottomBar: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "flex-end",
   },
});
const CustomTootip = ({
   isFirstStep,
   isLastStep,
   handleNext,
   handlePrev,
   handleStop,
   currentStep,
}) => (
   <View>
      <View style={styles.tooltipContainer}>
         <Text testID="stepDescription">{currentStep.text}</Text>
      </View>
      <View style={[styles.bottomBar]}>
         {!isLastStep ? (
            <Button
               buttonStyle={styles.button}
               titleStyle={styles.buttonText}
               type="clear"
               title={I18n.t("close")}
               onPress={handleStop}
            />
         ) : null}
         {!isFirstStep ? (
            <Button
               buttonStyle={styles.button}
               titleStyle={styles.buttonText}
               type="clear"
               title={I18n.t("prev")}
               onPress={handlePrev}
            />
         ) : null}
         {!isLastStep ? (
            <Button
               buttonStyle={styles.button}
               titleStyle={styles.buttonText}
               type="clear"
               title={I18n.t("next")}
               onPress={handleNext}
            />
         ) : (
            <Button
               buttonStyle={styles.button}
               titleStyle={styles.buttonText}
               type="clear"
               title={I18n.t("close")}
               onPress={handleStop}
            />
         )}
      </View>
   </View>
);

export default CustomTootip;

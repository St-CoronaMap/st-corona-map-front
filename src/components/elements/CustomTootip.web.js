import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../lib/styles/palette";

export const STEP_NUMBER_RADIUS = 14;
export const STEP_NUMBER_DIAMETER = STEP_NUMBER_RADIUS * 2;
export const ZINDEX = 100;
export const MARGIN = 13;
export const OFFSET_WIDTH = 4;
export const ARROW_SIZE = 6;

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      padding: 20,
      paddingBottom: 0,
   },
   tooltipContainer: {
      flex: 1,
   },
   button: {
      padding: 10,
   },
   buttonText: {
      color: palette.coral,
      fontWeight: "600",
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
   text,
}) => {
   return (
      <View style={styles.container}>
         <View style={styles.tooltipContainer}>
            <Text testID="stepDescription">{text[currentStep.order - 1]}</Text>
         </View>
         <View style={[styles.bottomBar]}>
            {!isLastStep ? (
               <Button
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  type="clear"
                  title={"끝"}
                  onPress={handleStop}
               />
            ) : null}
            {!isFirstStep ? (
               <Button
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  type="clear"
                  title={"이전"}
                  onPress={handlePrev}
               />
            ) : null}
            {!isLastStep ? (
               <Button
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  type="clear"
                  title={"다음"}
                  onPress={handleNext}
               />
            ) : (
               <Button
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  type="clear"
                  title={"끝"}
                  onPress={handleStop}
               />
            )}
         </View>
      </View>
   );
};

export default CustomTootip;

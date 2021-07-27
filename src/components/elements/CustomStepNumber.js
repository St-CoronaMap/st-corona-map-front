import React from "react";
import { View, Text, StyleSheet } from "react-native";
import palette from "../../lib/styles/palette";

const styles = StyleSheet.create({
   stepNumber: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderRadius: 14,
      borderColor: "#FFFFFF",
      backgroundColor: palette.redRose,
   },
   stepNumberText: {
      fontSize: 10,
      backgroundColor: "transparent",
      color: "#FFFFFF",
   },
});

const CustomStepNumber = ({ currentStepNumber }) => (
   <View style={styles.stepNumber}>
      <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
   </View>
);

export default CustomStepNumber;

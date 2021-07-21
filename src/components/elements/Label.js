import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import palette from "../../lib/styles/palette";
import seperateSecond from "../../lib/utils/seperateSecond";

const Label = ({ text, ...restProps }) => {
   return (
      <View style={styles.root} {...restProps}>
         <Text style={styles.text}>{seperateSecond(text)}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   root: {
      alignItems: "center",
      padding: 8,
      backgroundColor: palette.ivory,
      borderRadius: 4,
      borderColor: palette.blackBerry,
      borderWidth: 1,
   },
   text: {
      fontSize: 16,
      color: palette.blackBerry,
   },
});

export default memo(Label);

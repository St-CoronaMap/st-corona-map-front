import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import palette from "../../lib/styles/palette";

const RailSelected = () => {
   return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
   root: {
      height: 4,
      backgroundColor: palette.redRose,
      borderRadius: 2,
   },
});

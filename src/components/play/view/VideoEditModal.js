import React from "react";
import { StyleSheet, View, Text } from "react-native";

function VideoEditModal() {
   return (
      <View style={styles.container}>
         <Text>VideoEditModal Screen</Text>
      </View>
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

export default VideoEditModal;

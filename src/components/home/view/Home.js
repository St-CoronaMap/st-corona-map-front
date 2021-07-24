import React from "react";
import { StyleSheet, View, Text } from "react-native";
import palette from "../../../lib/styles/palette";

function Home({ navigation }) {
   return (
      <View style={styles.container}>
         <View style={styles.content}>
            <Text>Home Screen</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 5,
      alignItems: "center",
      justifyContent: "center",
   },
   login: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
});

export default Home;

import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

function Loading({ loading }) {
   return (
      <>
         {loading ? (
            <View style={styles.container}>
               <LottieView
                  source={require("../../lib/styles/loading.json")}
                  autoPlay
                  loop
                  colorFilters={[
                     {
                        keypath: "button",
                        color: "#Ffffff",
                     },
                     {
                        keypath: "Sending Loader",
                        color: "#Ffffff",
                     },
                  ]}
                  style={{ width: 200, height: 200 }}
               />
            </View>
         ) : (
            <></>
         )}{" "}
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 10,
      backgroundColor: "rgba(0,0,0,0.1)",
      justifyContent: "center",
      alignItems: "center",
   },
});

export default Loading;

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import { IS_MOBILE_WEB } from "../../../lib/styles/variables";

function ForwardBackButton({ pressBackward, pressForwardward }) {
   return (
      <View style={styles.forwardBackContainer}>
         <Button
            icon={{
               name: "backward",
               type: "font-awesome",
               color: palette.blackBerry,
            }}
            containerStyle={styles.forwardBackButton}
            buttonStyle={styles.forwardBackButton}
            raised
            onPress={pressBackward}
         />
         <Button
            icon={{
               name: "forward",
               type: "font-awesome",
               color: palette.blackBerry,
            }}
            containerStyle={styles.forwardBackButton}
            buttonStyle={styles.forwardBackButton}
            raised
            onPress={pressForwardward}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   forwardBackContainer: {
      width: IS_MOBILE_WEB ? "30%" : 120,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   forwardBackButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: palette.deepRedRose,
   },
});

export default React.memo(ForwardBackButton);

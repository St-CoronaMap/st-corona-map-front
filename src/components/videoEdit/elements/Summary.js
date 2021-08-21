import React from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import palette from "../../../lib/styles/palette";

function Summary({ item }) {
   return (
      <View style={styles.summaryContainer}>
         <View style={styles.summaryBorder}>
            <Text style={styles.text}>{item?.title}</Text>
            <View style={styles.channelContainer}>
               <Image
                  source={{ uri: item?.channelAvatar }}
                  style={styles.image}
                  transition
               />
               <Text>
                  {"\t"}
                  {item?.channelTitle}
               </Text>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   summaryBorder: {
      paddingBottom: 10,
      borderBottomWidth: 0.5,
      borderColor:
         Platform.OS === "web" ? palette.deepCoolGray : palette.blackBerry,
      borderRadius: Platform.OS === "web" ? 0 : 20,
   },
   text: {
      padding: 10,
      fontSize: 20,
      fontWeight: "500",
   },
   channelContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 10,
      paddingBottom: Platform.OS === "web" ? 5 : 10,
   },
   image: { width: 40, height: 40, borderRadius: 20 },
});
export default React.memo(Summary);

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function Summary({ item }) {
   return (
      <View style={styles.summaryContainer}>
         <View style={styles.summaryBorder}>
            <Text style={{ padding: 10, fontSize: 20 }}>{item.title}</Text>
            <View
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 10,
                  paddingBottom: 10,
               }}>
               <Image
                  source={{ uri: item.channelAvatar }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  transition
               />
               <Text>
                  {"\t"}
                  {item.channelTitle}
               </Text>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   summaryContainer: {
      flex: 3,
   },
   summaryBorder: {
      paddingBottom: 10,
      borderBottomWidth: 0.5,
      borderRadius: 20,
   },
});

export default React.memo(Summary);

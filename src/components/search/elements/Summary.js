import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Summary({ item }) {
   return (
      <View style={styles.summaryContainer}>
         <View style={styles.summaryBorder}>
            <Text style={{ padding: 10, fontSize: 20 }}>{item.title}</Text>
            <Text style={{ padding: 10, paddingBottom: 0 }}>
               {item.channelTitle}
               {"\t\t"}
               {item.publishedAt.slice(0, 10)}
            </Text>
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

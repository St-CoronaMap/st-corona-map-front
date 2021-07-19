import React from "react";
import {
   StyleSheet,
   View,
   Text,
   Dimensions,
   TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from "react-native-elements";
function Playlist({ playlist, listPressCallback, onPressVisible }) {
   return (
      <View style={styles.topView}>
         <ScrollView>
            <View style={styles.container}>
               {playlist?.map((item, idx) => {
                  return (
                     <Card
                        containerStyle={styles.card}
                        wrapperStyle={{ flex: 1 }}>
                        <TouchableOpacity
                           style={styles.cardTouchable}
                           onPress={() => listPressCallback(item)}>
                           <View key={idx} style={{ flex: 1 }}>
                              <View style={styles.cardImageContainer}>
                                 <Card.Image
                                    resizeMode="cover"
                                    source={{
                                       uri: item.items[0]?.thumbnails,
                                    }}
                                    style={styles.thumbnail}
                                 />
                              </View>
                              <View style={styles.cardTitleContainer}>
                                 <Text>{item?.name}</Text>
                              </View>
                           </View>
                        </TouchableOpacity>
                     </Card>
                  );
               })}
            </View>
         </ScrollView>
         <FAB
            placement="right"
            visible
            raised
            containerStyle={styles.fabContainer}
            buttonStyle={styles.fabStyle}
            icon={{ name: "plus", type: "font-awesome" }}
            onPress={onPressVisible}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   topView: {
      flex: 1,
      backgroundColor: "white",
   },
   container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "#fff",
      padding: 50,
      justifyContent: "space-between",
   },
   cardTouchable: {
      width: "100%",
      height: "100%",
   },
   card: {
      width: "40%",
      height: Dimensions.get("screen").width * 0.35,
      padding: 0,
      borderRadius: 30,
   },
   cardImageContainer: {
      flex: 5,
      backgroundColor: "gray",
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
   },
   thumbnail: {
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
   },
   cardTitleContainer: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
   },
   fabContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
   },
   fabStyle: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "red",
   },
});

export default Playlist;

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
import palette from "../../../lib/styles/palette";

function Playlist({ playlist, listPressCallback, onPressVisible }) {
   return (
      <View style={styles.topView}>
         <ScrollView>
            <View style={styles.container}>
               {playlist?.map((item, idx) => {
                  return (
                     <Card
                        key={idx}
                        containerStyle={styles.card}
                        wrapperStyle={{ flex: 1 }}>
                        <TouchableOpacity
                           style={styles.cardTouchable}
                           onPress={() => listPressCallback(item)}>
                           <View style={{ flex: 1 }}>
                              <View style={styles.cardImageContainer}>
                                 <Card.Image
                                    resizeMode="cover"
                                    source={{
                                       uri:
                                          item.items &&
                                          item.items[0]?.thumbnails,
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
      backgroundColor: palette.ivory,
   },
   container: {
      flex: 1,
      padding: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: palette.ivory,
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
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
   },
   cardImageContainer: {
      flex: 6,
      backgroundColor: palette.deepCoolGray,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
   },
   thumbnail: {
      width: "100%",
      height: "100%",
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
   },
   cardTitleContainer: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.ivory,
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
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

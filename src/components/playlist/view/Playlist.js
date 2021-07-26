import React, { useEffect } from "react";
import {
   StyleSheet,
   View,
   Text,
   Dimensions,
   TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB, Icon, Card } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import { walkthroughable, CopilotStep, copilot } from "react-native-copilot";

const CopilotView = walkthroughable(View);

function Playlist({
   playlist,
   listPressCallback,
   onPressVisible,
   onPressVisibleEdit,
   start,
   firstTime,
}) {
   useEffect(() => {
      if (firstTime && playlist.length >= 1) {
         setTimeout(start, 250);
      }
   }, [firstTime, playlist]);

   return (
      <View style={styles.topView}>
         <ScrollView>
            <CopilotStep
               text="상단의 검색을 통해 음악을 추가하고, 재생목록을 완성시키세요!"
               order={1}
               name="playlist">
               <CopilotView style={styles.container}>
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
                                    <Text
                                       style={{
                                          width: "60%",
                                          textAlign: "center",
                                       }}>
                                       {item?.name}
                                    </Text>
                                    <Icon
                                       name="ellipsis-v"
                                       type="font-awesome"
                                       containerStyle={
                                          styles.settingIconContainer
                                       }
                                       iconStyle={styles.settingIcon}
                                       color={palette.deepCoolGray}
                                       onPress={() => onPressVisibleEdit(item)}
                                    />
                                 </View>
                              </View>
                           </TouchableOpacity>
                        </Card>
                     );
                  })}
               </CopilotView>
            </CopilotStep>
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
   settingIconContainer: {
      position: "absolute",
      right: 10,
      width: 30,
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

export default copilot()(Playlist);

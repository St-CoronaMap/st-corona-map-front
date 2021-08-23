import React, { useEffect } from "react";
import {
   StyleSheet,
   View,
   Text,
   Dimensions,
   TouchableOpacity,
   Platform,
   Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB, Icon, Card } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import { walkthroughable, CopilotStep, copilot } from "react-native-copilot";
import CustomTootip from "../../elements/CustomTootip";
import CustomStepNumber from "../../elements/CustomStepNumber";
import I18n from "i18n-js";
import { removeAll } from "../../../lib/api/playlist";

const CopilotView = walkthroughable(View);

function Playlist({
   playlist,
   listPressCallback,
   onPressVisible,
   onPressVisibleEdit,
   start,
   isFirst,
   clearIsFirstP,
}) {
   useEffect(() => {
      if (isFirst && playlist.length >= 1) {
         setTimeout(start, 250);
         clearIsFirstP();
      }
   }, [isFirst, playlist]);
   return (
      <View style={styles.topView}>
         <ScrollView>
            <CopilotStep
               text={I18n.t("playlist_step_1")}
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
                                    <Image
                                       resizeMode="cover"
                                       source={{
                                          uri: item.thumbnail
                                             ? item.thumbnail
                                             : null,
                                       }}
                                       style={styles.thumbnail}
                                    />
                                 </View>
                                 <View style={styles.cardTitleContainer}>
                                    <Text
                                       style={{
                                          width: "60%",
                                          textAlign: "center",
                                          fontWeight: "600",
                                       }}>
                                       {item?.title}
                                    </Text>
                                    {onPressVisibleEdit && (
                                       <Icon
                                          name="ellipsis-v"
                                          type="font-awesome"
                                          containerStyle={
                                             styles.settingIconContainer
                                          }
                                          iconStyle={styles.settingIcon}
                                          color={palette.deepCoolGray}
                                          onPress={() =>
                                             onPressVisibleEdit(item)
                                          }
                                       />
                                    )}
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
         <FAB placement="left" visible raised onPress={removeAll} />
      </View>
   );
}

export default copilot({
   tooltipComponent: CustomTootip,
   stepNumberComponent: CustomStepNumber,
})(Playlist);

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
      height:
         Platform.OS === "web" ? 200 : Dimensions.get("screen").width * 0.35,
      padding: 0,
      borderRadius: 30,

      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 3,
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

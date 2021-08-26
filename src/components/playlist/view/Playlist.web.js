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
import { TourGuideProvider } from "rn-tourguide";
import TourContainer from "../elements/TourContainer";
import CustomTootip from "../../elements/CustomTootip";
import I18n from "i18n-js";
import {
   IS_MOBILE_WEB,
   PLAYLIST_HEIGHT,
   SMALL_MOBILE_WEB,
} from "../../../lib/styles/variables";

function Playlist({
   playlist,
   listPressCallback,
   onPressVisible,
   onPressVisibleEdit,
   isFirst,
   clearIsFirstP,
}) {
   return (
      <View style={styles.topView}>
         <TourGuideProvider
            tooltipComponent={(props) => (
               <CustomTootip {...props} text={[I18n.t("playlist_step_1")]} />
            )}>
            <TourContainer
               length={playlist.length}
               isFirst={isFirst}
               clearIsFirstP={clearIsFirstP}
            />
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
                                          fontFamily: "notosans",
                                          fontWeight: "500",
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
               </View>
            </ScrollView>
         </TourGuideProvider>
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

export default Playlist;

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
      justifyContent: SMALL_MOBILE_WEB ? "center" : "space-between",
   },
   cardTouchable: {
      width: "100%",
      height: "100%",
   },
   card: {
      width: SMALL_MOBILE_WEB ? 250 : "40%",
      height: SMALL_MOBILE_WEB ? 220 : PLAYLIST_HEIGHT,
      padding: 0,
      borderRadius: 30,

      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowRadius: 3.84,
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

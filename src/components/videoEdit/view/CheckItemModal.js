import React from "react";
import {
   StyleSheet,
   View,
   Text,
   Image,
   Dimensions,
   Platform,
} from "react-native";
import { ListItem } from "react-native-elements";
import {
   boldFontStyle,
   fontStyle,
} from "../../../lib/styles/stylesByPlatform.js";
import palette from "../../../lib/styles/palette";
import seperateSecond from "../../../lib/utils/seperateSecond";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import I18n from "i18n-js";
import { IS_MOBILE_WEB, WIDTH } from "../../../lib/styles/variables.js";

const width = Platform.OS === "web" ? (IS_MOBILE_WEB ? "95%" : 500) : WIDTH;

function CheckItemModal({ visible, close, onOk, item, from }) {
   const footerButtons = [
      {
         text: I18n.t("no"),
         onPress: close,
         textStyle: [{ color: palette.redRose }, fontStyle],
      },
      {
         text: I18n.t("yes"),
         onPress: onOk,
      },
   ];
   return (
      <CustomModal
         visible={visible}
         footer={<CustomModalFooter buttons={footerButtons} width={width} />}
         rounded={true}>
         <View style={styles.container}>
            <Text style={styles.header}>
               {from === "play" ? I18n.t("update_range") : I18n.t("add_video")}
            </Text>

            <View style={styles.item}>
               <ListItem containerStyle={styles.listItem}>
                  <Image
                     source={{ uri: item.thumbnail }}
                     style={{ width: 100, height: 100 }}
                     transition
                  />
                  <ListItem.Content>
                     <ListItem.Title style={boldFontStyle} numberOfLines={2}>
                        {item.title.slice(0, 40)}
                        {item.title.length > 40 ? "..." : ""}
                     </ListItem.Title>
                     <ListItem.Subtitle style={fontStyle}>
                        {seperateSecond(item.lapse[0])} ~
                        {seperateSecond(item.lapse[1])}
                     </ListItem.Subtitle>
                  </ListItem.Content>
               </ListItem>
            </View>
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: width,
      backgroundColor: palette.ivory,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 10,
   },
   header: { fontSize: 18, ...fontStyle },
   item: {
      width: "100%",
   },
   listItem: {
      backgroundColor: palette.ivory,
      width: "100%",
      overflow: "hidden",
      borderColor: palette.ivory,
      borderWidth: 1,
      borderRadius: 30,
      marginTop: 10,
      padding: 0,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 3,
   },
});

export default React.memo(CheckItemModal);

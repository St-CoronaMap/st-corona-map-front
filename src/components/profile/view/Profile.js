import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import {
   boldFontStyle,
   fontStyle,
} from "../../../lib/styles/stylesByPlatform.js";
import palette from "../../../lib/styles/palette";
import Header from "./Header";
import I18n from "i18n-js";
const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingBottom: 0,
      paddingTop: 30,
      backgroundColor: palette.ivory,
   },
   avatar: {
      height: 200,
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      padding: 10,
      backgroundColor: palette.ivory,
   },
   lineHeader: {
      opacity: 0.8,
      ...fontStyle,
   },
   bottomBar: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      height: 80,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
   },
   buttonContainer: {
      width: "33%",
      alignItems: "center",
   },
   buttonStyle: {
      width: "100%",
   },
});
function Profile({
   user,
   changeAvatar,
   loading,
   showChangePassword,
   showRemoveUser,
   onPressLogout,
}) {
   return (
      <View style={styles.container}>
         <View style={styles.avatar}>
            <Header user={user} changeAvatar={changeAvatar} loading={loading} />
         </View>
         <View style={styles.content}>
            <ListItem
               bottomDivider
               containerStyle={{ backgroundColor: palette.ivory }}>
               <Text style={styles.lineHeader}>{I18n.t("id")}</Text>
               <ListItem.Content>
                  <ListItem.Title style={fontStyle}>
                     {user?.loginId}
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem>
            <ListItem
               bottomDivider
               containerStyle={{ backgroundColor: palette.ivory }}>
               <Text style={styles.lineHeader}>{I18n.t("createdAt")}</Text>
               <ListItem.Content>
                  <ListItem.Title style={fontStyle}>
                     {user?.createdAt.slice(0, 10)}
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
         <View style={styles.bottomBar}>
            <Button
               title={I18n.t("remove")}
               type="clear"
               color="red"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               titleStyle={[{ color: palette.redRose }, boldFontStyle]}
               onPress={showRemoveUser}
            />
            <Button
               title={I18n.t("change_password")}
               type="clear"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               titleStyle={[{ color: palette.blackBerry }, boldFontStyle]}
               onPress={showChangePassword}
            />
            <Button
               title={I18n.t("signout")}
               type="clear"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               titleStyle={[{ color: palette.blackBerry }, boldFontStyle]}
               onPress={onPressLogout}
            />
         </View>
      </View>
   );
}

export default Profile;

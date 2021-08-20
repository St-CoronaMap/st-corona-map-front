import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import Header from "./Header";
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
               <Text style={styles.lineHeader}>아이디</Text>
               <ListItem.Content>
                  <ListItem.Title>{user?.loginId}</ListItem.Title>
               </ListItem.Content>
            </ListItem>
            <ListItem
               bottomDivider
               containerStyle={{ backgroundColor: palette.ivory }}>
               <Text style={styles.lineHeader}>이메일</Text>
               <ListItem.Content>
                  <ListItem.Title>{user?.email}</ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
         <View style={styles.bottomBar}>
            <Button
               title="회원탈퇴"
               type="clear"
               color="red"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               titleStyle={{ color: palette.redRose, fontWeight: "600" }}
               onPress={showRemoveUser}
            />
            <Button
               title="비밀번호 변경"
               type="clear"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               titleStyle={{ color: palette.blackBerry, fontWeight: "600" }}
               onPress={showChangePassword}
            />
            <Button
               title="로그아웃"
               type="clear"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               titleStyle={{ color: palette.blackBerry, fontWeight: "600" }}
               onPress={onPressLogout}
            />
         </View>
      </View>
   );
}

export default Profile;

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";
import Header from "./Header";
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10,
      paddingBottom: 0,
      paddingTop: 30,
      backgroundColor: palette.ivory,
   },
   avatar: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 4,
      backgroundColor: palette.ivory,
   },
   bottomBar: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
   },
});
function Profile({
   user,
   changeAvatar,
   loading,
   changeDisplayName,
   onPressOnEdit,
   onEdit,
   onChange,
   editUserInfo,
   showChangePassword,
   showRemoveUser,
   errMsg,
   onPressLogout,
}) {
   return (
      <View style={styles.container}>
         <View style={styles.avatar}>
            <Header
               user={user}
               changeAvatar={changeAvatar}
               loading={loading}
               changeDisplayName={changeDisplayName}
               onPressOnEdit={onPressOnEdit}
               onEdit={onEdit}
               onChange={onChange}
               editUserInfo={editUserInfo}
               errMsg={errMsg}
            />
         </View>
         <View style={styles.content}>
            <ListItem
               bottomDivider
               containerStyle={{ backgroundColor: palette.ivory }}>
               <Text>아이디</Text>
               <ListItem.Content>
                  <ListItem.Title>{user?.id}</ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
         <View style={styles.bottomBar}>
            <Button
               title="회원탈퇴"
               type="clear"
               color="red"
               titleStyle={{ color: palette.redRose }}
               onPress={showRemoveUser}
            />
            <Button
               title="비밀번호 변경"
               type="clear"
               titleStyle={{ color: palette.blackBerry }}
               onPress={showChangePassword}
            />
            <Button
               title="로그아웃"
               type="clear"
               titleStyle={{ color: palette.blackBerry }}
               onPress={onPressLogout}
            />
         </View>
      </View>
   );
}

export default Profile;

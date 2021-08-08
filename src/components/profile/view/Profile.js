import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import Header from "./Header";
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   avatar: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 4,
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
            <ListItem bottomDivider>
               <Text>이메일</Text>
               <ListItem.Content>
                  <ListItem.Title>{user?.email}</ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
         <View style={styles.bottomBar}>
            <Button
               title="비밀번호 변경"
               type="clear"
               onPress={showChangePassword}
            />
            <Button
               title="회원탈퇴"
               type="clear"
               color="red"
               titleStyle={{ color: "red" }}
               onPress={showRemoveUser}
            />
         </View>
      </View>
   );
}

export default Profile;

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import palette from "../../../lib/styles/palette";
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
   },
   insideContainer: {
      padding: 30,
      paddingTop: 50,
   },
   headerContainer: {
      height: 100,
      alignItems: "center",
   },
   header: {
      fontSize: 32,
      fontWeight: "700",
      color: palette.blackBerry,
   },
   inputContainer: {
      width: "100%",
   },
   input: {
      paddingLeft: 10,
   },
   button: {
      width: 100,
   },
   buttonPwReset: {
      width: 110,
      position: "absolute",
      left: 0,
   },
   buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "100%",
      marginTop: 30,
   },
   info: {
      paddingTop: 30,
      paddingLeft: 10,
   },
   infoText: {
      color: palette.blackBerry,
      opacity: 0.5,
   },
});

function Login({
   userInfo,
   onChange,
   isLogin,
   setIsLogIn,
   onPressLogin,
   errMsg,
   wrongPW,
   passwordReset,
}) {
   return (
      <ScrollView style={styles.container} enabled>
         <View style={styles.insideContainer}>
            <View style={styles.headerContainer}>
               <Text style={styles.header}>
                  {isLogin ? "로그인" : "회원가입"}
               </Text>
            </View>
            <View style={styles.inputContainer}>
               <Input
                  placeholder="아이디"
                  leftIcon={
                     <Icon
                        name="user"
                        type="font-awesome"
                        size={24}
                        color={palette.blackBerry}
                     />
                  }
                  value={userInfo.id}
                  style={styles.input}
                  errorMessage={errMsg.id}
                  onChangeText={(value) => onChange("id", value)}
                  errorStyle={{ fontWeight: "600" }}
               />
               {!isLogin && (
                  <Input
                     placeholder="이메일"
                     leftIcon={
                        <Icon
                           name="envelope"
                           type="font-awesome"
                           size={20}
                           color={palette.blackBerry}
                        />
                     }
                     style={styles.input}
                     value={userInfo.email}
                     errorMessage={errMsg.email}
                     onChangeText={(value) => onChange("email", value)}
                     errorStyle={{ fontWeight: "600" }}
                  />
               )}
               <Input
                  placeholder="비밀번호"
                  leftIcon={
                     <Icon
                        name="lock"
                        type="font-awesome"
                        size={24}
                        color={palette.blackBerry}
                     />
                  }
                  secureTextEntry={true}
                  style={styles.input}
                  value={userInfo.password}
                  onChangeText={(value) => onChange("password", value)}
                  errorMessage={errMsg.password}
                  errorStyle={{ fontWeight: "600" }}
               />
               {!isLogin && (
                  <Input
                     placeholder="비밀번호 확인"
                     leftIcon={
                        <Icon
                           name="lock"
                           type="font-awesome"
                           size={24}
                           color={palette.blackBerry}
                        />
                     }
                     secureTextEntry={true}
                     style={styles.input}
                     value={userInfo.passwordCheck}
                     errorMessage={errMsg.passwordCheck}
                     onChangeText={(value) => onChange("passwordCheck", value)}
                     errorStyle={{ fontWeight: "600" }}
                  />
               )}
               <View style={styles.buttonContainer}>
                  {wrongPW && (
                     <Button
                        title="비밀번호 찾기"
                        type="clear"
                        containerStyle={styles.buttonPwReset}
                        onPress={passwordReset}
                     />
                  )}
                  <Button
                     title={isLogin ? "회원가입" : "로그인"}
                     type="clear"
                     containerStyle={styles.button}
                     titleStyle={{
                        color: palette.blackBerry,
                        fontWeight: "600",
                     }}
                     onPress={() => setIsLogIn((prev) => !prev)}
                  />
                  <Button
                     title={isLogin ? "로그인" : "회원가입"}
                     onPress={onPressLogin}
                     titleStyle={{ fontWeight: "600" }}
                     containerStyle={styles.button}
                     buttonStyle={{ backgroundColor: palette.redRose }}
                  />
               </View>
            </View>
            {!isLogin && (
               <View style={styles.info}>
                  <Text style={styles.infoText}>
                     * 가입 시, 기존 재생목록은 자동으로 동기화 됩니다.
                  </Text>
               </View>
            )}
         </View>
      </ScrollView>
   );
}

export default Login;

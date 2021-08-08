import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Icon, Input } from "react-native-elements";
import { Button } from "react-native-elements";
import palette from "../../../lib/styles/palette";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: palette.ivory,
      padding: 30,
      paddingTop: "20%",
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
});

function Login({
   userInfo,
   onChange,
   login,
   setLogIn,
   onPressLogin,
   errMsg,
   loading,
   wrongPW,
   passwordReset,
}) {
   return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
         <View style={styles.headerContainer}>
            <Text style={styles.header}>{login ? "로그인" : "회원가입"}</Text>
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
               value={userInfo.email}
               style={styles.input}
               errorMessage={errMsg.email}
               onChangeText={(value) => onChange("email", value)}
               errorStyle={{ fontWeight: "600" }}
            />
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
            {!login && (
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
                  title={login ? "회원가입" : "로그인"}
                  type="clear"
                  containerStyle={styles.button}
                  titleStyle={{ color: palette.blackBerry, fontWeight: "600" }}
                  onPress={() => setLogIn((prev) => !prev)}
               />
               <Button
                  title={login ? "로그인" : "회원가입"}
                  onPress={onPressLogin}
                  loading={loading}
                  titleStyle={{ fontWeight: "600" }}
                  containerStyle={styles.button}
                  buttonStyle={{ backgroundColor: palette.redRose }}
               />
            </View>
         </View>
      </KeyboardAvoidingView>
   );
}

export default Login;

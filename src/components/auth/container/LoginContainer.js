import React, { useState } from "react";
import Login from "../view/Login";
import { useDispatch } from "react-redux";
import { View } from "react-native";

import { setLoading, setUnloading } from "../../../modules/loading";
import { login, SignUp } from "../../../lib/api/auth";
import handleError, { checkLoginInfo } from "../../../lib/utils/handleAuthErr";
import { signin } from "../../../modules/auth";
import { getPlaylist } from "../../../modules/playlist";
import { afterGetPlaylist } from "../../../lib/utils/afterGetPlaylist";
import { setSnackbar } from "../../../modules/snackbar";
import I18n from "i18n-js";

function LoginContainer({ navigation }) {
   const [isLogin, setIsLogIn] = useState(true);
   const [userInfo, setUserInfo] = useState({
      password: "",
      passwordCheck: "",
      id: "",
      email: "",
   });
   const [errMsg, setErrMsg] = useState({
      id: "",
      password: "",
      passwordCheck: "",
      email: "",
   });
   const [wrongPW, setWrongPW] = useState(false);
   const dispatch = useDispatch();

   const onChange = (name, value) => {
      if (errMsg[`${name}`]) {
         setErrMsg((prev) => ({ ...prev, [name]: "" }));
      }
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const onPressLogin = async () => {
      if (!checkLoginInfo(userInfo, setErrMsg, isLogin)) return;
      dispatch(setLoading());
      if (isLogin) {
         try {
            const res = await login(userInfo.id, userInfo.password);
            dispatch(signin(res));
         } catch (err) {
            // 비밀번호, 아이디 처리
            if (err.message === "비밀번호가 일치하지 않습니다.") {
               handleError("auth/wrong-password", setErrMsg);
               setWrongPW(true);
            } else if (err.message === "존재하지 않는 회원입니다.") {
               handleError("auth/user-not-found", setErrMsg);
            } else {
               dispatch(setSnackbar(I18n.t("server_error")));
            }
            dispatch(setUnloading());
            return;
         }
      } else {
         try {
            const res = await SignUp(userInfo.id, userInfo.password);
            dispatch(signin(res));
         } catch (err) {
            // 중복 아이디 처리
            if (err.message === "ID가 중복된 회원입니다.") {
               handleError("auth/id-already-in-use", setErrMsg);
            } else {
               dispatch(setSnackbar(I18n.t("server_error")));
            }
            dispatch(setUnloading());
            return;
         }
      }

      dispatch(getPlaylist(() => afterGetPlaylist(navigation, dispatch)));
   };

   return (
      <View style={{ flex: 1 }}>
         <Login
            navigation={navigation}
            userInfo={userInfo}
            onChange={onChange}
            isLogin={isLogin}
            setIsLogIn={setIsLogIn}
            onPressLogin={onPressLogin}
            errMsg={errMsg}
         />
      </View>
   );
}

export default LoginContainer;

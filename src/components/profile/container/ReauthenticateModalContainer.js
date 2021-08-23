import React, { useState } from "react";
import ReauthenticateModal from "../view/ReauthenticateModal";
import handleError, { checkPassword } from "../../../lib/utils/handleAuthErr";
import { useDispatch } from "react-redux";
import { setLoading, setUnloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { login } from "../../../lib/api/auth";
import I18n from "i18n-js";

function ReauthenticateModalContainer({
   user,
   setReauthenticated,
   reauthVisible,
   setReauthVisible,
   password,
   setPassword,
}) {
   const [errMsg, setErrMsg] = useState({ password: "" });
   const dispatch = useDispatch();

   const reauthWithPw = async () => {
      try {
         if (!checkPassword(password, setErrMsg)) {
            return;
         }

         dispatch(setLoading());
         await login(user.loginId, password);
         setReauthenticated(true);
         // 아이디 받아온 걸로 재 로그인
      } catch (err) {
         if (err.message === "비밀번호가 일치하지 않습니다.") {
            handleError("auth/wrong-password", setErrMsg);
         } else {
            dispatch(setSnackbar(I18n.t("server_error")));
         }
      }
      dispatch(setUnloading());
   };
   const onChange = (v) => {
      if (errMsg.password) {
         setErrMsg({ password: "" });
      }
      if (v && !/[0-9a-zA-Z.;\-]/.test(v)) {
         setErrMsg({
            password: I18n.t("password_format"),
         });
         return;
      }
      setPassword(v);
   };
   const onClose = () => {
      setReauthVisible(false);
   };

   return (
      <ReauthenticateModal
         visible={reauthVisible}
         onClose={onClose}
         reauthWithPw={reauthWithPw}
         onChange={onChange}
         errMsg={errMsg}
         password={password}
      />
   );
}

export default ReauthenticateModalContainer;

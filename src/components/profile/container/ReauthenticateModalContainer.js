import React, { useState } from "react";
import ReauthenticateModal from "../view/ReauthenticateModal";
import handleError, { checkPassword } from "../../../lib/utils/handleAuthErr";
import { useDispatch } from "react-redux";
import { setLoading, setUnloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { SERVER_ERROR } from "../../../lib/strings";
import { login } from "../../../lib/api/auth";
import { MY_ID } from "../../../../env";

function ReauthenticateModalContainer({
   user,
   setReauthenticated,
   reauthVisible,
   setReauthVisible,
}) {
   const [password, setPassword] = useState("");
   const [errMsg, setErrMsg] = useState({ password: "" });

   const dispatch = useDispatch();

   const reauthWithPw = async () => {
      dispatch(setLoading());
      try {
         if (!checkPassword(password, setErrMsg)) {
            return;
         }
         await login(MY_ID, password);
         setReauthenticated(true);
         // 아이디 받아온 걸로 재 로그인
      } catch (err) {
         console.log(err);
         if (err.message === "비밀번호가 일치하지 않습니다.") {
            handleError("auth/wrong-password", setErrMsg);
         } else {
            dispatch(setSnackbar(SERVER_ERROR));
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
            password: "영어, 숫자, 특수문자만 가능합니다.",
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

import React, { useState } from "react";
import PwUpdate from "../view/PwUpdate";
import handleError, {
   catchError,
   checkPassword,
} from "../../../lib/utils/handleAuthErr";
import { useDispatch } from "react-redux";
import { setLoading, setUnloading } from "../../../modules/loading";
import { pwUpdate } from "../../../lib/api/auth";
import I18n, { reset } from "i18n-js";

function PwUpdateContainer({
   visible,
   setVisible,
   oldPassword,
   afterPwChange,
}) {
   const [password, setPassword] = useState("");
   const [success, setSuccess] = useState(false);
   const [errMsg, setErrMsg] = useState({ password: "" });
   const dispatch = useDispatch();

   const onPasswordUpdate = async (pw) => {
      if (success) {
         return;
      } else if (!checkPassword(pw, setErrMsg)) {
         return;
      }
      try {
         dispatch(setLoading());
         // 비밀번호 변경
         await pwUpdate(oldPassword, pw);
         setSuccess(true);
      } catch (err) {
         catchError(err.message, setErrMsg, "password");
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
   const clear = (resetReauth) => {
      setPassword("");
      setErrMsg({ password: "" });
      setSuccess(false);
      setVisible(false);
      if (resetReauth) {
         afterPwChange();
      }
   };
   return (
      <PwUpdate
         visible={visible}
         password={password}
         clear={clear}
         onChange={onChange}
         onPasswordUpdate={onPasswordUpdate}
         errMsg={errMsg}
         success={success}
      />
   );
}

export default PwUpdateContainer;

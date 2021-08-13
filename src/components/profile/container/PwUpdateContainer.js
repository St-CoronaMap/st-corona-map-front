import React, { useState } from "react";
import PwUpdate from "../view/PwUpdate";
import handleError, {
   catchError,
   checkPassword,
} from "../../../lib/utils/handleAuthErr";
import { useDispatch } from "react-redux";
import { setLoading, setUnloading } from "../../../modules/loading";

function PwUpdateContainer({ visible, setVisible }) {
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
         setSuccess(true);
      } catch (err) {
         catchError(err.code, setErrMsg, "password");
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
   const clear = () => {
      setPassword("");
      setErrMsg({ password: "" });
      setSuccess(false);
      setVisible(false);
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

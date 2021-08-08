import React, { useState } from "react";
import ReauthenticateModal from "../view/ReauthenticateModal";
import handleError, { checkPassword } from "../../../lib/utils/handleAuthErr";

function ReauthenticateModalContainer({
   setReauthenticated,
   reauthVisible,
   setReauthVisible,
}) {
   const [reauthPw, setReauthPw] = useState(false);
   const [password, setPassword] = useState("");
   const [errMsg, setErrMsg] = useState({ password: "" });
   const [loading, setLoading] = useState(false);

   const catchError = (code, setErrMsg, lastSection) => {
      if (!handleError(code, setErrMsg)) {
         setErrMsg((prev) => ({
            ...prev,
            [lastSection]: "알수없는 오류가 발생했습니다. 다시 시도해주세요.",
         }));
      }
   };

   const reauthenticate = async () => {
      setReauthPw(true);
   };
   const reauthWithPw = async () => {
      try {
         if (!checkPassword(password, setErrMsg)) {
            return;
         }
         setLoading(true);
         // 재 로그인
      } catch (err) {
         catchError(err.code, setErrMsg, "password");
      }
      setLoading(false);
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
         reauthenticate={reauthenticate}
         onClose={onClose}
         reauthPw={reauthPw}
         reauthWithPw={reauthWithPw}
         onChange={onChange}
         errMsg={errMsg}
         password={password}
         loading={loading}
      />
   );
}

export default ReauthenticateModalContainer;

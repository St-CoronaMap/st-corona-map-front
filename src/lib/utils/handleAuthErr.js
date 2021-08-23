import I18n from "i18n-js";
import { testEmail, testPassword } from "./testRegs";

export default function handleError(code, setErrMsg) {
   switch (code) {
      case "blank_id":
         setErrMsg((prev) => ({
            ...prev,
            id: I18n.t("blank_id"),
         }));
         return true;
      case "blank_password":
         setErrMsg((prev) => ({
            ...prev,
            password: I18n.t("blank_password"),
         }));
         return true;
      case "auth/wrong-password":
         setErrMsg((prev) => ({
            ...prev,
            password: I18n.t("wrong_password"),
         }));
         return true;
      case "auth/user-not-found":
         setErrMsg((prev) => ({
            ...prev,
            id: I18n.t("user_not_exist"),
         }));
         return true;
      case "auth/id-already-in-use":
         setErrMsg((prev) => ({
            ...prev,
            id: I18n.t("id_already_used"),
         }));
         return true;
      case "not_match_password_and_check":
         setErrMsg((prev) => ({
            ...prev,
            passwordCheck: I18n.t("password_not_match"),
         }));
         return true;
      case "password_not_formmatted":
         setErrMsg((prev) => ({
            ...prev,
            password: I18n.t("password_format"),
         }));
         return true;
      case "wrong_email":
         setErrMsg((prev) => ({
            ...prev,
            email: I18n.t("email_not_formatted"),
         }));
         return true;
      case "기존 비밀번호와 같은 비밀번호 입니다.":
         setErrMsg((prev) => ({
            ...prev,
            password: I18n.t("same_password"),
         }));
         return true;
      default:
         return false;
   }
}

export const checkLoginInfo = (info, setErrMsg, isLogin) => {
   if (!info.id) {
      handleError("blank_id", setErrMsg);
      return false;
   } else if (!info.password) {
      handleError("blank_password", setErrMsg);
      return false;
   } else if (!testPassword(info.password)) {
      handleError("password_not_formmatted", setErrMsg);
      return false;
   }
   if (!isLogin) {
      if (info.password !== info.passwordCheck) {
         handleError("not_match_password_and_check", setErrMsg);
         return false;
      }
   }
   return true;
};
export const checkPassword = (password, setErrMsg) => {
   if (!password) {
      handleError("blank_password", setErrMsg);
      return false;
   } else if (!testPassword(password)) {
      handleError("password_not_formmatted", setErrMsg);
      return false;
   }
   return true;
};

export const catchError = (code, setErrMsg, lastSection) => {
   if (!handleError(code, setErrMsg)) {
      setErrMsg((prev) => ({
         ...prev,
         [lastSection]: I18n.t("uncatched_error"),
      }));
   }
};

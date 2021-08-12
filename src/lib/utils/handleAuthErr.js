import testPassword from "./testPassword";

export default function handleError(code, setErrMsg) {
   switch (code) {
      case "blank_id":
         setErrMsg((prev) => ({
            ...prev,
            id: "아이디를 입력해주세요.",
         }));
         return true;
      case "blank_password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호를 입력해주세요.",
         }));
         return true;
      case "auth/wrong-password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호가 틀렸습니다.",
         }));
         return true;
      case "auth/user-not-found":
         setErrMsg((prev) => ({
            ...prev,
            id: "존재하지 않는 회원입니다..",
         }));
         return true;
      case "auth/id-already-in-use":
         setErrMsg((prev) => ({
            ...prev,
            id: "이미 사용중인 아이디입니다.",
         }));
         return true;
      case "not_match_password_and_check":
         setErrMsg((prev) => ({
            ...prev,
            passwordCheck: "비밀번호가 일치하지 않습니다.",
         }));
         return true;
      case "password_not_formmatted":
         setErrMsg((prev) => ({
            ...prev,
            password:
               "비밀번호는 알파벳, 숫자, 특수문자 조합으로 8~20자여야 합니다.",
         }));
         return true;
      default:
         return false;
   }
}

export const checkLoginInfo = (info, setErrMsg) => {
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
         [lastSection]: "알수없는 오류가 발생했습니다. 다시 시도해주세요.",
      }));
   }
};

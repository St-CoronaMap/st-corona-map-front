//액션 타입
const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";

//액션 생성 함수
export const signin = (email, uid, type, token) => ({
   type: SIGNIN,
   payload: { email: email, uid: uid, type: type, accessToken: token },
});
export const signout = () => ({ type: SIGNOUT });

const initialState = {
   signined: false,
   email: "",
   uid: "",
   type: "",
   accessToken: "",
};

export default function auth(state = initialState, action) {
   switch (action.type) {
      case SIGNIN:
         return {
            signined: true,
            email: action.payload.email,
            uid: action.payload.uid,
            type: action.payload.type,
            accessToken: action.payload.accessToken,
         };
      case SIGNOUT:
         return {
            signined: false,
            email: "",
            uid: "",
            type: "",
            accessToken: "",
         };
      default:
         return state;
   }
}

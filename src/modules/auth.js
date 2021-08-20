// 프로필 데이터로 교체?
//액션 타입
const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";

//액션 생성 함수
export const signin = (userInfo) => ({
   type: SIGNIN,
   payload: userInfo,
});
export const signout = () => ({ type: SIGNOUT });

const initialState = {
   signined: false,
   id: "",
};

export default function auth(state = initialState, action) {
   switch (action.type) {
      case SIGNIN:
         return {
            signined: action.payload.member,
            ...action.payload,
         };
      case SIGNOUT:
         return {
            signined: false,
            id: "",
         };
      default:
         return state;
   }
}

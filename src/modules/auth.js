// 프로필 데이터로 교체?
//액션 타입
const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";

//액션 생성 함수
export const signin = (id) => ({
   type: SIGNIN,
   payload: { id: id },
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
            signined: true,
            id: action.payload.id,
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

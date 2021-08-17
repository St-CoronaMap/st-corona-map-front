//액션 타입
const SET_ISFIRST = "SET_ISFIRST";
const CLEAR_ISFIRST = "CLEAR_ISFIRST";
//액션 생성 함수
export const setIsFirst = (first) => ({
   type: SET_ISFIRST,
   payload: first,
});
export const clearIsFirst = () => ({ type: CLEAR_ISFIRST });

const initialState = false;

export default function isFirst(state = initialState, action) {
   switch (action.type) {
      case SET_ISFIRST:
         return action.payload;
      case CLEAR_ISFIRST:
         return false;
      default:
         return state;
   }
}

//액션 타입
const SET_UNIQUEID = "SET_UNIQUEID";

//액션 생성 함수
export const setUniqueId = (user) => ({
   type: SET_UNIQUEID,
   payload: user,
});

const initialState = {
   tokens: {},
   first: false,
};

export default function uniqueId(state = initialState, action) {
   switch (action.type) {
      case SET_UNIQUEID:
         return { ...action.payload };
      default:
         return state;
   }
}

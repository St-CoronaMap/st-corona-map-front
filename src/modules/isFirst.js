import { call, put, takeLatest } from "redux-saga/effects";
import {
   clearIsFirstStorage,
   NOTFIRST,
   P_FIRST,
   V_FIRST,
} from "../lib/api/isFirstStorage";

//액션 타입
const SET_ISFIRST = "SET_ISFIRST";
const CLEAR_ISFIRST = "CLEAR_ISFIRST";
const CLEAR_ISFIRST_ASYNC = "CLEAR_ISFIRST_ASYNC";

//액션 생성 함수
export const setIsFirst = (first) => ({
   type: SET_ISFIRST,
   payload: first,
});
export const clearIsFirst = (type) => ({ type: CLEAR_ISFIRST, payload: type });

const initialState = {
   [P_FIRST]: false,
   [V_FIRST]: false,
};

function* clearIsFirstAsync(action) {
   yield call(clearIsFirstStorage, action.payload);
   yield put({ type: CLEAR_ISFIRST_ASYNC, payload: action.payload });
}

export function* isFirstSage() {
   yield takeLatest(CLEAR_ISFIRST, clearIsFirstAsync);
}

export default function isFirst(state = initialState, action) {
   switch (action.type) {
      case SET_ISFIRST:
         return action.payload;
      case CLEAR_ISFIRST_ASYNC:
         return { ...state, [action.payload]: NOTFIRST };
      default:
         return state;
   }
}

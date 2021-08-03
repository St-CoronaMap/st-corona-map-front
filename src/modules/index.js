import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import playlist, { playlistSaga } from "./playlist";
import uniqueId from "./uniqueId";
import loading from "./loading";

// 일반 redux 연결
const rootReducer = combineReducers({ auth, playlist, uniqueId, loading });

// react saga 연결
export function* rootSaga() {
   yield all([playlistSaga()]);
}

export default rootReducer;

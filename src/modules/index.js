import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import dataReduxExample, { dataSaga } from "./data";
import auth from "./auth";
import playlist from "./playlist";

// 일반 redux 연결
const rootReducer = combineReducers({ auth, playlist });

// react saga 연결
export function* rootSaga() {
   yield all([dataSaga()]);
}

export default rootReducer;

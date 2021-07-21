import { call, put, takeLatest } from "redux-saga/effects";
import { getPlaylistLocal } from "../lib/api/playlist";

//액션 타입
const ADD_ITEM = "ADD_ITEM";
const ADD_PLAYLIST = "ADD_PLAYLIST";
const GET_PLAYLIST = "GET_PLAYLIST";
const GET_PLAYLIST_ASYNC = "GET_PLAYLIST_ASYNC";

//액션 생성 함수
export const addItem = (id, item) => ({
   type: ADD_ITEM,
   payload: { id: id, item: item },
});
export const addPlaylist = (name) => ({ type: ADD_PLAYLIST, payload: name });
export const getPlaylist = () => ({ type: GET_PLAYLIST });

const initialState = [];

function* getPlaylistAsync() {
   const res = yield call(getPlaylistLocal);
   yield put({ type: GET_PLAYLIST_ASYNC, payload: res });
}

export function* playlistSaga() {
   yield takeLatest(GET_PLAYLIST, getPlaylistAsync);
}

export default function playlist(state = initialState, action) {
   switch (action.type) {
      case ADD_ITEM:
         return state.map((list) => {
            if (list.id === action.payload.id) {
               list.items.push(action.payload.item);
            }
            return list;
         });
      case ADD_PLAYLIST:
         state.push({
            id: state.length,
            name: action.payload,
            items: [],
         });
         return [...state];
      case GET_PLAYLIST_ASYNC:
         return action.payload;
      default:
         return state;
   }
}

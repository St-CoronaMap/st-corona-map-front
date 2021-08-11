import { call, put, takeLatest } from "redux-saga/effects";
import { getPlaylistApi } from "../lib/api/playlist";

//액션 타입
const ADD_ITEM = "ADD_ITEM";
const ADD_PLAYLIST = "ADD_PLAYLIST";
const GET_PLAYLIST = "GET_PLAYLIST";
const GET_PLAYLIST_ASYNC = "GET_PLAYLIST_ASYNC";
const CLEAR_THUMBNAIL = "CLEAR_THUMBNAIL";
const SET_THUMBNAIL = "SET_THUMBNAIL";
const GET_PLAYLIST_ERROR = "GET_PLAYLIST_ERROR";

//액션 생성 함수
export const addItem = (id, item) => ({
   type: ADD_ITEM,
   payload: { id: id, item: item },
});
export const addPlaylist = (name) => ({ type: ADD_PLAYLIST, payload: name });
export const getPlaylist = (id, dispatch) => ({
   type: GET_PLAYLIST,
   payload: { id: id, dispatch: dispatch },
});
export const clearThumbnail = (id) => ({ type: CLEAR_THUMBNAIL, payload: id });
export const setThumbnail = (id, thumbnail) => ({
   type: SET_THUMBNAIL,
   payload: { id: id, thumbnail: thumbnail },
});

const initialState = [];

function* getPlaylistAsync(action) {
   try {
      const res = yield call(getPlaylistApi, action.payload);
      yield put({ type: GET_PLAYLIST_ASYNC, payload: res });
   } catch (err) {
      yield put({ type: GET_PLAYLIST_ERROR, payload: err });
   }
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
      case CLEAR_THUMBNAIL:
         return state.map((item) => {
            if (item.id === action.payload) {
               item.thumbnail = null;
            }
            return item;
         });
      case SET_THUMBNAIL:
         return state.map((item) => {
            if (item.id === action.payload.id) {
               item.thumbnail = action.payload.thumbnail;
            }
            return item;
         });
      case GET_PLAYLIST_ERROR:
         return state;
      default:
         return state;
   }
}

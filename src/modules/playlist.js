//액션 타입
const ADD_ITEM = "ADD_ITEM";
const ADD_PLAYLIST = "ADD_PLAYLIST";

//액션 생성 함수
export const addItem = (id, item) => ({
   type: ADD_ITEM,
   payload: { id: id, item: item },
});
export const addPlaylist = (name) => ({ type: ADD_PLAYLIST, payload: name });

const initialState = [
   {
      id: 0,
      name: "재생목록 1",
      items: [],
   },
];

export default function playlist(state = initialState, action) {
   switch (action.type) {
      case ADD_ITEM:
         return state.map((list) => {
            if (list.id === action.payload.id) {
               list.items.push({
                  ...action.payload.item,
                  id: list.items.length,
               });
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
      default:
         return state;
   }
}

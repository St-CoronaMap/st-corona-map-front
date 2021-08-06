const IN_PLAY = "IN_PLAY";
const OUT_PLAY = "OUT_PLAY";

export const setInPlay = () => ({ type: IN_PLAY });
export const setOutPlay = () => ({ type: OUT_PLAY });

const initialState = false;

export default function isPlay(state = initialState, action) {
   switch (action.type) {
      case IN_PLAY:
         return true;
      case OUT_PLAY:
         return false;
      default:
         return state;
   }
}

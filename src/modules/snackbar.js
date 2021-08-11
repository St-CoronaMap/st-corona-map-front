const SET_SNACKBAR = "SET_SNACKBAR";
const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";

export const setSnackbar = (msg) => ({ type: SET_SNACKBAR, payload: msg });
export const clearSnackbar = () => ({ type: CLEAR_SNACKBAR });

const initialState = "";

export default function snackbar(state = initialState, action) {
   switch (action.type) {
      case SET_SNACKBAR:
         return action.payload;
      case CLEAR_SNACKBAR:
         return "";
      default:
         return state;
   }
}

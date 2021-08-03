const LOADING = "LOADING";
const UNLOADING = "UNLOADING";

export const setLoading = () => ({ type: LOADING });
export const setUnloading = () => ({ type: UNLOADING });

const intialState = false;

export default function loading(state = intialState, action) {
   switch (action.type) {
      case LOADING:
         return true;
      case UNLOADING:
         return false;
      default:
         return state;
   }
}

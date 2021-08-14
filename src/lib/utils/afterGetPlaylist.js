import { setUnloading } from "../../modules/loading";

export const afterGetPlaylist = (navigation, dispatch) => {
   console.log("this");
   dispatch(setUnloading());
   navigation.navigate("Playlist");
};

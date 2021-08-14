import { setUnloading } from "../../modules/loading";

export const afterGetPlaylist = (navigation, dispatch) => {
   dispatch(setUnloading());
   navigation.navigate("Playlist");
};

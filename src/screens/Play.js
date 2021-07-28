import React from "react";
import PlayContainer from "../components/play/container/PlayContainer";

export default function PlayScreen({ route, navigation }) {
   const { playlist } = route.params;
   return <PlayContainer navigation={navigation} playlistInput={playlist} />;
}

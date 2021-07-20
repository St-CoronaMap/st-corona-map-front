import React from "react";
import PlayContainer from "../components/play/container/PlayContainer";

export default function PlayScreen({ routes, navigation }) {
   const { playlist } = routes.params;
   return <PlayContainer navigation={navigation} playlist={playlist} />;
}

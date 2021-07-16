import React, { useRef, useState } from "react";
import AddItem from "../view/AddItem";

function AddItemContainer({ item, navigation }) {
   const [playing, setPlaying] = useState(true);
   const playerRef = useRef();
   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);

   return (
      <AddItem
         item={item}
         playing={playing}
         playerRef={playerRef}
         togglePlaying={togglePlaying}
      />
   );
}

export default AddItemContainer;

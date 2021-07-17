import React, { useCallback, useEffect, useRef, useState } from "react";
import AddItem from "../view/AddItem";

function AddItemContainer({ route, navigation }) {
   const { item } = route.params;
   const [playing, setPlaying] = useState(true);
   const playerRef = useRef();
   const [lapse, setLapse] = useState([0, 100000]);
   const [selectedLapsed, setSelectedLapsed] = useState([0, 100000]);
   const [endTime, setEndTime] = useState(1000);
   const [loaded, setLoaded] = useState(false);

   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);

   useEffect(() => {
      const getEndTime = async () => {
         const res = await playerRef.current?.getDuration();
         console.log("implemented!");
         setLapse([0, res]);
         setEndTime(res);
      };
      if (loaded) {
         getEndTime();
      }
   }, [loaded]);

   let count = 0;
   const handleValueChange = useCallback((low, high) => {
      if (count >= 4) {
         setPlaying(false);
         if (low <= high) {
            setLapse([low, high]);
            /*
         if (low != saveLow) playerRef.current?.seekTo(low, true);
         else playerRef.current?.seekTo(high, true);
         (saveLow = low), (saveHigh = high);*/
         }
      } else if (count < 4) {
         count++;
      }
   }, []);
   return (
      <AddItem
         item={item}
         playing={playing}
         playerRef={playerRef}
         togglePlaying={togglePlaying}
         navigation={navigation}
         lapse={lapse}
         handleValueChange={handleValueChange}
         endTime={endTime}
         selectedLapsed={selectedLapsed}
         setLoaded={setLoaded}
         setPlaying={setPlaying}
         setSelectedLapsed={setSelectedLapsed}
      />
   );
}

export default AddItemContainer;

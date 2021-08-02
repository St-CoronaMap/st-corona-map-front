import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { copilot } from "react-native-copilot";
import CustomStepNumber from "../../elements/CustomStepNumber";
import CustomTootip from "../../elements/CustomTootip";
import VideoEdit from "../view/VideoEdit";
import CheckItemModal from "../view/CheckItemModal";
import { changeLapse } from "../../../lib/api/videos";

function VideoEditFromPlay({ route, navigation }) {
   const item = route.params.item;
   const [playing, setPlaying] = useState(false);
   const playerRef = useRef();
   const [lapse, setLapse] = useState([item.start, item.end]);
   const [selectedLapsed, setSelectedLapsed] = useState([item.start, item.end]);
   const [endTime, setEndTime] = useState(1000);
   const [loaded, setLoaded] = useState(false);
   const [visibleCheckModal, setVisibleCheckModal] = useState(false);

   useEffect(() => {
      const getEndTime = async () => {
         const res = await playerRef.current?.getDuration();
         setEndTime(res);
      };
      if (loaded) {
         getEndTime();
      }
   }, [loaded]);

   let count = 0,
      saveLow = 0;
   const handleValueChange = useCallback((low, high) => {
      if (count >= 3) {
         if (low < high) {
            setLapse([low, high]);

            if (low != saveLow) playerRef.current?.seekTo(low, true);
            else playerRef.current?.seekTo(high, true);
            saveLow = low;
         }
      } else if (count < 3) {
         count++;
      }
   }, []);

   const checkItem = useCallback(() => {
      setVisibleCheckModal(true);
   }, []);
   const lapseLowCounter = useCallback((v) => {
      setLapse((prev) => [v, prev[1]]);
   }, []);
   const lapseHighCounter = useCallback((v) => {
      setLapse((prev) => [prev[0], v]);
   }, []);

   // checkItemModal에서 클릭시 재생목록 창 키거나, 취소
   const doneEdit = useCallback(async () => {
      if (item.start === selectedLapsed[0] && item.end === selectedLapsed[1]) {
         navigation.goBack();
      } else {
         await changeLapse(item.id, selectedLapsed[0], selectedLapsed[1]);

         const updatedList = route.params.playlist.items.map((inItem) => {
            if (inItem.id === item.id) {
               inItem.start = selectedLapsed[0];
               inItem.end = selectedLapsed[1];
            }
            return inItem;
         });
         navigation.navigate("PlayScreen", {
            playlistInput: { id: route.params.playlist.id, items: updatedList },
            isCurItem: route.params.isCurItem,
         });
      }
   }, [selectedLapsed]);
   const closeCheckItemModel = useCallback(() => {
      setVisibleCheckModal(false);
   }, []);
   const CheckItemModalObject = useMemo(
      () => ({ ...item, lapse: selectedLapsed }),
      [selectedLapsed]
   );

   return (
      <>
         <VideoEdit
            item={item}
            playing={playing}
            playerRef={playerRef}
            navigation={navigation}
            lapse={lapse}
            handleValueChange={handleValueChange}
            endTime={endTime}
            selectedLapsed={selectedLapsed}
            loaded={loaded}
            setLoaded={setLoaded}
            setPlaying={setPlaying}
            setSelectedLapsed={setSelectedLapsed}
            checkItem={checkItem}
            lapseLowCounter={lapseLowCounter}
            lapseHighCounter={lapseHighCounter}
         />
         <CheckItemModal
            visible={visibleCheckModal}
            close={closeCheckItemModel}
            onOk={doneEdit}
            item={CheckItemModalObject}
            from={`${route.params.from}`}
         />
      </>
   );
}

export default copilot({
   tooltipComponent: CustomTootip,
   stepNumberComponent: CustomStepNumber,
})(VideoEditFromPlay);

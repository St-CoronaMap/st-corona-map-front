import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { copilot } from "react-native-copilot";
import { useDispatch, useSelector } from "react-redux";
import { setUniqueId } from "../../../modules/uniqueId";
import CustomStepNumber from "../../elements/CustomStepNumber";
import CustomTootip from "../../elements/CustomTootip";
import VideoEdit from "../view/VideoEdit";
import CheckItemModal from "../view/CheckItemModal";
import SelectPlaylist from "../view/SelectPlaylist";

function VideoEditFromPlay({ route, navigation, start }) {
   const item = route.params.item;
   const [playing, setPlaying] = useState(false);
   const playerRef = useRef();
   const [lapse, setLapse] = useState([item.lapse[0], item.lapse[1]]);
   const [selectedLapsed, setSelectedLapsed] = useState([
      item.lapse[0],
      item.lapse[1],
   ]);
   const [endTime, setEndTime] = useState(1000);
   const [loaded, setLoaded] = useState(false);
   const [visibleCheckModal, setVisibleCheckModal] = useState(false);

   const uniqueId = useSelector(({ uniqueId }) => uniqueId);
   const dispatch = useDispatch();

   useEffect(() => {
      if (uniqueId.first && loaded) {
         setTimeout(start, 250);
         dispatch(setUniqueId({ id: uniqueId.id, first: false }));
      }
   }, [uniqueId, loaded]);

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
   const doneEdit = useCallback(() => {
      if (
         item.lapse[0] === selectedLapsed[0] &&
         item.lapse[1] === selectedLapsed[1]
      ) {
         navigation.goBack();
      } else {
         /* 1. 서버로 수정 요청 보내기
            2. 성공하면 백그라운드로 리스트 업데이트 -> 그 플레이 리스트만 받아서 업데이트
            3. 동시에 수정한 리스트 다시 보내기     
        */
         const updatedList = route.params.playlist.items.map((inItem) => {
            if (inItem.id === item.id) {
               inItem.lapse = selectedLapsed;
            }
            return inItem;
         });
         navigation.navigate("PlayScreen", {
            playlistInput: { ...route.params.playlist, items: updatedList },
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

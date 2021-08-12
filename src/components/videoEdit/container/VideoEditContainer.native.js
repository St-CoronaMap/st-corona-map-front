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
import { setLoading, setUnloading } from "../../../modules/loading";

function VideoEditContainer({ route, navigation, start }) {
   const item = route.params.item;
   const [playing, setPlaying] = useState(false);
   const playerRef = useRef();
   const [lapse, setLapse] = useState([0, 10000]);
   const [selectedLapsed, setSelectedLapsed] = useState([0, 10000]);
   const [endTime, setEndTime] = useState(1000);
   const [loaded, setLoaded] = useState(false);
   const [visible, setVisible] = useState(false);
   const [visibleCheckModal, setVisibleCheckModal] = useState(false);
   const [isBanned, setIsBanned] = useState(false);

   const uniqueId = useSelector(({ uniqueId }) => uniqueId);
   const dispatch = useDispatch();

   useEffect(() => {
      if (uniqueId.first && loaded) {
         setTimeout(start, 250);
         dispatch(setUniqueId({ id: uniqueId.id, first: false }));
      }
   }, [uniqueId, loaded]);

   useEffect(() => {
      dispatch(setLoading());
      const getEndTime = async () => {
         const res = await playerRef.current?.getDuration();
         if (res === 0) setIsBanned(true);
         setLapse([0, res]);
         setPlaying(false);
         setSelectedLapsed([0, res]);
         setEndTime(res);
      };
      if (loaded) {
         dispatch(setUnloading());
         getEndTime();
      }
   }, [loaded]);

   let count = 0,
      saveLow = 0;
   const handleValueChange = useCallback((low, high) => {
      if (count >= 4) {
         if (low <= high) {
            setLapse([low, high]);
            try {
               if (low != saveLow) playerRef.current?.seekTo(low, true);
               else playerRef.current?.seekTo(high, true);
            } catch (err) {
               console.log(err);
            }
            saveLow = low;
         }
      } else if (count < 4) {
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
   const pressSelectPlaylist = useCallback(() => {
      setVisible(true);
   }, []);
   const closeCheckItemModel = useCallback(() => {
      setVisibleCheckModal(false);
   }, []);
   const CheckItemModalObject = useMemo(
      () => ({ ...item, lapse: selectedLapsed }),
      [selectedLapsed]
   );

   // 재생목록 창 끄기
   const closeSelectPlaylist = useCallback(() => {
      setVisible(false);
      setVisibleCheckModal(false);
   }, []);

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
         {!isBanned && (
            <>
               <SelectPlaylist
                  visible={visible}
                  cancel={closeSelectPlaylist}
                  item={CheckItemModalObject}
               />
               <CheckItemModal
                  visible={visibleCheckModal}
                  close={closeCheckItemModel}
                  onOk={pressSelectPlaylist}
                  item={CheckItemModalObject}
               />
            </>
         )}
      </>
   );
}

export default copilot({
   tooltipComponent: CustomTootip,
   stepNumberComponent: CustomStepNumber,
})(VideoEditContainer);

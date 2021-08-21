import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FIRST, V_FIRST } from "../../../lib/api/isFirstStorage";
import { clearIsFirst } from "../../../modules/isFirst";
import { setLoading, setUnloading } from "../../../modules/loading";
import CheckItemModal from "../view/CheckItemModal";
import SelectPlaylist from "../view/SelectPlaylist";
import VideoEditContainer from "./VideoEditContainer";

const SEET_TO_OPTION = Platform.OS === "web" ? "seconds" : true;

function VideoEditRootContainer({ route }) {
   const item = route.params.item;
   const [playing, setPlaying] = useState(false);
   const [playingByPlayer, setPlayingByPlayer] = useState(true);
   const playerRef = useRef();
   const [lapse, setLapse] = useState([0, 0]);
   const [selectedLapsed, setSelectedLapsed] = useState([0, 10000]);
   const [endTime, setEndTime] = useState(1000);
   const [loaded, setLoaded] = useState(false);
   const [visible, setVisible] = useState(false);
   const [visibleCheckModal, setVisibleCheckModal] = useState(false);
   const [isBanned, setIsBanned] = useState(false);
   const [vol, setVol] = useState(50);

   const isFirst = useSelector(({ isFirst }) => isFirst[V_FIRST] === FIRST);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setLoading());
      const getEndTime = async () => {
         const res = await playerRef.current?.getDuration();
         if (res === 0) setIsBanned(true);
         const high = res === 0 ? 1 : res;
         setLapse([0, high]);
         setSelectedLapsed([0, high]);
         setEndTime(high);
      };
      if (loaded) {
         dispatch(setUnloading());
         getEndTime();
      }
   }, [loaded]);

   const onReady = useCallback(() => {
      setLoaded(true);
      setPlaying(true);
   }, []);

   const checkItem = useCallback(() => {
      setVisibleCheckModal(true);
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

   const togglePlaying = useCallback(() => {
      if (playing && !playingByPlayer) {
         setPlaying(false);
         setPlayingByPlayer(true);
         setTimeout(() => setPlaying(true), 0);
      } else {
         setPlaying((prev) => !prev);
         setPlayingByPlayer((prev) => !prev);
      }
   }, [playing, playingByPlayer]);

   const volumneChange = useCallback((v) => setVol(v), []);

   const clearIsFirstV = useCallback(() => {
      dispatch(clearIsFirst(V_FIRST));
   }, []);

   const lapseLowCounter = useCallback((v) => {
      playerRef.current?.seekTo(v, SEET_TO_OPTION);
      setLapse((prev) => [v, prev[1]]);
   }, []);
   const lapseHighCounter = useCallback((v) => {
      playerRef.current?.seekTo(v, SEET_TO_OPTION);
      setLapse((prev) => [prev[0], v]);
   }, []);

   const onSelectLapse = useCallback(() => {
      playerRef.current?.seekTo(lapse[0], SEET_TO_OPTION);
      setSelectedLapsed(lapse);
   }, [lapse]);

   return (
      <>
         <VideoEditContainer
            item={item}
            playing={playing}
            playingByPlayer={playingByPlayer}
            setPlayingByPlayer={setPlayingByPlayer}
            playerRef={playerRef}
            lapse={lapse}
            endTime={endTime}
            selectedLapsed={selectedLapsed}
            loaded={loaded}
            setLapse={setLapse}
            setPlaying={setPlaying}
            checkItem={checkItem}
            togglePlaying={togglePlaying}
            volumneChange={volumneChange}
            vol={vol}
            onReady={onReady}
            clearIsFirstV={clearIsFirstV}
            isFirst={isFirst}
            lapseLowCounter={lapseLowCounter}
            lapseHighCounter={lapseHighCounter}
            onSelectLapse={onSelectLapse}
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

export default VideoEditRootContainer;

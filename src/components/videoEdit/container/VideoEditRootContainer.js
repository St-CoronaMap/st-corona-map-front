import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { useDispatch } from "react-redux";
import { V_FIRST } from "../../../lib/api/isFirstStorage";
import { clearIsFirst } from "../../../modules/isFirst";
import { setLoading, setUnloading } from "../../../modules/loading";
import CheckItemModal from "../view/CheckItemModal";
import SelectPlaylist from "../view/SelectPlaylist";
import VideoEditContainer from "./VideoEditContainer";

function VideoEditRootContainer({ route, navigation }) {
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

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setLoading());
      const getEndTime = async () => {
         const res = await playerRef.current?.getDuration();
         if (res === 0) setIsBanned(true);
         setLapse([0, res === 0 ? 1 : res]);
         setSelectedLapsed([0, res === 0 ? 1 : res]);
         setEndTime(res === 0 ? 1 : res);
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

   return (
      <>
         <VideoEditContainer
            item={item}
            playing={playing}
            playingByPlayer={playingByPlayer}
            setPlayingByPlayer={setPlayingByPlayer}
            playerRef={playerRef}
            navigation={navigation}
            lapse={lapse}
            endTime={endTime}
            selectedLapsed={selectedLapsed}
            loaded={loaded}
            setLapse={setLapse}
            setLoaded={setLoaded}
            setPlaying={setPlaying}
            setSelectedLapsed={setSelectedLapsed}
            checkItem={checkItem}
            togglePlaying={togglePlaying}
            volumneChange={volumneChange}
            vol={vol}
            onReady={onReady}
            clearIsFirstV={clearIsFirstV}
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

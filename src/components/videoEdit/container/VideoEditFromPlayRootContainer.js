import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import CheckItemModal from "../view/CheckItemModal";
import { changeLapse } from "../../../lib/api/videos";
import { useDispatch } from "react-redux";
import { setLoading, setUnloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import VideoEditFromPlay from "./VideoEditFromPlay";

function VideoEditRootContainer({ route, navigation }) {
   const item = route.params.item;
   const [playing, setPlaying] = useState(false);
   const [playingByPlayer, setPlayingByPlayer] = useState(true);
   const playerRef = useRef();
   const [lapse, setLapse] = useState([item.start, item.end]);
   const [selectedLapsed, setSelectedLapsed] = useState([item.start, item.end]);
   const [endTime, setEndTime] = useState(1000);
   const [loaded, setLoaded] = useState(false);
   const [visibleCheckModal, setVisibleCheckModal] = useState(false);
   const [vol, setVol] = useState(50);
   const dispatch = useDispatch();

   useEffect(() => {
      const getEndTime = async () => {
         const res = await playerRef.current?.getDuration();
         setEndTime(res);
      };
      if (loaded) {
         getEndTime();
      }
   }, [loaded]);

   // checkItemModal에서 클릭시 재생목록 창 키거나, 취소
   const doneEdit = useCallback(async () => {
      if (item.start === selectedLapsed[0] && item.end === selectedLapsed[1]) {
         navigation.goBack();
      } else {
         dispatch(setLoading());
         try {
            await changeLapse(item.id, selectedLapsed[0], selectedLapsed[1]);

            const updatedList = route.params.playlist.items.map((inItem) => {
               if (inItem.id === item.id) {
                  inItem.start = selectedLapsed[0];
                  inItem.end = selectedLapsed[1];
               }
               return inItem;
            });
            dispatch(setUnloading());
            navigation.navigate("PlayScreen", {
               playlistInput: {
                  id: route.params.playlist.id,
                  items: updatedList,
               },
               from: route.params.from,
            });
         } catch (err) {
            dispatch(
               setSnackbar(
                  "서버 오류로 작업에 실패했습니다. \n다시 시도해 주세요."
               )
            );
            dispatch(setUnloading());
         }
      }
   }, [selectedLapsed]);
   const closeCheckItemModel = useCallback(() => {
      setVisibleCheckModal(false);
   }, []);
   const CheckItemModalObject = useMemo(
      () => ({ ...item, lapse: selectedLapsed }),
      [selectedLapsed]
   );

   const checkItem = useCallback(() => {
      setVisibleCheckModal(true);
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

   const onReady = useCallback(() => {
      setLoaded(true);
      setPlaying(true);
   }, []);
   return (
      <>
         <VideoEditFromPlay
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
         />
         <CheckItemModal
            visible={visibleCheckModal}
            close={closeCheckItemModel}
            onOk={doneEdit}
            item={CheckItemModalObject}
            from="play"
         />
      </>
   );
}

export default VideoEditRootContainer;

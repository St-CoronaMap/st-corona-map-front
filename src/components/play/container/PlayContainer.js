import React, { useCallback, useEffect, useRef, useState } from "react";
import Play from "../view/Play";

function PlayContainer({ route, navigation }) {
   const [playing, setPlaying] = useState(true);
   const [playlist, setPlaylist] = useState(route.params.playlistInput);
   const playerRef = useRef();
   const [cur, setCur] = useState(0);
   const [vol, setVol] = useState(80);

   useEffect(() => {
      if (route.params.isCurItem) {
         setPlaying(false);
         route.params.isCurItem = false;
      }
      setPlaylist(route.params.playlistInput);
   }, [route]);

   const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
   }, []);

   const onReady = useCallback(() => {
      setPlaying(true);
   }, []);

   const handleStateChange = useCallback(
      (e) => {
         if (e === "ended") {
            setPlaying(false);
            if (cur === playlist.items.length - 1) {
               setCur(0);
               if (playlist.items.length === 1) {
                  setPlaying(true);
                  playerRef.current?.seekTo(playlist.items[0].lapse[0], true);
               }
            } else {
               setCur((prev) => prev + 1);
            }
         }
      },
      [cur]
   );

   const onPressItem = useCallback(
      (idx) => {
         if (cur !== idx) {
            setPlaying(false);
         }
         setCur(idx);
      },
      [cur]
   );

   const changeVol = useCallback((v) => {
      setVol(v);
   }, []);

   const pressBackward = useCallback(() => {
      if (playlist.items.length === 1) {
         return;
      }
      setPlaying(false);
      if (cur === 0) {
         setCur(playlist.items.length - 1);
      } else {
         setCur((prev) => prev - 1);
      }
   }, [cur]);

   const pressForwardward = useCallback(() => {
      if (playlist.items.length === 1) {
         return;
      }
      setPlaying(false);
      if (cur === playlist.items.length - 1) {
         setCur(0);
      } else {
         setCur((prev) => prev + 1);
      }
   }, [cur]);

   const changePlaylistOrder = useCallback(
      (data, from, to) => {
         if (from === to) {
            return;
         }
         // 요청보내고, 비동기로 전체 데이터 다시 받아오기
         setPlaylist((prev) => ({ ...prev, items: data }));
         setPlaying(false);

         if ((from < cur && to < cur) || (from > cur && to > cur)) {
            setPlaying(true);
         }
      },
      [cur]
   );

   const onPressEditVideo = useCallback(
      (index) => {
         navigation.navigate("videoEdit_play", {
            item: playlist.items[index],
            from: "play",
            isCurItem: index === cur,
            playlist: playlist,
         });
      },
      [cur, playlist]
   );
   const onPressDeleteVideo = useCallback(
      async (index, id) => {
         /* 1. 서버로 요청 보내기
            2. 성공하면 백그라운드로 리스트 업데이트 -> 그 플레이 리스트만 받아서 업데이트
            3. 동시에 삭제된 리스트로 상태 업데이트 
        */
         setPlaylist((prev) => ({
            id: prev.id,
            items: prev.items.filter((item) => item.id !== id),
         }));
         if (cur !== 0 && index <= cur) {
            setCur((prev) => prev - 1);
         }
         if (index === cur) {
            setPlaying(false);
         }
      },
      [cur]
   );

   return (
      <>
         <Play
            onPressItem={onPressItem}
            playlist={playlist}
            changePlaylistOrder={changePlaylistOrder}
            onPressEditVideo={onPressEditVideo}
            onPressDeleteVideo={onPressDeleteVideo}
            playing={playing}
            playerRef={playerRef}
            togglePlaying={togglePlaying}
            handleStateChange={handleStateChange}
            cur={cur}
            vol={vol}
            changeVol={changeVol}
            onReady={onReady}
            pressBackward={pressBackward}
            pressForwardward={pressForwardward}
         />
      </>
   );
}

export default PlayContainer;

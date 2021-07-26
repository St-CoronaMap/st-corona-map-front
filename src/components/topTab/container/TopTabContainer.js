import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUniqueId } from "../../../lib/api/uniqueId";
import { getPlaylist } from "../../../modules/playlist";
import { setUniqueId } from "../../../modules/uniqueId";
import TopTab from "../view/TopTab";

function TopTabContainer() {
   const dispatch = useDispatch();

   useEffect(() => {
      const getIdAndPlaylist = async () => {
         const res = await getUniqueId();
         dispatch(setUniqueId(res));

         //TODO : 유저 추가시, uniqueId를 넘겨서 받아오기
         dispatch(getPlaylist());
      };
      getIdAndPlaylist();
   }, []);

   return <TopTab />;
}

export default TopTabContainer;

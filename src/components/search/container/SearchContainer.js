import axios from "axios";
import React, { useState } from "react";
import Search from "../view/Search";
import { searchUrl } from "../../../../env";
import { useDispatch } from "react-redux";
import { setLoading, setUnloading } from "../../../modules/loading";

function SearchContainer({ navigation }) {
   const [result, setResult] = useState([]);
   const [typing, setTyping] = useState("");
   const dispatch = useDispatch();

   const onSearch = async () => {
      try {
         dispatch(setLoading());
         const res = await axios.get(
            `${searchUrl}${decodeURIComponent(typing)}`
         );
         setResult(
            res.data.data.items.map((item) => ({
               videoId: item.id,
               title: item.title,
               thumbnail: item.thumbnails[0]?.url || item.bestThumbnail.url,
               channelTitle: item.author.name,
               channelAvatar: item.author.bestAvatar.url,
               duration: item.duration,
            }))
         );
         dispatch(setUnloading());
      } catch (err) {
         console.log(err);
      }
   };
   const onPressItem = (item) => {
      navigation.navigate("videoEdit_search", { item: item, from: "search" });
   };
   const onChange = (value) => {
      setTyping(value);
   };
   return (
      <Search
         onSearch={onSearch}
         typing={typing}
         onChange={onChange}
         result={result}
         onPressItem={onPressItem}
      />
   );
}

export default SearchContainer;

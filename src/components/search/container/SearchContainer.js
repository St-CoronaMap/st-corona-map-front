import axios from "axios";
import React, { useState } from "react";
import Search from "../view/Search";
import { decode } from "html-entities";
import { requestUrl } from "../../../../env";

function SearchContainer({ navigation }) {
   const [result, setResult] = useState([]);
   const [typing, setTyping] = useState("");
   const [loading, setLoading] = useState(false);

   const onSearch = async () => {
      try {
         setLoading(true);
         const res = await axios.get(
            `${requestUrl}${decodeURIComponent(typing)}`
         );
         setResult(
            res.data.data.items.map((item) => ({
               id: item.id,
               title: item.title,
               thumbnails: item.thumbnails[0]?.url || item.bestThumbnail.url,
               channelTitle: item.author.name,
               channelAvatar: item.author.bestAvatar.url,
               duration: item.duration,
            }))
         );
      } catch (err) {
         console.log(err.response);
      }
      setLoading(false);
   };
   const onPressItem = (item) => {
      navigation.navigate("추가", { item: item });
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
         loading={loading}
         onPressItem={onPressItem}
      />
   );
}

export default SearchContainer;

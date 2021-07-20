import axios from "axios";
import React, { useState } from "react";
import { apiKey } from "../../../../env";
import Search from "../view/Search";
import { decode } from "html-entities";
import { useSelector } from "react-redux";

function SearchContainer({ navigation }) {
   const [result, setResult] = useState([]);
   const [typing, setTyping] = useState("");
   const [searched, setSearched] = useState("");
   const [pageTokens, setPageTokens] = useState(["", ""]);
   const { accessToken } = useSelector(({ auth }) => auth);
   const [loading, setLoading] = useState(false);

   const onSearch = async (type, token) => {
      try {
         let params = {
            key: apiKey,
            part: "snippet",
            maxResults: 10,
            type: "video",
         };
         if (type === "page") {
            params["pageToken"] = token;
            params["q"] = searched;
         } else {
            params["q"] = typing;
            setSearched(typing);
         }
         setLoading(true);

         const res = await axios.get(
            "https://www.googleapis.com/youtube/v3/search?",
            {
               params: params,
            }
         );
         setResult(
            res.data.items.map((item) => ({
               id: item.id.videoId,
               title: decode(item.snippet.title),
               thumbnails: item.snippet.thumbnails.medium.url,
               publishedAt: item.snippet.publishedAt,
               description: decode(item.snippet.description),
               channelTitle: decode(item.snippet.channelTitle),
            }))
         );
         setPageTokens([res.data.prevPageToken, res.data.nextPageToken]);
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
         pageTokens={pageTokens}
         result={result}
         loading={loading}
         onPressItem={onPressItem}
      />
   );
}

export default SearchContainer;

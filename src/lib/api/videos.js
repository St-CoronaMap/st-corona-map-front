import axios from "axios";
import { Address } from "./constants";

export const getVideoList = async (id) => {
   try {
      const res = await axios.get(`${Address}/api/play/list/${id}`);
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const addVideo = async (id, item) => {
   try {
      await axios.post(`${Address}/api/play/create`, {
         playlistId: id,
         ...item,
         start: item.lapse[0],
         end: item.lapse[1],
      });
   } catch (err) {
      throw err;
   }
};

export const deleteVideo = async (id) => {
   try {
      await axios.delete(`${Address}/api/play/delete/${id}`);
   } catch (err) {
      throw err;
   }
};

export const changeOrder = async (listId, data) => {
   try {
      let array = data.map((item, idx) => ({ id: item.id, sequence: idx + 1 }));
      await axios.put(`${Address}/api/play/edit/seq`, {
         playlistId: listId,
         seqList: array,
      });
   } catch (err) {
      throw err;
   }
};

export const changeLapse = async (id, start, end) => {
   try {
      await axios.put(`${Address}/api/play/edit/time`, {
         id: id,
         start: start,
         end: end,
      });
   } catch (err) {
      throw err;
   }
};

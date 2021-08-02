import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Address } from "./constants";

export const getPlaylistApi = async (id) => {
   try {
      const res = await axios.get(`${Address}/api/playlist/${id}`);
      return res.data.response;
   } catch (err) {
      console.log(err.response.data);
   }
};

export const deletePlaylist = async (id) => {
   try {
      await axios.delete(`${Address}/api/playlist/delete/${id}`);
   } catch (err) {
      console.log(err.response.data);
   }
};

export const addPlaylist = async (obj) => {
   try {
      await axios.post(`${Address}/api/playlist/create`, obj);
   } catch (err) {
      console.log(err.response.data);
   }
};

export const editPlaylist = async (obj) => {
   try {
      await axios.put(`${Address}/api/playlist/edit`, obj);
   } catch (err) {
      console.log(err.response.data);
   }
};

export const removeAll = async () => {
   try {
      await AsyncStorage.clear();
   } catch (err) {
      console.log(err);
   }
};

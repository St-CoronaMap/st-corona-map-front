import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Address } from "./constants";

export const getPlaylistApi = async (callback) => {
   try {
      const res = await axios.get(`${Address}/api/playlist`);
      if (typeof callback === "function") {
         callback();
      }
      return res.data.response;
   } catch (err) {
      throw err.response.data;
   }
};

export const deletePlaylist = async (id) => {
   try {
      await axios.delete(`${Address}/api/playlist/delete/${id}`);
   } catch (err) {
      throw err.response.data;
   }
};

export const addPlaylist = async (obj) => {
   try {
      await axios.post(`${Address}/api/playlist/create`, obj);
   } catch (err) {
      throw err.response.data;
   }
};

export const editPlaylist = async (obj) => {
   try {
      await axios.put(`${Address}/api/playlist/edit`, obj);
   } catch (err) {
      throw err.response.data;
   }
};

export const removeAll = async () => {
   try {
      await AsyncStorage.clear();
   } catch (err) {
      console.log(err);
   }
};

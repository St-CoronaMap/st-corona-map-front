import AsyncStorage from "@react-native-async-storage/async-storage";

export const addPlaylistLocal = async (list, name) => {
   try {
      list.push({ id: list.length, name: name, items: [] });
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem("@playlists", jsonValue);
   } catch (err) {
      console.log(err);
   }
};

export const addItemLocal = async (list, id, item) => {
   try {
      const jsonValue = JSON.stringify(
         list.map((list) => {
            if (list.id === id) {
               list.items.push(item);
            }
            return list;
         })
      );
      await AsyncStorage.setItem("@playlists", jsonValue);
   } catch (err) {
      console.log(err);
   }
};

export const deletePlaylistLocal = async (list, id) => {
   try {
      const newList = list.filter((item) => item.id !== id);
      if (newList.length !== 0) {
         const jsonValue = JSON.stringify(newList);
         await AsyncStorage.setItem("@playlists", jsonValue);
      } else {
         await AsyncStorage.removeItem("@playlists");
      }
   } catch (err) {
      console.log(err);
   }
};

export const deleteItemLocal = async (list, id, videoId) => {
   try {
      const jsonValue = JSON.stringify(
         list.map((list) => {
            let newList = list;
            if (list.id === id) {
               newList = list.filter((item) => item.id !== videoId);
            }
            return newList;
         })
      );
      await AsyncStorage.setItem("@playlists", jsonValue);
   } catch (err) {
      console.log(err);
   }
};

export const getPlaylistLocal = async () => {
   try {
      let jsonValue = await AsyncStorage.getItem("@playlists");
      if (!jsonValue || jsonValue.length === 0) {
         await addPlaylistLocal([], "default");
         jsonValue = await AsyncStorage.getItem("@playlists");
      }
      return JSON.parse(jsonValue);
   } catch (err) {
      console.log(err);
   }
};

export const removeAll = async () => {
   try {
      await AsyncStorage.clear();
   } catch (err) {
      console.log(err);
   }
};

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

export const getPlaylistLocal = async () => {
   try {
      let jsonValue = await AsyncStorage.getItem("@playlists");
      if (!jsonValue) {
         await addPlaylistLocal([], "default");
         jsonValue = await AsyncStorage.getItem("@playlists");
      }
      console.log(jsonValue);
      return JSON.parse(jsonValue);
   } catch (err) {
      console.log(err);
   }
};

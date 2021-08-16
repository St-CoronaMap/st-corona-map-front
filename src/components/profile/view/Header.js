import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { ActivityIndicator } from "react-native";

const styles = StyleSheet.create({
   loading: {
      position: "absolute",
      right: 0,
      top: 110,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "gray",
   },
});

function Header({ user, changeAvatar, loading }) {
   return (
      <Avatar
         size="xlarge"
         rounded
         activeOpacity={0.7}
         containerStyle={{ backgroundColor: "purple" }}
         {...(() => {
            return user?.photoURL
               ? { source: { uri: user?.photoURL } }
               : { title: user?.displayName.slice(0, 2) };
         })()}>
         {loading.photo ? (
            <ActivityIndicator style={styles.loading} size={30} color="white" />
         ) : (
            <Avatar.Accessory
               icon={{
                  name: "pencil",
                  type: "font-awesome",
                  raised: true,
               }}
               size={40}
               onPress={changeAvatar}
            />
         )}
      </Avatar>
   );
}

export default Header;
